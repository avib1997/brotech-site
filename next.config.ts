// next.config.js
import path from 'path'

module.exports = {
  webpack(config: { resolve: { alias: { [x: string]: string } } }) {
    config.resolve.alias['framer-motion'] = path.resolve(__dirname, 'src/lib/noop-motion.ts')
    return config
  }
}
