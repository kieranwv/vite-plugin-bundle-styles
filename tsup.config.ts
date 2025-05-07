import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm', 'iife'],
  globalName: 'vitePluginBundleStyles',
  dts: true,
  minify: true,
})
