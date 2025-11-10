/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import { readFile, writeFile } from "node:fs/promises";

interface Typography {
  fontWeight: unknown;
  fontSize: unknown;
  lineHeight: unknown;
  fontFamily: unknown;
  letterSpacing: unknown;
}

function normalizeTypography({
  fontWeight,
  fontSize,
  lineHeight,
  fontFamily,
  letterSpacing,
}: Typography): Typography {
  // Put the properties in the same order as they appear in CSS font shorthands
  return { fontWeight, fontSize, lineHeight, fontFamily, letterSpacing };
}

function normalize(data: unknown): unknown {
  if (typeof data === "object" && data !== null) {
    if ("type" in data && "value" in data)
      return data.type === "typography"
        ? { ...data, value: normalizeTypography(data.value as Typography) }
        : data;

    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, normalize(v)]),
    );
  }

  return data;
}

// Due to a deficiency of Style Dictionary when recovering variable references
// from properties that were flattened from an object into a string, we must
// normalize some tokens to ensure that their properties appear in the same
// order in the input as they do in the output.
// https://github.com/amzn/style-dictionary/blob/4575dd5a9cc226ebb378f23ce5f1f2d22e2e108a/lib/common/formatHelpers/createPropertyFormatter.js#L201
export async function normalizeTokens(): Promise<void> {
  const webTokens: object = JSON.parse(
    await readFile("tokens/platform-web.json", { encoding: "utf8" }),
  );
  const normalized = normalize(webTokens);
  await writeFile(
    "tokens/platform-web.json",
    JSON.stringify(normalized, undefined, 2),
  );
}
