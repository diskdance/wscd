// @ts-check
import { readFile, writeFile } from 'fs/promises';
import fg from 'fast-glob';

const NEW_VERSION = process.argv[2];
if (!NEW_VERSION) {
  console.error('Error: no version provided!');
  process.exit(1);
}

const packageJsonPaths = await fg(['package.json', 'gadgets/*/package.json'], { onlyFiles: true });

for (const filePath of packageJsonPaths) {
  try {
    const packageJson = JSON.parse(await readFile(filePath, 'utf8'));
    packageJson.version = NEW_VERSION;

    await writeFile(filePath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.error(`Error updating ${filePath}: ${error}`);
  }
}
