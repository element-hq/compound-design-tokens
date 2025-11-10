/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import _ from "lodash";
import type { TransformedToken } from "style-dictionary";
import type { FormatFnArguments } from "style-dictionary/types";
import {
  createPropertyFormatter,
  fileHeader,
  sortByName,
  sortByReference,
} from "style-dictionary/utils";

/**
 * Creates a `TemplateExecutor` from a template in the provided path and runs it with the given arguments.
 * @param templatePath path to the template file in the project
 * @param args a nullable set of arguments for the formatter, including dictionary and file info, as well as formatting options
 * @returns
 */
export default async function createTemplate(
  templatePath: string,
  args: FormatFnArguments | null,
) {
  const template = _.template(
    fs
      .readFileSync(
        path.join(fileURLToPath(new URL(".", import.meta.url)), templatePath),
      )
      .toString(),
  );

  let allTokens: TransformedToken[];
  if (args) {
    const { dictionary, file, options } = args;
    const { outputReferences, commentStyle, sortTokensByReference } = options;
    const formatProperty = createPropertyFormatter({
      outputReferences,
      dictionary,
      formatting: {
        suffix: "",
        commentStyle: "none", // We will add the comment in the format template
      },
    });

    allTokens = [...dictionary.allTokens];

    if (sortTokensByReference) {
      allTokens = allTokens.sort(sortByReference(dictionary.tokens));
    } else {
      allTokens = allTokens.sort(sortByName);
    }

    const headerResult = await fileHeader({
      file,
      commentStyle: commentStyle ?? "long",
    });
    if (typeof headerResult !== "string")
      throw new Error(`header is ${headerResult}`);

    return template({
      allTokens,
      file,
      options,
      formatProperty,
      fileHeader: headerResult,
    });
  }
  // Path for very simple templates
  return template();
}
