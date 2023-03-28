/*
Copyright 2023 New Vector Ltd

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

import {
  ContrastColor,
  ContrastColorBackground,
} from "@adobe/leonardo-contrast-colors";
import { getAlphaColor } from "./color";

/**
 * Adapter from the leonardo format to the tokens studio output
 * @returns
 */
export function fromLeonardoColorToTokenStudio([
  constrastBackground,
  ...constrastColors
]: [ContrastColorBackground, ...ContrastColor[]]) {
  return {
    color: {
      theme: {
        bg: {
          value: constrastBackground.background,
          type: "color",
          description: "WCAG: 1",
        },
      },
      /**
       * Construct all the solid colour scale
       */
      ...constrastColors.reduce((memo, entry) => {
        for (const value of entry.values) {
          const [name, shade] = value.name.split(/(\d+)/);
          memo[name] = {
            ...(memo[name] || {}),
            [shade]: {
              value: value.value,
              type: "color",
              description: `WCAG: ${value.contrast}`,
            },
          };
        }
        return memo;
      }, {} as Record<string, any>),
      /**
       * Construct all the translucent colour scale
       */
      alpha: {
        ...constrastColors.reduce((memo, entry) => {
          for (const value of entry.values) {
            const [name, shade] = value.name.split(/(\d+)/);
            const { h, s, l, a } = getAlphaColor(
              value.value,
              constrastBackground.background
            );
            memo[name] = {
              ...(memo[name] || {}),
              [shade]: {
                value: `hsla(${h},${s},${l},${a})`,
                type: "color",
                description: `WCAG: ${value.contrast} Opacity: ${a}`,
              },
            };
          }
          return memo;
        }, {} as Record<string, any>),
      },
    },
  };
}
