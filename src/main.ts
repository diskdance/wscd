import { createApp } from 'vue';
import Banana from 'banana-i18n';

import './styles/reset.less';
import './styles/style.less';

import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import App from './App.vue';
import { getMessages, getCurrentLang } from './modules/lang';

(async () => {
  const app = createApp(App);

  const locale = getCurrentLang();
  const messages = await getMessages(locale);
  const banana = new Banana(locale, { messages, wikilinks: true });

  document.title = banana.i18n('title');
  document.documentElement.lang = locale in messages ? navigator.language : 'en'; // For a11y support

  app.config.globalProperties.$i18n = banana.i18n.bind(banana);
  app.mount('#app');
})();
