import { createApp } from 'vue';
import Banana from 'banana-i18n';

import './styles/reset.less';
import './styles/style.less';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import App from './App.vue';
import getI18nInfo from './modules/lang';

(async () => {
  const app = createApp(App);

  const { lang, messageSource } = await getI18nInfo();
  const banana = new Banana(lang, { messages: messageSource, wikilinks: true });

  document.title = banana.i18n('title');
  document.documentElement.lang = lang; // For a11y support

  app.config.globalProperties.$i18n = banana.i18n.bind(banana);
  app.provide('banana', banana);
  app.mount('#app');
})();
