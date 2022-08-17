/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-banana-i18n' {
  export function createI18n(options: {
    messages?: Record<string, Record<string, string>>, locale?: string, wikilinks?: boolean
  });
}

const APP_VERSION: string;
