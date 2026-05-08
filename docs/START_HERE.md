# Start Here: Mentage Animation Studio

  Welcome to the Mentage Animation Studio. This repo is a **production asset factory** for creating branded social graphics and video content.

  ## What This Repo Does

  This is a working studio that converts SVG source files into high-quality PNG exports ready for social media platforms like Facebook and LinkedIn. It uses Playwright to render SVGs at different resolutions for maximum compatibility.

  ## How to Run the Social Export

  ### Prerequisites
  - Node.js installed
  - npm packages installed: `npm install`
  - Playwright browser binaries: `npx playwright install chromium`

  ### Export Command
  ```bash
  npm run export:social
  ```

  This command converts all SVG files to PNG and outputs them to `dist/social/`.

  If Playwright binaries are missing, run:
```bash
  npx playwright install chromium
  ```

  Then run the export again.

  ## Where Source SVG Files Live

  All SVG source files go here:
```
  07_outputs/facebook/         ← Facebook graphics (1080x1080)
  07_outputs/linkedin/         ← LinkedIn graphics (soon)
  07_outputs/carousel/         ← Carousel graphics (soon)
  ```

  ### Example
  - **Source SVG**: `07_outputs/facebook/caregiver-support-recharge-facebook.svg`

    ## Where Final PNG Files Appear

    After running `npm run export:social`, find PNG exports here:
```
  dist/social/facebook/
    └── caregiver-support-recharge-facebook-1080.png   (1x size)
    └── caregiver-support-recharge-facebook-2160.png   (2x size)
    └── caregiver-support-recharge-facebook-3240.png   (3x size)
  ```

  The export creates 3 resolutions:
- **1080px** – Standard social media displays
  - **2160px** – High-resolution feeds and thumbnails
  - **3240px** – Print and large displays

  ## How to Download GitHub Actions Artifacts

  When you push changes, GitHub Actions automatically runs the export workflow:

1. Go to the **Actions** tab
  2. Select the workflow run (green checkmark)
  3. Scroll to **Artifacts** section
  4. Download `mentage-social-graphics` (contains all PNGs)

  This is how you get the exported images without running the script locally.

  ## Next Steps

  - **See asset rules**: Read `docs/ASSET_RULES.md`
    - **Developer handoff**: Read `docs/DEVELOPER_HANDOFF.md`
      - **Check the export script**: See `scripts/export-social-assets.mjs`
