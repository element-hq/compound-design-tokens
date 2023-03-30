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
  renderPreview,
  renderTheme,
  renderButtonsPreview,
  renderLabels,
  fetchJson
} from "./helper.js";

const themes = {
  "light": await fetchJson("../tokens/theme-light.json"),
  "dark": await fetchJson("../tokens/theme-dark.json"),
  "light-hc": await fetchJson("../tokens/theme-light-hc.json"),
  "dark-hc": await fetchJson("../tokens/theme-dark-hc.json")
};

const themeEntries = Object.entries(themes);

/**
 * Query the nodes we're going to render the application in
 */

const themesPreview = document.querySelector(".themes");
const tests = document.querySelector(".tests");

/**
 * Render all the visual tests for the different themes
 */

for (const [themeName, themeJson] of themeEntries) {
  themesPreview.appendChild(renderTheme(themeJson, themeName));
}

for (const [themeName] of themeEntries) {
  tests.appendChild(renderPreview(themeName));
}

for (const [themeName] of themeEntries) {
  tests.appendChild(renderButtonsPreview(themeName));
}

for (const [themeName] of themeEntries) {
  tests.appendChild(renderLabels(themeName));
}
