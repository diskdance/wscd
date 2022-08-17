declare module 'vue' {
  interface ComponentCustomProperties {
    $i18n: (msg: string, params?: Array<string | number>) => string,
  }
}

// Ensure this is a TypeScript module
export { };
