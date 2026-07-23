import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // SWC-based React plugin (no Babel) — transforms JSX/TSX for React 19 without
  // the Babel 7/8 conflict that @vitejs/plugin-react@6 introduces vs shadcn.
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    // Playwright e2e specs live in tests/e2e and run via `npm run test:e2e`.
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
