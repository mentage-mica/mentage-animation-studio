# Codex Guide: Mentage Animation Studio

This repo is the production asset studio for public-facing Mentage graphics and Remotion animation work.

## Prime Rules

- Keep sensitive strategy, research, pricing, IRB, clinical, reimbursement, PHI, and internal planning content out of this repo.
- Do not merge this repo with `mentage-content-os`; that sibling repo is the private source of truth for internal content and brand source material.
- Do not delete assets or folders without explicit founder approval.
- Keep generated files out of git unless the user explicitly asks to commit them.
- Follow `docs/MENTAGE_BRAND_SYSTEM.md` for public-facing graphics, carousels, social layouts, typography, color, and texture use.

## Local Setup

- Use Node.js 20, as specified by `.nvmrc`.
- Install dependencies with `npm install`.
- Install Playwright Chromium before social exports: `npx playwright install chromium`.
- Run `npm run typecheck` before handing off code changes.
- Run `npm run export:social` when changing SVG assets under `07_outputs/`.

## Repo Map

- `07_outputs/` contains source SVG social graphics.
- `dist/social/` contains generated PNG exports and is ignored by git.
- `docs/MENTAGE_BRAND_SYSTEM.md` captures the Figma-derived Mentage visual system and production rules.
- `src/` contains Remotion compositions and theme code.
- `scripts/` contains export and brand sync utilities.
- `.mentage/content-os/brand/` contains the intentionally narrow synced brand snapshot.
- `public/assets/content-os-brand/` contains approved public assets copied from the private content OS.
- `public/assets/local-library/` is the local-only Adobe Stock and Figma import-kit vault. It is intentionally ignored by git except for lightweight README files.

## Brand Sync

- `npm run sync:brand` expects a sibling private repo at `../mentage-content-os`, or set `MENTAGE_CONTENT_OS_PATH`.
- `npm run verify:brand` will fail if that sibling repo or synced public asset folder is missing.
- Only approved public assets should be copied into this repo.

## GitHub Actions

- `.github/workflows/export-social-assets.yml` exports SVGs to PNG artifacts on pushes and pull requests that touch source graphics or export tooling.
- The workflow artifact is named `mentage-social-graphics`.
