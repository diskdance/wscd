const MAPPINGS: Record<string, string> = {
  zh: 'zh-hans',
  'zh-cn': 'zh-hans',
  'zh-tw': 'zh-hant',
  'zh-sg': 'zh-hans',
};

/**
 * Get user's preferred language. `?lang=xxx` takes priority over `navigator.languages`.
 * @return language
 */
function getCurrentLang(): string {
  let lang = (new URLSearchParams(window.location.search).get('lang')
    || navigator.language).toLowerCase();
  if (lang in MAPPINGS) {
    lang = MAPPINGS[lang];
  }
  return lang;
}

async function getMessages(lang: string): Promise<Record<string, Record<string, string>>> {
  const result: Record<string, Record<string, string>> = {
    en: (await import('../../i18n-merged/en.json')).default,
  };
  if (lang !== 'en') {
    try {
      let bananaInPreferredLang: Record<string, string>;
      try {
        bananaInPreferredLang = (await import(`../../i18n-merged/${lang}.json`)).default;
      } catch {
        bananaInPreferredLang = (await import(`../../i18n-merged/${lang.split('-')[0]}.json`)).default;
      }
      result[lang] = bananaInPreferredLang;
    } catch { }
  }
  return result;
}

export { getCurrentLang, getMessages };
