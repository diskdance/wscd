/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const I18N_DIR = path.join(dirname, '../i18n/');
const WIKIMEDIA_MSG_DIR = path.join(dirname, '../wikimedia-messages/i18n/wikimediaprojectnames/');
const OUTPUT_DIR = path.join(dirname, '../i18n-merged/');
const KEY_MAPPING: [RegExp, string][] = [
  [/^project-localized-name-wikidatawiki$/, 'wikidata.org'],
  [/^project-localized-name-mediawikiwiki$/, 'mediawiki.org'],
  [/^project-localized-name-sourceswiki$/, 'wikisource.org'],
  [/^project-localized-name-otrs_wikiwiki$/, 'vrt-wiki.wikimedia.org'],
  [/^project-localized-name-be_x_oldwiki$/, 'be-tarask.wikipedia.org'],
  [/^project-localized-name-etwikimedia$/, 'ee.wikimedia.org'],
  [/^project-localized-name-labswiki$/, 'wikitech.wikimedia.org'],
  [/^project-localized-name-testwikidatawiki$/, 'test.wikidata.org'],
  [/^project-localized-name-chapcomwiki$/, 'affcom.wikimedia.org'],
  [/^project-localized-name-(\w+)wikimedia$/, '$1.wikimedia.org'],
  [/^project-localized-name-(\w+)wiktionary$/, '$1.wiktionary.org'],
  [/^project-localized-name-(\w+)wikivoyage$/, '$1.wikivoyage.org'],
  [/^project-localized-name-(\w+)wikibooks$/, '$1.wikibooks.org'],
  [/^project-localized-name-(\w+)wikinews$/, '$1.wikinews.org'],
  [/^project-localized-name-(\w+)wikiquote$/, '$1.wikiquote.org'],
  [/^project-localized-name-(\w+)wikisource$/, '$1.wikisource.org'],
  [/^project-localized-name-(\w+)wikiversity$/, '$1.wikiversity.org'],
  [/^project-localized-name-(\w{2,3}(?:_\w{1,4}){0,2}|sysop_it|simple|zh_classical|thankyou|nostalgia|test|test2)wiki$/, '$1.wikipedia.org'],
  [/^project-localized-name-(\w+)wiki$/, '$1.wikimedia.org'],
];

function transformWikimediaMessageKeys(data: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, item]) => {
      let transformedKey = KEY_MAPPING.reduce(
        (prevKey, [regex, replacement]) => prevKey.replace(regex, replacement),
        key,
      );

      // e.g. zh_classical.wikipedia.org => zh-classical.wikipedia.org
      transformedKey = transformedKey.replace(/_/g, '-');
      transformedKey = `name-${transformedKey}`;

      return [transformedKey, item];
    }),
  );
}

function logWithCaption(str: string) {
  console.log(`\x1b[33mmerge-i18n\x1b[0m: ${str}`);
}

const localeRegistry: Record<string, Record<string, string>> = {};

const wikimediaMessageFiles = await fs.readdir(WIKIMEDIA_MSG_DIR);
const filesI18n = await fs.readdir(I18N_DIR);

await Promise.all([
  ...wikimediaMessageFiles.map(async (filename) => {
    const filePath = path.join(WIKIMEDIA_MSG_DIR, filename);

    const data: Record<string, string> = JSON.parse((await fs.readFile(filePath)).toString());
    delete data['@metadata'];
    const transformedData = transformWikimediaMessageKeys(data);

    localeRegistry[filename] = localeRegistry[filename] ?? {};
    Object.assign(localeRegistry[filename], transformedData);
  }),
  ...filesI18n.map(async (filename) => {
    const filePath = path.join(I18N_DIR, filename);

    const data: Record<string, string> = JSON.parse((await fs.readFile(filePath)).toString());
    delete data['@metadata'];

    localeRegistry[filename] = localeRegistry[filename] ?? {};
    Object.assign(localeRegistry[filename], data);
  }),
]);

try {
  await fs.access(OUTPUT_DIR);
} catch {
  await fs.mkdir(OUTPUT_DIR);
}

Object.entries(localeRegistry).forEach(async ([filename, data]) => {
  const targetFilePath = path.join(OUTPUT_DIR, filename);
  const dataStringified = JSON.stringify(data);
  logWithCaption(`\x1b[32m${filename}\x1b[0m\t\t${dataStringified.length} character(s)`);
  await fs.writeFile(targetFilePath, dataStringified);
});

logWithCaption(`\x1b[36mMerged ${Object.keys(localeRegistry).length} locales in total.`);
