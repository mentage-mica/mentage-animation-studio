# Mentage Animation Studio

A Remotion-based animation production system for creating branded video content featuring Sam and founder narratives.

## Quick Start

```bash
npm install
npm run dev
```

## Render Videos

```bash
# Sam walking demo (12 seconds)
npm run render:sam-walk

# Founder POV series (90 seconds)
npm run render:founder
```

## Project Structure

- `src/index.ts` - Remotion composition registry
- `src/compositions/` - Video compositions
  - `SamWalkingDemo.tsx` - Sam character walking animation
    - `SamFounderPOV.tsx` - Founder perspective video template
    - `src/theme/` - Design system
      - `mentageTheme.ts` - Colors, typography, spacing
      - `src/components/` - Reusable UI components
      - `public/assets/` - Media files and character assets

      ## Setup

      1. Install Node.js 20 (see `.nvmrc`)
      2. `npm install`
      3. `npm run typecheck` - Verify TypeScript
      4. `npm run dev` - Start preview studio

      ## Available Scripts

      - `npm run dev` - Remotion preview studio
      - `npm run render:sam-walk` - Render SamWalkingDemo composition
      - `npm run render:founder` - Render SamFounderPOV composition
      - `npm run typecheck` - TypeScript type checking
      - `npm run lint` - ESLint code analysis

      ## Configuration

      - `remotion.config.ts` - Remotion settings
      - `tsconfig.json` - TypeScript compiler options
      - `.nvmrc` - Node.js version

      ## Character Assets

      Sam character files are in `public/assets/characters/sam/`. Replace placeholder SVGs with actual character artwork.

      ## Theme System

      Colors and typography defined in `src/theme/mentageTheme.ts`:
      - Deep Green: `#1B5E3F`
      - Soft Sage Green: `#8FA48C`
      - Warm Blush: `#E8C4B8`
      - Off White: `#F9F7F3`
      - Dark Charcoal: `#2D2D2D`

      ## Next Steps

      1. Replace placeholder assets with Sam character artwork
      2. Build out full SamWalkingDemo animation with motion
      3. Create social component templates
      4. Add audio support and lip-sync
      5. Build compliance checking system

      ## License

      Private - Mentage Studios
      
