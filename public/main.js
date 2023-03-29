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

const themeLight = await fetchJson("../tokens/theme-light.json");
const themeDark = await fetchJson("../tokens/theme-dark.json");
const themeLightHc = await fetchJson("../tokens/theme-light-hc.json");
const themeDarkHc = await fetchJson("../tokens/theme-dark-hc.json");

const templateHue = document.querySelector('#template-hue');

function generateContrastGridUrl() {
  return "http://perdu.com";
}

function fetchJson(url) {
  return fetch(url).then(response => response.json());
}

const themes = document.querySelector(".themes");

themes.appendChild(renderTheme(themeLight, "light"));
themes.appendChild(renderTheme(themeDark, "dark"));
themes.appendChild(renderTheme(themeLightHc, "light-hc"));
themes.appendChild(renderTheme(themeDarkHc, "dark-hc"));
