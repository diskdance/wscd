import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { execSync } from 'child_process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    GIT_HASH: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
  },
});
