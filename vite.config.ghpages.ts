import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { execSync } from 'child_process';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
    }),
    splitVendorChunkPlugin(),
    VitePWA({
      selfDestroying: true,
    }),
  ],
  base: '/wscd/',
  define: {
    APP_VERSION: JSON.stringify(`${process.env.npm_package_version}-gh`),
    GIT_HASH: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
  },
  build: {
    sourcemap: true,
  },
});
