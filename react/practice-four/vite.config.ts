import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import Sitemap from 'vite-plugin-sitemap';

const names = ['', 'vocabulary', 'testing', 'result'];
const dynamicRoutes = names.map((name) => `/${name}`);
const envVariables = loadEnv('mock', process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    EnvironmentPlugin('all'),
    Sitemap({ dynamicRoutes, hostname: envVariables.VITE_HOST_NAME }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
