import { MessageSource } from 'banana-i18n';
import EnMessageSource from '../../i18n-merged/en.json';

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

async function getI18nInfo(): Promise<{ lang: string, messageSource: MessageSource }> {
  const lang = getCurrentLang();
  const messageSource: Record<string, Record<string, string>> = {
    en: EnMessageSource,
  };

  let selectedLang = 'en';
  if (!lang.startsWith('en')) {
    for (const currentLang of [lang, lang.split('-')[0]]) {
      try {
        messageSource[currentLang] = (await import(`../../i18n-merged/${currentLang}.json`)).default;
        selectedLang = currentLang;
        break;
      } catch { }
    }
  }
  return { lang: selectedLang, messageSource };
}

export default getI18nInfo;
