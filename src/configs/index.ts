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
import type { Config } from "style-dictionary/types";

import type { Platform, Theme } from "../@types";
import { getAndroidConfig, getCommonAndroidConfig } from "./getAndroidConfig";
import {
  getCommonIOSConfig,
  getIOSColorConfig,
  getIOSUIColorConfig,
} from "./getIOSConfig";
import getWebConfig from "./getWebConfig";

async function getConfig(platform: Platform): Promise<Config> {
  const config: Config = {
    platforms: {},
  };

  config.source = await glob([
    "tokens/cross-platform.json",
    `tokens/platform-${platform}.json`,
    "icons/$icons.json",
  ]);
  return config;
}

export async function getStyleDictionaryConfig(
  theme: Theme,
  platform: Platform,
): Promise<Config> {
  const config: Config = await getConfig(platform);

  const themeSources = await glob([
    `tokens/theme-${theme}.json`,
    "tokens/theme-semantics.json",
    `tokens/theme-semantics-${theme}.json`,
  ]);
  if (config.source) {
    config.source = config.source.concat(themeSources);
  } else {
    config.source = themeSources;
  }

  switch (platform) {
    case "web":
      config.platforms!.js = getWebConfig("js", theme);
      config.platforms!.ts = getWebConfig("ts", theme);
      config.platforms!.css = getWebConfig("css", theme);
      break;
    case "android":
      config.platforms!.compose = getAndroidConfig(theme);
      break;
    case "ios":
      config.platforms!.iosColor = getIOSColorConfig(theme);
      config.platforms!.iosUIColor = getIOSUIColorConfig(theme);
      break;
    default:
      throw `Unsupported platform: ${platform}`;
  }

  return config;
}

export async function getStyleDictionaryCommonConfig(
  platform: Platform,
): Promise<Config> {
  const config: Config = await getConfig(platform);

  switch (platform) {
    case "web":
      break;
    case "android":
      config.platforms!.compose = getCommonAndroidConfig();
      break;
    case "ios":
      config.platforms!.iosSwift = getCommonIOSConfig();
      break;
    default:
      throw `Unsupported platform: ${platform}`;
  }

  return config;
}
