import type { UserConfig } from "vite";

export default {
  build: {
    lib: {
      entry: ["src/colors/theme.js"],
      formats: ["iife"],
      name: "CompoundTheme",
    },
  },
} satisfies UserConfig;
