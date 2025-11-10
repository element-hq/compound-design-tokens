/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Filter } from "style-dictionary/types";

/**
 * Filters /color/gradient tokens to any that don't include stop1,
 * stop2 etc. These are CSS gradients that we don't have a
 * transform for for Kotlin/Swift.
 */
const isCssGradient = {
  name: "isCssGradient",
  filter: (token) =>
    token.attributes?.category === "color" &&
    token.attributes?.type === "gradient" &&
    !token.name.toLowerCase().match(/stop\d+$/),
} satisfies Filter;

export { isCssGradient };
