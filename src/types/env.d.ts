/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

const APP_VERSION: string;

const GIT_HASH: string;
