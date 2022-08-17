const MAPPINGS: Record<string, string> = {
  zh: 'zh-hans',
  'zh-cn': 'zh-hans',
  'zh-tw': 'zh-hant',
  'zh-sg': 'zh-hans',
};

function getCurrentLang(): string {
  let lang = navigator.language.toLowerCase();
  if (lang in MAPPINGS) {
    lang = MAPPINGS[lang];
  } else if (lang.includes('-')) {
    [lang] = lang.split('-');
  }
  return lang;
}

async function getMessages(lang: string): Promise<Record<string, Record<string, string>>> {
  const result: Record<string, Record<string, string>> = {
    en: (await import('../../i18n-merged/en.json')).default,
  };
  if (lang !== 'en') {
    try {
      const { default: bananaCurrentLang } = await import(`../../i18n-merged/${lang}.json`);
      result[lang] = bananaCurrentLang;
    } catch { }
  }
  return result;
}

export { getCurrentLang, getMessages };
