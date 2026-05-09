# Mentage Brand System

Source of truth: JZ Marketing Tools Figma file
Figma file: https://www.figma.com/design/6AgQ9p0smTfKqEnq9ObJPb/JZ-marketing-tools
File key: 6AgQ9p0smTfKqEnq9ObJPb
Status: active working brand reference

## Design Direction

Mentage should feel clinical, editorial, calm, and premium. The visual language should not feel like generic AI art, startup gradients, or templated wellness content.

Use a white-first canvas, restrained evergreen typography, quiet archival textures, and sparse botanical or paper elements. The brand should feel like a thoughtful healthcare editorial system: credible, human, and founder-led.

## Core Principles

- White background by default for LinkedIn carousels and public graphics.
- Use texture as evidence of craft, not decoration.
- Use Figma/brand assets before inventing new visuals.
- Use stock photos only when they add meaning, not filler.
- Keep layouts spacious, calm, and readable.
- Avoid generic gradient backgrounds, purple AI color palettes, glossy cards, neon effects, and over-ornamented compositions.
- Public-facing medical or wellness content must preserve claim boundaries and include appropriate caution when needed.

## Typography

Primary display font:
- Bona Nova Bold
- Use for headlines, slide titles, editorial statements, and premium pull quotes.

Primary body font:
- Source Sans Pro Regular
- Use for body copy, captions, explanations, and supporting text.

Supporting weights:
- Source Sans Pro SemiBold for labels, tags, and small navigation-style text.
- Source Sans Pro Bold for calls to action and category labels.

Usage notes:
- Headlines should feel literary/editorial, not tech-marketing.
- Body text should be plain, legible, and calm.
- Avoid cramped text blocks. Split dense founder copy into clear editorial beats.

## Color Palette

Primary:
- White: #FFFFFF
- Deep Evergreen: #003D3D
- Near Black: #1A1A1A

Supporting neutrals:
- Body Slate: approximately #383F52
- Soft Gray: use sparingly for dividers, metadata, and inactive text.

Accents:
- Moss Green: use for botanical elements, soft structure, and subtle emphasis.
- Clay: use sparingly for human warmth and annotation marks.
- Archival Gold: use sparingly for evidence markers, source tags, and premium highlights.

Rules:
- White should dominate.
- Evergreen should carry brand identity.
- Clay and gold should be accents, not backgrounds.
- Avoid cream backgrounds unless explicitly requested. If warmth is needed, use texture overlays at very low opacity on white.

## Texture And Asset Language

Preferred assets from the Figma/import kit:
- Botanical washes
- Moss field textures
- Clay marker strokes
- Archival gold accents
- Paper overlays
- Source-label textures
- Subtle frames and arrows

Use these assets as:
- Edge detail
- Low-opacity background evidence
- Section markers
- Pull quote support
- Source/evidence framing
- Editorial dividers

Do not use assets as:
- Busy full-bleed backgrounds
- Random decoration
- Generic stock collage
- Overpowering texture layers behind long text

## LinkedIn Carousel Style

Default format:
- 1080 x 1350 portrait slides.
- White background.
- Editorial headline hierarchy.
- One primary idea per slide.
- Small Mentage footer and slide count.
- Restrained use of Figma assets.

Slide structure:
- Cover: bold editorial claim, minimal ornament, clear topic signal.
- Quote slide: one human sentence, treated seriously.
- Evidence slide: concise claim, source-aware caveat.
- Question slide: reframes the clinical or founder problem.
- Closing slide: Mentage lens, not medical advice where relevant.

Avoid:
- AI poster gradients
- Generic wellness illustrations
- Decorative icons that do not add meaning
- Too much text per slide
- Fake charts or unsupported numerical emphasis

## Medical And Evidence Content

For health-related content:
- Do not overstate observational evidence.
- Distinguish signal, association, causation, and clinical proof.
- Take patient fear seriously without validating unsupported conclusions.
- Use language like “associated with,” “the evidence suggests,” or “not proof of causation” where appropriate.
- Include “not medical advice” when the content could be interpreted as treatment guidance.

## Production Workflow

For Codex and design production:
1. Start with the Figma brand system and local asset library.
2. Use `mentage-content-os` for strategy, evidence, claims boundaries, and copy source material.
3. Use `mentage-animation-studio` for public-facing graphics, SVGs, PNG exports, carousels, and video assets.
4. Keep heavy Adobe Stock and Figma asset source files local-only unless explicitly approved.
5. Commit lightweight rules, templates, and public-safe outputs to GitHub.

## Current Local Asset Locations

Codex hub:
- `/Users/zachariahfamily/Desktop/Codex`

Brand/strategy repo:
- `/Users/zachariahfamily/Desktop/Codex/mentage-content-os`

Production studio repo:
- `/Users/zachariahfamily/Desktop/Codex/mentage-animation-studio`

Local asset vault:
- `/Users/zachariahfamily/Desktop/Codex/mentage-animation-studio/public/assets/local-library`
