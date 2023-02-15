// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // if true, will deploy the app using edge functions
      // (https://vercel.com/docs/concepts/functions/edge-functions)
      // rather than serverless functions
      edge: false,

      // an array of dependencies that esbuild should treat
      // as external when bundling functions. this only applies
      // to edge functions, and should only be used to exclude
      // optional dependencies that will not run outside Node
      external: [],

      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app
      split: false,
    }),
    alias: {
      // this will match a file
      //'my-file': 'path/to/my-file.js',

      // this will match a directory and its contents
      // (`my-directory/x` resolves to `path/to/my-directory/x`)
      //'my-directory': 'path/to/my-directory',
      $components: path.resolve('./src/lib/components'),
      $images: path.resolve('./src/lib/images'),

      // an alias ending /* will only match
      // the contents of a directory, not the directory itself
      //'my-directory/*': 'path/to/my-directory/*'
    },
  },
  preprocess: vitePreprocess(),
}

export default config
