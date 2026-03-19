import { defineConfig } from 'astro/config';

export default defineConfig({
  src: './src',
  outDir: './dist',
  publicDir: './public',
  output: 'static',
  trailingSlash: 'never',
  server: {
    host: true,
    port: 3000,
  },
});