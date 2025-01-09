/*
 * A substantial portion of the following script is borrowed from
 * https://www.npmjs.com/package/figma-icon-getter, which is subject to the
 * following license:
 *
 * MIT License
 *
 * Copyright (c) 2024 Josh Cusick
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd, env, exit } from "node:process";
import { optimize } from "svgo";
import { Agent, setGlobalDispatcher } from "undici";
import { z } from "zod";

if (env.FIGMA_ACCESS_TOKEN === undefined) {
  console.log(
    "Please supply a Figma personal access token with read access to Compound Icons, using the environment variable FIGMA_ACCESS_TOKEN",
  );
  exit(1);
}
const accessToken = env.FIGMA_ACCESS_TOKEN;

// https://www.figma.com/design/gkNXqPoiJhEv2wt0EJpew4/Compound-Icons
const fileKey = "gkNXqPoiJhEv2wt0EJpew4";
const pageName = "Icons";

const iconsDir = "icons";
const iconsManifest = join(iconsDir, "$icons.json");

function parseIconName(
  iconName: string,
  acc: [string, string][] = [],
): Record<string, string> {
  const match = iconName.match(/^,?\s*([^=]+)=([^,]+)(.*)/);
  if (match) {
    const [_, k, v, tail] = match;
    return parseIconName(tail, acc.concat([[k, v]]));
  }
  return Object.fromEntries(acc);
}

function figmaFetch(url: string, requestInit?: RequestInit) {
  return fetch(`https://api.figma.com/v1${url}`, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      "X-Figma-Token": accessToken,
    },
  });
}

console.log("Fetching Figma file...");
const fileRes = await figmaFetch(`/files/${fileKey}`);
if (!fileRes.ok) {
  const details = await fileRes.text();
  throw new Error(
    `An error occurred while fetching Figma file with key ${fileKey}. Unexpected ${fileRes.status} response: ${details}`,
  );
}
const fileJson = await fileRes.json();

const pages = z
  .object({
    document: z.object({
      children: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          children: z.array(
            z.object({
              id: z.string(),
            }),
          ),
        }),
      ),
    }),
  })
  .parse(fileJson);

const iconsPage = pages.document.children.find(
  (page) => page.name === pageName,
);
if (iconsPage === undefined)
  throw new Error(`Couldn't locate the page named ${pageName}`);
const iconComponentSetIds = new Set(iconsPage.children.map((c) => c.id));

const iconMetadata = z
  .object({
    componentSets: z.record(
      z.string(),
      z.object({
        name: z.string(),
      }),
    ),
    components: z
      .record(
        z.string(),
        z
          .object({
            name: z.string(),
            componentSetId: z.optional(z.string()),
          })
          .transform(({ name, ...rest }) => ({
            ...rest,
            properties: parseIconName(name),
          })),
      )
      .transform((components) =>
        Object.entries(components).map(([id, iconMetadata]) => ({
          id,
          ...iconMetadata,
        })),
      ),
    document: z.object({
      children: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      ),
    }),
  })
  .transform(({ componentSets, ...file }, ctx) => {
    const components = file.components
      .filter(
        ({ componentSetId }) =>
          componentSetId !== undefined &&
          iconComponentSetIds.has(componentSetId),
      )
      .map(({ componentSetId, ...rest }) => ({
        componentSetId,
        name: componentSets[componentSetId!]?.name,
        ...rest,
      }))
      // As we don't currently perform optical scaling, we only want the 24px
      // icons or those which are explicitly indicated in their name to be
      // designed for a smaller size. We also don't want placeholders.
      .filter(
        ({ name, properties: { Size: size } }) =>
          (size === "24" || name.includes(`${size}x${size}`)) &&
          name !== "Icon Placeholder",
      );
    for (const { componentSetId, name } of components) {
      if (!name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unable to get icon name: Component set with id ${componentSetId} was not found.`,
        });
        return z.NEVER;
      }
    }
    return components.map(({ componentSetId: _, ...rest }) => rest);
  })
  .parse(fileJson);

console.log(`Found ${iconMetadata.length} icons`);

const iconRefsRes = await figmaFetch(
  `/images/${fileKey}?ids=${iconMetadata
    .map(({ id }) => id)
    .join(",")}&format=svg`,
);

// Increase the connection timeout for fetching the SVGs; Node seems to
// serialize the requests somewhat, leaving certain requests waiting in the
// connecting state for quite some time
setGlobalDispatcher(new Agent({ connectTimeout: 120000 }));

const icons = await z
  .object({
    images: z.record(z.string(), z.string().url()),
  })
  .transform(({ images }, ctx) =>
    Promise.all(
      Object.entries(images).map(async ([id, url]) => {
        const iconMeta = iconMetadata.find((meta) => meta.id === id);
        if (!iconMeta) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unable to find icon metadata for id ${id}.`,
          });
          return z.NEVER;
        }
        const { name, properties } = iconMeta;

        let fileRes: Response;
        try {
          fileRes = await fetch(url);
        } catch (e) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Failed to fetch icon '${name}' from ${url}: ${e}`,
          });
          return z.NEVER;
        }

        if (!fileRes.ok) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unexpected ${fileRes.status} (${fileRes.statusText}) response while fetching icon '${name}' from ${url}.`,
          });
          return z.NEVER;
        }

        console.log(`Downloaded icon '${name}'`);
        return {
          name,
          properties,
          svg: await fileRes.text(),
        };
      }),
    ),
  )
  .parseAsync(await iconRefsRes.json());

// Regenerate the icons dir
await rm(iconsDir, { force: true, recursive: true });
await mkdir(iconsDir, { recursive: true });
const manifest: Record<string, { value: string; type: "icon" }> = {};
await Promise.all(
  icons.map((icon) => {
    // Make the icon tintable by removing all fills/strokes and then adding a
    // single fill="currentColor" on the <svg> element
    let svg = icon.svg.replace(/\b(fill|stroke)="\S*"/g, "");
    const fillIndex = svg.indexOf('xmlns="');
    svg = `${svg.slice(0, fillIndex)} fill="currentColor" ${svg.slice(fillIndex)}`;
    svg = optimize(svg, { multipass: true }).data;

    const slug = icon.name.toLowerCase().replace(/\s/g, "-");
    const fileName = `${slug}.svg`;
    manifest[slug] = { value: join(iconsDir, fileName), type: "icon" };
    return writeFile(resolve(cwd(), iconsDir, fileName), svg);
  }),
);

// Generate a list of icon tokens
writeFile(
  resolve(cwd(), iconsManifest),
  JSON.stringify({ icon: manifest }, undefined, 2),
);

console.log("All icons saved");
