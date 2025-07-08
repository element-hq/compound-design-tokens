/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Transform, TransformedToken } from "style-dictionary/types";
import { isCoreColor } from "../../filters/isCoreColor";

/**
 * A transformer to change core colours into a SwiftUI Color loaded
 * from the asset catalog.
 */
export const coreColorAsset: Transform = {
  name: "swift/coreColorAsset",
  type: "value",
  filter: isCoreColor.filter,
  transform: (token: TransformedToken) => colorAssetInit(token.name),
};

/**
 * A transformer to change core colours into a UIKit UIColor loaded
 * from the asset catalog.
 */
export const coreUIColorAsset: Transform = {
  name: "swift/coreUIColorAsset",
  type: "value",
  filter: isCoreColor.filter,
  transform: (token: TransformedToken) => uiColorAssetInit(token.name),
};

export function colorAssetInit(name: string): string {
  return `Color("${name}", bundle: Bundle.module)`;
}

export function uiColorAssetInit(name: string): string {
  return `UIColor(named: "${name}", in: Bundle.module, compatibleWith: nil)!`;
}
