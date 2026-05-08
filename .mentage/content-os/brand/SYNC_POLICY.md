# Mentage Content OS Brand Sync Policy

This folder is synchronized from the sibling private source-of-truth repository at `/workspace/mentage-content-os`.

The sync is intentionally narrow. It copies the current brand README and consolidated brand source into `.mentage/content-os/brand`, and it copies approved output assets from `07_outputs` into `public/assets/content-os-brand` when such assets exist. It does not copy the full content repository into the animation studio.

The source repository remains the system of record. Re-run `npm run sync:brand` after approved content changes, then run `npm run verify:brand` before committing.
