import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
    include: ["__tests__/**/*.{js,jsx,ts,tsx}"],
  },
  pack: {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    deps: {
      neverBundle: ["react", "prop-types", "react-promise", "invariant"],
    },
  },
});
