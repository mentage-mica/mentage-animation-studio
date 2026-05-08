# Developer Handoff Guide

Welcome! This document explains the architecture and boundaries of the Mentage animation production system.

## What This Repo Is

This is the **production asset studio** — a working factory for creating branded social graphics and video content. It's the final output layer where designs become deployable assets.

**This is NOT** a research repo, content management system, or internal documentation store.

## Key Architecture Rule

### Two-Repo Separation

**mentage-animation-studio** (this repo)
- Production asset export
- Social graphics (SVG → PNG)
- Animation templates
- Public-facing design work
- GitHub Actions workflow for exports

**mentage-content-os** (separate repo)
- Internal content strategy
- Brand guidelines
- Research summaries
- Strategy documents
- Sensitive information

❌ **DO NOT MERGE** these repos
❌ **DO NOT** copy sensitive content here
✅ Reference `mentage-content-os` as needed, but keep data separate

## Rules for Developers

### Protect Sensitive Information

**Keep out of this repo:**
- Pricing tiers and financial data
- IRB (Institutional Review Board) approvals
- Clinical trial protocols or results
- Reimbursement information
- Internal strategy documents
- Personal health information (PHI)
- Research participant data
- Paid research agreements

**This is a public production studio.** Assume everything here could be visible.

### File Organization Standards

Source files:
- `07_outputs/facebook/` — Facebook social graphics
- `07_outputs/linkedin/` — LinkedIn social graphics
- `07_outputs/carousel/` — Carousel/carousel graphics

Exported outputs:
- `dist/social/` — Auto-generated PNG exports (3 resolutions each)

Assets:
- `public/assets/brand/` — Logo marks and brand elements
- `public/assets/textures/` — Raster images, textures
- `public/assets/characters/` — Character illustrations
- `public/assets/figma-reference/` — Figma design links/screenshots

Code:
- `src/templates/` — Reusable component templates
- `src/templates/social/` — Social video layouts
- `scripts/` — Build and export scripts

Documentation:
- `docs/START_HERE.md` — For non-technical users
- `docs/ASSET_RULES.md` — File format guidelines
- `docs/DEVELOPER_HANDOFF.md` — This document

### Never Delete Without Permission

❌ Don't remove files without explicit founder approval

The founder created this structure. Even if something seems unused, ask first. Asset export workflows depend on careful file organization.

### Keep Outputs Organized

The `07_outputs/` folder structure is critical:
- Each social platform gets its own subfolder
- Each asset has a clear, descriptive filename
- PNG exports auto-generate to `dist/social/`
- GitHub Actions uploads artifacts named `mentage-social-graphics`

### Public-Facing Assets Only

Before committing:
- Logos? ✅ Safe
- Social graphics? ✅ Safe
- Design templates? ✅ Safe
- Strategy docs? ❌ Move to mentage-content-os
- Pricing info? ❌ Move to mentage-content-os
- Research data? ❌ Move to mentage-content-os

## Git Workflow

```bash
# Create SVG source files
# Commit to docs/, 07_outputs/, src/

# Run export locally
npm install
npx playwright install chromium
npm run export:social

# Verify PNG files created in dist/social/

# Commit and push
git add .
git commit -m "Add caregiver support graphic"
git push origin main
```

GitHub Actions automatically:
1. Runs npm install
2. Installs Playwright browser binaries
3. Exports SVG → PNG (3 resolutions)
4. Uploads artifact named `mentage-social-graphics`

## Architecture Notes

**Why separate repos?**
- Mentage-content-os stays private and secure
- Animation-studio can eventually become public for design sharing
- Clear separation of concerns: strategy vs. production
- Different access controls for different audiences

**Why keep PNGs in dist/?**
- Auto-generated from SVGs
- Ignored in git (.gitignore rules apply)
- Uploaded to GitHub Actions artifacts for download
- Not meant to be version-controlled long-term

**Why SVG sources?**
- Vector format scales to any size
- Playwright renders at 1x, 2x, 3x resolutions
- Clean, exportable source files
- Easy to edit for non-developers

## Getting Help

- **How to export?** → See `docs/START_HERE.md`
- **Where does this file go?** → See `docs/ASSET_RULES.md`
- **Questions?** → Check the export script: `scripts/export-social-assets.mjs`

## Summary

You're working on a **production asset factory**, not a research repo. Keep sensitive data in `mentage-content-os`. Organize assets clearly. Ask before deleting. Export SVGs to PNGs via GitHub Actions. That's it.
