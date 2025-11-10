/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

import type { Theme } from "../@types";

export type Tier = "base" | "semantic";

export const COMPOUND_TOKENS_NAMESPACE = "cpd";

export const cssFileName = (theme: Theme | null, tier: Tier, mq: boolean) =>
  `${COMPOUND_TOKENS_NAMESPACE}-${theme === null ? "common" : `theme-${theme}`}-${tier}${mq ? "-mq" : ""}.css`;
