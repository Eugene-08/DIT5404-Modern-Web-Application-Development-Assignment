import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  server: {
    https: false,
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    hot: "only",
  },
  plugins: [react(), mkcert()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
