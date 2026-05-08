import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const animationRoot = process.cwd();
const contentRoot = process.env.MENTAGE_CONTENT_OS_PATH
  ? path.resolve(process.env.MENTAGE_CONTENT_OS_PATH)
  : path.resolve(animationRoot, '..', 'mentage-content-os');

const requiredDirectories = [
  path.join(animationRoot, '.mentage', 'content-os', 'brand'),
  path.join(animationRoot, 'public', 'assets', 'content-os-brand'),
];

async function main() {
  if (!existsSync(path.join(contentRoot, '.git'))) {
    throw new Error(`CONTENT OS NOT FOUND: expected sibling git repo at ${contentRoot}`);
  }

  for (const directory of requiredDirectories) {
    await fs.mkdir(directory, { recursive: true });
  }

  console.log('Mentage brand setup complete.');
  console.log(`Content OS path: ${contentRoot}`);
  console.log('Prepared: .mentage/content-os/brand');
  console.log('Prepared: public/assets/content-os-brand');
  console.log('Running initial sync...');

  const sync = spawnSync(process.execPath, ['scripts/sync-brand.mjs'], {
    cwd: animationRoot,
    stdio: 'inherit',
    env: process.env,
  });

  if (sync.status !== 0) {
    process.exit(sync.status ?? 1);
  }
}

main().catch((error) => {
  console.error('Brand setup failed.');
  console.error(error.message);
  process.exit(1);
});
