/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function copyThemeDist() {
  const filename = "theme.iife.js";
  const dist = fileURLToPath(new URL("../dist", import.meta.url));

  const androidResources = fileURLToPath(
    new URL("../assets/android/res", import.meta.url),
  );
  const iosResources = fileURLToPath(
    new URL("../assets/ios/swift/Resources", import.meta.url),
  );

  const destinations = [androidResources, iosResources];

  for (const destination of destinations) {
    await copyFile(path.join(dist, filename), path.join(destination, filename));
  }
}
