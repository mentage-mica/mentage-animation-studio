# Asset Rules: What Goes Where

## Quick Guide
- **SVG** → logos, icons, static graphics, vector work
- **PNG/WebP** → photos, textures, screenshots, mockups  
- **TSX + Remotion** → videos, animations, motion layouts

## Use SVG for
- Static social graphics (caregiver-support-recharge-facebook.svg)
- Logo marks and brand assets
- Icon libraries
- Simple vector illustrations
- Diagrams and charts

Location: `07_outputs/facebook/`, `07_outputs/linkedin/`, `07_outputs/carousel/`

## Use PNG or WebP for
- Photographs and images
- Textured backgrounds
- Screenshots and mockups
- Raster artwork

Location: `public/assets/textures/`, `public/assets/brand/`

## Use TSX + Remotion for
- Animated social videos
- Motion graphics
- Reusable animation layouts
- Video sequences

Location: `src/` folder

## What NOT to Put Here

❌ Never add to this repo:
- Sensitive strategy documents
- Pricing information
- IRB approvals or clinical data
- Reimbursement details
- Paid research documents
- Private health information (PHI)
- Draft or internal-only content

✅ Safe to add:
- Brand logos and marks
- Public-facing social graphics
- Design templates
- Animation code and scripts

## File Organization

```
├── 07_outputs/           ← Source SVG graphics
│   ├── facebook/
│   ├── linkedin/
│   └── carousel/
├── dist/social/          ← Exported PNG files
├── public/assets/        ← Asset library
│   ├── brand/
│   ├── textures/
│   ├── characters/
│   └── figma-reference/
└── src/templates/        ← Code and animations
```

See also: `docs/START_HERE.md` and `docs/DEVELOPER_HANDOFF.md`
