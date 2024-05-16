import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { glob, copyFile, open, unlink } from 'fs/promises'

// try {
//   const fd = await open('./www/index.html')
//   await fd.close()
// } catch (error) {
await copyFile('./src/index.html', './www/index.html')
// }
const sourceFiles = await glob(['./src/**/*.ts'])

const input = []

for await (const path of sourceFiles) {
  if (path.endsWith('.ts') && !path.endsWith('.css.ts')) input.push(path)
}

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async (dir) => {
    const promises = []
    const files = await glob('./www/**/*.js')
    for await (const path of files) {
      if (path.endsWith('.js')) promises.push(unlink(path))
    }

    await Promise.all(promises)
  }
})

export default [
  {
    input,
    output: {
      format: 'es',
      dir: 'www'
    },
    plugins: [cleanBuild(), nodeResolve(), typescript()]
  }
]
