import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const animationRoot = process.cwd();
const contentRoot = process.env.MENTAGE_CONTENT_OS_PATH
  ? path.resolve(process.env.MENTAGE_CONTENT_OS_PATH)
  : path.resolve(animationRoot, '..', 'mentage-content-os');
const manifestPath = path.join(animationRoot, '.mentage', 'content-os', 'brand', 'manifest.json');

function getGitCommit(repoPath) {
  return execFileSync('git', ['-C', repoPath, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

async function sha256(filePath) {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function readIfExists(filePath) {
  if (!existsSync(filePath)) {
    return '';
  }
  return fs.readFile(filePath, 'utf8');
}

function unique(items) {
  return [...new Set(items)];
}

async function collectTypographyMentions() {
  const mentions = [];
  const brandSource = await readIfExists(path.join(animationRoot, '.mentage', 'content-os', 'brand', 'brand-source-consolidated.md'));
  const themeSource = await readIfExists(path.join(animationRoot, 'src', 'theme', 'mentageTheme.ts'));

  for (const line of brandSource.split('\n')) {
    if (/font|typography|typeface|serif|sans|mature/i.test(line)) {
      const cleaned = line.trim();
      if (cleaned) {
        mentions.push(cleaned);
      }
    }
  }

  const typographyBlock = themeSource.match(/typography:\s*\{[\s\S]*?\n\s*\}/m);
  if (typographyBlock) {
    for (const line of typographyBlock[0].split('\n')) {
      const cleaned = line.trim();
      if (cleaned) {
        mentions.push(`theme: ${cleaned}`);
      }
    }
  }

  return unique(mentions).slice(0, 20);
}

async function main() {
  const problems = [];

  const contentFound = existsSync(path.join(contentRoot, '.git'));
  console.log(`Status: ${contentFound ? 'CONTENT OS FOUND' : 'CONTENT OS MISSING'}`);
  console.log(`Content OS path: ${contentRoot}`);

  if (!contentFound) {
    problems.push('Sibling content OS git repository is missing.');
  }

  if (!existsSync(manifestPath)) {
    problems.push('Brand sync manifest is missing. Run npm run sync:brand.');
  }

  let manifest = null;
  if (existsSync(manifestPath)) {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

    if (contentFound) {
      const currentContentCommit = getGitCommit(contentRoot);
      console.log(`Manifest source commit: ${manifest.sourceCommit}`);
      console.log(`Current source commit: ${currentContentCommit}`);
      if (manifest.sourceCommit !== currentContentCommit) {
        problems.push('Manifest source commit does not match current content OS commit.');
      }
    }

    for (const file of manifest.files || []) {
      const destination = path.join(animationRoot, file.destination);
      if (!existsSync(destination)) {
        problems.push(`Missing synced file: ${file.destination}`);
        continue;
      }

      const actualHash = await sha256(destination);
      if (actualHash !== file.sha256) {
        problems.push(`Checksum mismatch: ${file.destination}`);
      }
    }

    console.log(`Synced files in manifest: ${(manifest.files || []).length}`);
  }

  const brandDestinationExists = existsSync(path.join(animationRoot, '.mentage', 'content-os', 'brand'));
  const assetDestinationExists = existsSync(path.join(animationRoot, 'public', 'assets', 'content-os-brand'));
  console.log(`Brand destination exists: ${brandDestinationExists ? 'yes' : 'no'}`);
  console.log(`Asset destination exists: ${assetDestinationExists ? 'yes' : 'no'}`);

  if (!brandDestinationExists) {
    problems.push('Brand destination folder is missing.');
  }
  if (!assetDestinationExists) {
    problems.push('Approved asset destination folder is missing.');
  }

  const mentions = await collectTypographyMentions();
  console.log('Typography mentions:');
  if (mentions.length === 0) {
    console.log('- none found');
  } else {
    for (const mention of mentions) {
      console.log(`- ${mention}`);
    }
  }

  if (problems.length === 0) {
    console.log('Overall sync status: CURRENT');
    return;
  }

  console.log('Overall sync status: NOT CURRENT');
  console.log('Problems:');
  for (const problem of problems) {
    console.log(`- ${problem}`);
  }
  process.exit(1);
}

main().catch((error) => {
  console.error('Brand verification failed.');
  console.error(error.message);
  process.exit(1);
});
