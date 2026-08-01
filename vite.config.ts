import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
        "src/test-setup.ts",
        "vite.config.ts",
      ],
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: ["src/api.ts", "src/HelloWorldPage.tsx", "src/module.tsx"],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
      },
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@yutakax17/advanced-hello-world-fe-core",
      ],
    },
  },
});
