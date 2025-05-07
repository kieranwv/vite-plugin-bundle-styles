# vite-plugin-bundle-styles

[![GitHub Release Version](https://img.shields.io/github/v/release/kieranwv/vite-plugin-bundle-styles?label=Release&color=%42b883)](https://github.com/kieranwv/vite-plugin-bundle-styles/releases)
[![NPM Version](https://img.shields.io/npm/v/vite-plugin-bundle-styles?style=flat&label=npm&color=%42b883)](https://www.npmjs.com/package/vite-plugin-bundle-styles)
[![CI Status](https://github.com/kieranwv/vite-plugin-bundle-styles/actions/workflows/ci.yml/badge.svg?branch=main&color=%42b883)](https://github.com/kieranwv/vite-plugin-bundle-styles/actions/workflows/ci.yml)

Bundles and compresses all style files into a single optimized CSS file.

## Usage

```
pnpm add vite-plugin-bundle-styles -D
```

```ts
import { defineConfig } from 'vite'
import { viteBundleStyles } from 'vite-plugin-bundle-styles'

export default defineConfig({
  plugins: [
    viteBundleStyles({
      target: './src',
    }),
  ],
})
```

## License

[MIT License](./LICENSE) © 2025-PRESENT [Kieran Wang](https://github.com/kieranwv/)
