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

import glob from "fast-glob";
import { Config } from "style-dictionary/types/Config";

import { Theme, Platform } from "../@types";
import getAndroidConfig from "./getAndroidConfig";
import getIOSConfig from "./getIOSConfig";
import getWebConfig from "./getWebConfig";

export function getStyleDictionaryConfig(
  theme: Theme,
  platform: Platform
): Config {
  const config: Config = {
    platforms: {},
  };

  config.source = glob.sync([
    "tokens/cross-platform.json",
    `tokens/platform-${platform}.json`,
    `tokens/theme-${theme}.json`,
    `tokens/theme-semantics.json`,
    `tokens/theme-${theme}-semantics.json`,
    `icons/$icons.json`,
  ]);

  switch (platform) {
    case "web":
      config.platforms.js = getWebConfig("js", theme);
      config.platforms.ts = getWebConfig("ts", theme);
      config.platforms.css = getWebConfig("css", theme);
      break;
    case "android":
      config.platforms.compose = getAndroidConfig(theme);
      break;
    case "ios":
      config.platforms.iosSwift = getIOSConfig(theme);
      break;
    default:
      throw `Unsupported platform: ${platform}`;
  }

  return config;
}
