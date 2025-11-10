/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.
Copyright 2023 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import { camelCase, lowerFirst } from "lodash-es";

/**
 * Removes a given prefix and sets the resulting string to camel case.
 * @param original the string to modify
 * @param prefix the prefix to remove from the string
 * @returns the original string without the prefix in camel case form.
 */
export function removePrefixAndCamelCase(
  original: string,
  prefix: string,
): string {
  const regex = new RegExp(`^${prefix}`);
  const trimmed = original.replace(regex, "");
  return camelCase(lowerFirst(trimmed));
}
