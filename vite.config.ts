import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  base: '/React-Typescript-dark-mode-toggle-with-GSAP-animations-/',
  plugins: [
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: {
      postcss: null,
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
})
