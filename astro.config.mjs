import { defineConfig } from 'astro/config';

export default defineConfig({
  src: './src',
  outDir: './dist',
  publicDir: './public',
  output: 'static',
  trailingSlash: 'ignore',
  server: {
    host: true,
    port: 3000,
  },
});