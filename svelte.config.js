// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: path.resolve('./src/lib/components'),
      $images: path.resolve('./src/lib/images'),
      $root: path.resolve('./src')
    }
  },
  preprocess: vitePreprocess()
}

export default config
