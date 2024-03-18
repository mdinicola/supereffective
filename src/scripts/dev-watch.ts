import { $ } from 'bun'
import chokidar from 'chokidar'

async function buildCss() {
  await $`pnpm run build-css`
}

async function buildMdx() {
  await $`pnpm run build-mdx`
}

const watchTargets = ['./content/**/*.mdx', './src/styles/variables.config.ts']
chokidar
  .watch(watchTargets, {
    interval: 500,
    persistent: true,
    ignoreInitial: true,
  })
  .on('all', async (_event, path) => {
    if (path.endsWith('variables.config.ts')) {
      console.log('CSS Vars config changed, regenerating variables.(s)css ...')
      await buildCss()
    }
    if (path.endsWith('.md') || path.endsWith('.mdx')) {
      await buildMdx()
    }
  })
  .on('ready', async () => {
    await buildCss()
    await buildMdx()
    console.log(`[chokidar] Watching for changes in ${watchTargets.join(', ')} ...`)
  })
