/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import { camelCase } from "lodash-es";
import type { Transform } from "style-dictionary/types";

/**
 * A name transformer based on name/ti/camel that only operates on icons,
 * safely transforming Swift keywords by escaping them with backticks
 */
export default {
  name: "swift/token/ti",
  type: "name",
  filter: (token) => token.type === "color" || token.type === "icon",
  transform: (token, options) => {
    let prefix = "";
    if (options?.prefix) {
      prefix = options.prefix;
    }
    const name = camelCase(
      [prefix].concat(token.path.slice(1, token.path.length)).join(" "),
    );
    return escapeName(name);
  },
} as Transform;

function escapeName(tokenName: string) {
  if (swiftKeywords.includes(tokenName)) {
    return `\`${tokenName}\``;
  }
  return tokenName;
}

export function unescapeName(tokenName: string) {
  if (tokenName.includes("`")) {
    return tokenName.replaceAll("`", "");
  }
  return tokenName;
}

/*
Sourced from The Swift Programming Language book:
https://docs.swift.org/swift-book/documentation/the-swift-programming-language/lexicalstructure/#Keywords-and-Punctuation
*/
const swiftKeywords = [
  // declarations
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
  "var",

  // statements
  "break",
  "case",
  "catch",
  "continue",
  "default",
  "defer",
  "do",
  "else",
  "fallthrough",
  "for",
  "guard",
  "if",
  "in",
  "repeat",
  "return",
  "throw",
  "switch",
  "where",
  "while",

  // expressions and types
  "Any",
  "as",
  "await",
  "catch",
  "false",
  "is",
  "nil",
  "rethrows",
  "self",
  "Self",
  "super",
  "throw",
  "throws",
  "true",
  "try",
];
