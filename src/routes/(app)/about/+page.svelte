<script lang="ts">
  import Link from '$components/Link.svelte'
  import { PUBLIC_APP_NAME } from '$env/static/public'
</script>

<svelte:head>
  <title>about | {PUBLIC_APP_NAME}</title>
  <meta name="description" content="about da app" />
</svelte:head>

<div class="text-column text-gray-900 dark:text-gray-100">
  <h1>about</h1>

  <p>
    dis just a shitty project for my first interaction with sveltekit (i came from react + express),
    tailwind css (i came from bootstrap), mongodb (i came from mysql and sqlite).
  </p>

  <p>
    a mini social media based on rateyourmusic using <Link href="https://www.last.fm/api" blank
      >Last.FM API</Link
    >. you will be able to favorite an album and see who follow, rate 0 to 5 stars, make review,
    follow user(?).
  </p>

  <p class="mt-6 text-sm font-thin">
    <Link href="https://github.com/jrmsrs" blank>jrmsrs</Link> | 2023
  </p>
</div>
