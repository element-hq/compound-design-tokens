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

import * as StyleDictionary from "style-dictionary";
import { Named } from "style-dictionary/types/_helpers";
import { Transform } from "style-dictionary/types/Transform";
import { registerTransforms } from "@tokens-studio/sd-transforms";

import camelCaseDecimal from "./transforms/camelCaseDecimal";
import { getStyleDictionaryConfig } from "./configs";
import { Platform, Theme } from "./@types";

export default async function (theme: Theme, platform: Platform) {
  const sb = StyleDictionary.extend(getStyleDictionaryConfig(theme, platform));
  await registerTransforms(sb);
  sb.registerTransform({
    name: "camelCaseDecimal",
    ...camelCaseDecimal,
  } as Named<Transform>);
  return sb;
}
