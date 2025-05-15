/**
 * BundleStylesOptions
 */
export interface BundleStylesOptions {
  /**
   * The directory to bundle styles from.
   * @required
   * @example './src'
   */
  target: string
  /**
   * The output directory for the bundled styles.
   * @default "['css', 'scss', 'sass', 'less']"
   */
  formats?: string[]
  /**
   * The output format for the bundled styles.
   * @default 'styles.css'
   */
  fileName?: string
}
