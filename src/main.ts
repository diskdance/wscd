import { createApp } from 'vue';
import { createI18n } from 'vue-banana-i18n';

import './styles/reset.less';
import './styles/style.less';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import App from './App.vue';
import { getMessages, getCurrentLang } from './modules/lang';

(async () => {
  const app = createApp(App);
  const lang = getCurrentLang();
  const messages = await getMessages(lang);
  const i18nPlugin = createI18n({
    messages,
    locale: lang,
    wikilinks: true,
  });

  // For a11y support
  document.documentElement.lang = lang in messages ? navigator.language : 'en';

  app.use(i18nPlugin);
  app.mount('#app');
})();
