import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
//
// Don't add "type": "module" to package.json (WXT templates do): it makes Vite 8 (Rolldown)
// use Node-style CommonJS interop for src/, which breaks default imports of the old
// Babel-built deps (e.g. draft-js-linkify-plugin) at runtime.
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react"],
  // Keep explicit imports: no auto-import magic for src/hooks, src/components...
  imports: false,
  // WXT defaults to MV2 for Firefox, use MV3 everywhere
  manifestVersion: 3,
  // Version comes from package.json, icons from public/icon/<size>.png,
  // newtab override and popup from src/entrypoints/
  manifest: ({ browser }) => ({
    name: "Coconote",
    description: "Take notes in your browser new tab.",
    permissions: ["storage"],
    ...(browser === "firefox" && {
      browser_specific_settings: {
        gecko: {
          // If Coconote already exists on AMO, use the ID of that listing
          id: "coconote@pierregoutheraud.fr",
          strict_min_version: "140.0",
          data_collection_permissions: { required: ["none"] },
        },
        gecko_android: { strict_min_version: "142.0" },
      },
    }),
  }),
  vite: () => ({
    // fbjs (used by draft-js) reads `global`
    define: { global: "globalThis" },
  }),
});
