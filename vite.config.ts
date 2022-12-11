import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { execSync } from 'child_process';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';

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
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
      ],
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    GIT_HASH: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
  },
  build: {
    sourcemap: true,
  },
});
