import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    checker({
      vueTsc: {
        tsconfigPath: './tsconfig.app.json',
      },
      typescript: true,
      overlay: {
        initialIsOpen: true,
        position: 'tl',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
