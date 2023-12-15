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

import _ from "lodash";
import { Transform } from "style-dictionary/types/Transform";

/**
 * A name transformer based on name/ti/camel that only operates on icons,
 * safely transforming Swift keywords by escaping them with backticks
 */
export default {
  type: 'name',
  matcher: function (token) {
    return token.type === "icon";
  },
  transformer: function(token, options) {
    let prefix = ''
    if (options && options.prefix) {
      prefix = options.prefix
    }
    let name = _.camelCase( [prefix].concat(token.path.slice(1, token.path.length)).join(' ') );
    return escape(name)
  },
} as Transform;

function escape(tokenName: string) {
  if (swiftKeywords.includes(tokenName)) {
    return `\`${tokenName}\``
  } else {
    return tokenName
  }
}

export function unescape(tokenName: string) {
  if (tokenName.includes("`")) {
    return tokenName.replaceAll("`", "")
  } else {
    return tokenName
  }
}

const swiftKeywords = [
  "associatedtype",
  "class",
  "deinit",
  "enum",
  "extension",
  "fileprivate",
  "func",
  "import",
  "init",
  "inout",
  "internal",
  "let",
  "open",
  "operator",
  "private",
  "precedencegroup",
  "protocol",
  "public",
  "rethrows",
  "static",
  "struct",
  "subscript",
  "typealias",
  "var"
]
