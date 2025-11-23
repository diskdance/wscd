declare module 'vue' {
  interface ComponentCustomProperties {
    $i18n(key: string, ...params: import('banana-i18n').ParameterType[]): string,
  }
}

// Ensure this is a TypeScript module
export { };
