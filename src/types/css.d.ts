// Ambient declaration for CSS side-effect imports, e.g. `import "./globals.css"`.
//
// Next.js processes CSS at build time and does not ship a `*.css` type
// declaration, so the TypeScript language server can flag the side-effect
// import even though `tsc` (with the project's module resolution) does not.
// This declaration satisfies both. Add a more specific `*.module.css`
// declaration here if the project starts using CSS Modules.
declare module "*.css";
