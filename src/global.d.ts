/*
Copyright (c) 2025 Element Creations Ltd.
Copyright 2024-2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial.
Please see LICENSE files in the repository root for full details.
*/

// Stub declarations, as svgr types depend on these, but we don't have them installed
declare module "prettier" {
  export interface Options {}
}

// This module doens't have a type definition
declare module "@babel/plugin-transform-react-jsx" {
  import type { PluginItem } from "@babel/core";

  const babelTransformReactJsx: PluginItem;
  export default babelTransformReactJsx;
}
