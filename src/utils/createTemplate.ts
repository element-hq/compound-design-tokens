/*
Copyright 2023 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
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
    const { outputReferences, commentStyle } = options;
    const formatProperty = createPropertyFormatter({
      outputReferences,
      dictionary,
      formatting: {
        suffix: "",
        commentStyle: "none", // We will add the comment in the format template
      },
    });

    if (outputReferences) {
      allTokens = [...dictionary.allTokens].sort(
        sortByReference(dictionary.tokens),
      );
    } else {
      allTokens = [...dictionary.allTokens].sort(sortByName);
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
