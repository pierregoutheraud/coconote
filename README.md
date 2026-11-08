Built with [WXT](https://wxt.dev) (Vite), Manifest V3 for Chrome and Firefox.

# Requirements

Node 22+ and pnpm (`corepack enable` picks the version pinned in `package.json`).

# Install

`pnpm install`

# Dev

- `pnpm dev`: opens Chrome with the extension loaded, React components hot-reload on save.
- `pnpm dev:firefox`: same in Firefox.

To use your own Chrome profile instead of a fresh one, see https://wxt.dev/guide/essentials/config/browser-startup.html (a git-ignored `web-ext.config.ts`).

# Project structure

- `src/entrypoints/newtab/`: the new tab page (becomes `chrome_url_overrides.newtab`).
- `src/entrypoints/popup/`: the toolbar popup.
- `public/icon/<size>.png`: extension icons, picked up automatically.
- `wxt.config.ts`: manifest options (name, permissions, Firefox settings). The version comes from `package.json`.

# Release

1. Bump `version` in `package.json`.
2. `pnpm zip`: `.output/coconote-<version>-chrome.zip` for the Chrome Web Store.
3. `pnpm zip:firefox`: `.output/coconote-<version>-firefox.zip` and `.output/coconote-<version>-sources.zip` for Firefox Add-ons (AMO asks for the sources since the bundle is minified).

Build instructions for AMO reviewers, from the sources zip: `pnpm install --frozen-lockfile && pnpm zip:firefox` (Node 22+, pnpm 12). The result is in `.output/firefox-mv3/`.

# How does it work ?

## Storage

When state is updated on a tab, the saveMiddleware is executed and the state is saved in google sync with the attribute `from` which contains the `tabId` (example: 2345 or "popup") and the timestamp.
It needs to have the timestamp so that the state changes everytime and we can detect in the google sync listener.
The google sync listener (`chrome.storage.onChanged.addListener(handleChanged)`) listens for updates and we decompress `changes` object and check if the change is coming from the same tabId or not.
If the change is coming from another tab, we render the whole app. (I tried updating only the state by calling an action updateState but the Editor would not render because of how it works right now.)
