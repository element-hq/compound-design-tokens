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

import type { Transform } from "style-dictionary/types";

/**
 * transforms path to a `url()` in CSS
 * Prepends `options.pathImportPrefix` if it exists
 */
export default {
  name: "css/iconsImport",
  type: "value",
  filter: (token) => token.type === "icon",
  transform: (token) => `url(../${token.value})`,
} satisfies Transform;
