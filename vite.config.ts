import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.ts', '.js', '.vue']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://212.64.72.51:81',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/myapi': {
        target: 'http://127.0.0.1:9988',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/myapi/, '/myapi')
      },
    },
  }
})