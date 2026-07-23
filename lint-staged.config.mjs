// Runs at pre-commit via .husky/pre-commit -> `npx lint-staged`.
// For staged TS/TSX: auto-fix lint, run related tests (non-watch), and a
// project-wide type-check. `tsc --noEmit` takes no file args so it honors
// tsconfig instead of checking only the staged files.
const config = {
  "*.{ts,tsx}": (files) => {
    const list = files.map((f) => JSON.stringify(f)).join(" ");
    return [
      `eslint --fix ${list}`,
      `vitest related --run ${list}`,
      "tsc --noEmit",
    ];
  },
};

export default config;
