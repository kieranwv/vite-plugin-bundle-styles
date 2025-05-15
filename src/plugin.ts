import type { PluginOption } from 'vite'
import type { BundleStylesOptions } from './types'
import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import cssnano from 'cssnano'
import less from 'less'
import postcss from 'postcss'
import sass from 'sass'

export function viteBundleStyles(options: BundleStylesOptions): PluginOption {
  return {
    name: 'vite-plugin-bundle-styles',
    enforce: 'post',
    async generateBundle() {
      const cssFiles: string[] = []
      const srcDir = path.resolve(cwd(), options.target)
      const formats = options.formats || ['css', 'scss', 'sass', 'less']

      function collectCssFiles(dir: string): void {
        const files = fs.readdirSync(dir)
        for (const file of files) {
          const fullPath = path.join(dir, file)
          const stat = fs.statSync(fullPath)
          if (stat.isDirectory()) {
            collectCssFiles(fullPath)
          }
          else if (formats.some(ext => file.endsWith(`.${ext}`))) {
            cssFiles.push(fullPath)
          }
        }
      }

      collectCssFiles(srcDir)

      let combinedCss = ''
      for (const file of cssFiles) {
        const ext = path.extname(file).toLowerCase()
        let css = ''

        if (ext === '.scss' || ext === '.sass') {
          try {
            const result = sass.compile(file)
            css = result.css.toString()
          }
          catch (err) {
            console.error(`Error processing SCSS file ${file}:`, err)
            continue
          }
        }
        else if (ext === '.less') {
          try {
            const source = fs.readFileSync(file, 'utf-8')
            const result = await less.render(source, {
              filename: file,
              paths: [path.dirname(file)],
            })
            css = result.css
          }
          catch (err) {
            console.error(`Error processing LESS file ${file}:`, err)
            continue
          }
        }
        else {
          css = fs.readFileSync(file, 'utf-8')
        }

        combinedCss += `${css}\n`
      }

      const result = await postcss([cssnano]).process(combinedCss, { from: undefined })
      const compressedCss = result.css

      const outputFileName = options.fileName || 'styles.css'
      this.emitFile({
        type: 'asset',
        fileName: outputFileName,
        source: compressedCss,
      })
    },
  }
}
