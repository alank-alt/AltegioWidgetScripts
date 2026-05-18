# AGENTS.md

## Cursor Cloud specific instructions

### Overview

ScriptIndex is a single Angular 21 SPA that catalogs HTML script files. No backend services, databases, or external APIs are required.

### Key Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm start` (runs `generate-index.js` then `ng serve` on port 4200) |
| Build | `npm run build` |
| Test | `npm test` (Vitest) |
| Format check | `npx prettier --check .` |
| Format fix | `npx prettier --write .` |

### Gotchas

- The `prestart` hook runs `node generate-index.js` automatically before `ng serve`, which generates `public/assets/scripts.json` from files in `Scripts collection/`. If you add/remove script files, the manifest updates on next `npm start`.
- There is a **pre-existing test failure** in `src/app/app.spec.ts`: the "should render title" test expects `'Hello, script-index'` but the app renders `'ScriptsCollection'`. This is not a regression from your changes.
- No ESLint is configured; formatting is handled by Prettier only (`.prettierrc`).
- The project uses Angular 21 with standalone components (no NgModules).
