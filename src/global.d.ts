/*
Copyright 2024 New Vector Ltd.

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
