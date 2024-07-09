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

import StyleDictionary from "style-dictionary";
import _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import { FormatterArguments } from "style-dictionary/types/Format";

/**
 * Creates a `TemplateExecutor` from a template in the provided path and runs it with the given arguments.
 * @param templatePath path to the template file in the project
 * @param args a nullable set of arguments for the formatter, including dictionary and file info, as well as formatting options
 * @returns
 */
export default function createTemplate(
  templatePath: string,
  args: FormatterArguments | null,
) {
  const template = _.template(
    fs.readFileSync(path.join(__dirname, templatePath)).toString(),
  );

  let allProperties;
  if (args) {
    const { dictionary, file, options, platform } = args;
    const { outputReferences } = options;
    const formatProperty =
      StyleDictionary.formatHelpers.createPropertyFormatter({
        outputReferences,
        dictionary,
        formatting: {
          suffix: "",
          commentStyle: "none", // We will add the comment in the format template
        },
      });

    const fileHeader = StyleDictionary.formatHelpers.fileHeader;

    if (outputReferences) {
      allProperties = [...dictionary.allProperties].sort(
        StyleDictionary.formatHelpers.sortByReference(dictionary),
      );
    } else {
      allProperties = [...dictionary.allProperties].sort(
        StyleDictionary.formatHelpers.sortByName,
      );
    }

    return template({
      allProperties,
      file,
      options,
      formatProperty,
      fileHeader,
    });
  } else {
    // Path for very simple templates
    return template();
  }
}
