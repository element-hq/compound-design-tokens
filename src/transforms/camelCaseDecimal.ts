/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import { camelCase } from "lodash-es";
import type {
  PlatformConfig,
  Transform,
  TransformedToken,
} from "style-dictionary/types";

/**
 * A transformer to change tokens.0_5x and keep the underscore
 * after a camel case operation
 */
export default {
  name: "camelCaseDecimal",
  type: "name",
  transform: (token: TransformedToken, options: PlatformConfig): string => {
    const underscore = "ThisShouldBeAnUnderscore";
    const name = [options.prefix].concat(token.path).join(" ");
    return camelCase(name.replaceAll("_", underscore)).replace(underscore, "_");
  },
} as Transform;
