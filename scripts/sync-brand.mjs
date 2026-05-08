import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const animationRoot = process.cwd();
const contentRoot = process.env.MENTAGE_CONTENT_OS_PATH
  ? path.resolve(process.env.MENTAGE_CONTENT_OS_PATH)
  : path.resolve(animationRoot, '..', 'mentage-content-os');

const brandSourceRoot = path.join(contentRoot, '00_brand');
const approvedOutputRoot = path.join(contentRoot, '07_outputs');
const localBrandRoot = path.join(animationRoot, '.mentage', 'content-os', 'brand');
const publicBrandRoot = path.join(animationRoot, 'public', 'assets', 'content-os-brand');
const manifestPath = path.join(localBrandRoot, 'manifest.json');

const requiredBrandFiles = [
  {
    source: path.join(brandSourceRoot, 'README.md'),
    destination: path.join(localBrandRoot, 'README.md'),
    role: 'brand-folder-readme',
  },
  {
    source: path.join(brandSourceRoot, '.gitkeep'),
    destination: path.join(localBrandRoot, 'brand-source-consolidated.md'),
    role: 'consolidated-brand-source',
  },
];

function relativeToAnimation(filePath) {
  return path.relative(animationRoot, filePath).replaceAll(path.sep, '/');
}

function relativeToContent(filePath) {
  return path.relative(contentRoot, filePath).replaceAll(path.sep, '/');
}

async function sha256(filePath) {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function ensureDirectory(directory) {
  await fs.mkdir(directory, { recursive: true });
}

async function assertGitRepo(repoPath, label) {
  if (!existsSync(path.join(repoPath, '.git'))) {
    throw new Error(`${label} is missing or is not a git repository: ${repoPath}`);
  }
}

function getGitCommit(repoPath) {
  return execFileSync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

async function copyFileWithMetadata(entry) {
  if (!existsSync(entry.source)) {
    throw new Error(`Required source file is missing: ${entry.source}`);
  }

  await ensureDirectory(path.dirname(entry.destination));
  await fs.copyFile(entry.source, entry.destination);

  return {
    role: entry.role,
    source: relativeToContent(entry.source),
    destination: relativeToAnimation(entry.destination),
    sha256: await sha256(entry.destination),
  };
}

async function listFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

async function copyApprovedOutputAssets() {
  const copied = [];
  const files = await listFiles(approvedOutputRoot);
  const ignoredNames = new Set(['README.md', '.gitkeep']);

  for (const sourceFile of files) {
    const relative = path.relative(approvedOutputRoot, sourceFile);
    if (ignoredNames.has(relative)) {
      continue;
    }

    const destination = path.join(publicBrandRoot, relative);
    await ensureDirectory(path.dirname(destination));
    await fs.copyFile(sourceFile, destination);
    copied.push({
      role: 'approved-public-output-asset',
      source: relativeToContent(sourceFile),
      destination: relativeToAnimation(destination),
      sha256: await sha256(destination),
    });
  }

  return copied;
}

async function writeSyncPolicy() {
  const policyPath = path.join(localBrandRoot, 'SYNC_POLICY.md');
  const policy = `# Mentage Content OS Brand Sync Policy\n\nThis folder is synchronized from the sibling private source-of-truth repository at \`/workspace/mentage-content-os\`.\n\nThe sync is intentionally narrow. It copies the current brand README and consolidated brand source into \`.mentage/content-os/brand\`, and it copies approved output assets from \`07_outputs\` into \`public/assets/content-os-brand\` when such assets exist. It does not copy the full content repository into the animation studio.\n\nThe source repository remains the system of record. Re-run \`npm run sync:brand\` after approved content changes, then run \`npm run verify:brand\` before committing.\n`;
  await fs.writeFile(policyPath, policy);
  return {
    role: 'sync-policy',
    source: 'generated',
    destination: relativeToAnimation(policyPath),
    sha256: await sha256(policyPath),
  };
}

async function main() {
  await assertGitRepo(animationRoot, 'Animation studio repo');
  await assertGitRepo(contentRoot, 'Mentage content OS repo');
  await ensureDirectory(localBrandRoot);
  await ensureDirectory(publicBrandRoot);

  const contentCommit = getGitCommit(contentRoot);
  const animationCommit = getGitCommit(animationRoot);

  const copiedFiles = [];
  for (const entry of requiredBrandFiles) {
    copiedFiles.push(await copyFileWithMetadata(entry));
  }

  copiedFiles.push(await writeSyncPolicy());
  copiedFiles.push(...await copyApprovedOutputAssets());

  const manifest = {
    schemaVersion: 1,
    sourceRepository: 'mentage-mica/mentage-content-os',
    sourcePath: contentRoot,
    sourceCommit: contentCommit,
    animationRepository: 'mentage-mica/mentage-animation-studio',
    animationCommitAtSync: animationCommit,
    syncDestinations: [
      '.mentage/content-os/brand',
      'public/assets/content-os-brand',
    ],
    files: copiedFiles.sort((a, b) => a.destination.localeCompare(b.destination)),
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('Mentage brand sync complete.');
  console.log(`Source repo: ${manifest.sourceRepository}`);
  console.log(`Source commit: ${manifest.sourceCommit}`);
  console.log(`Brand destination: .mentage/content-os/brand`);
  console.log(`Approved asset destination: public/assets/content-os-brand`);
  console.log(`Files synced: ${manifest.files.length}`);
}

main().catch((error) => {
  console.error('Brand sync failed.');
  console.error(error.message);
  process.exit(1);
});
