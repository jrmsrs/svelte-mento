<script lang="ts">
  import Link from '$components/Link.svelte'
  import { PUBLIC_APP_NAME } from '$env/static/public'
  import { loading$ } from '$root/stores'
  import { onMount } from 'svelte'
  onMount(() => loading$.set(false))
</script>

<svelte:head>
  <title>about | {PUBLIC_APP_NAME}</title>
  <meta name="description" content="about da app" />
</svelte:head>

<div class="text-column text-gray-900 dark:text-gray-100">
  <h1>about</h1>

  <div class="text-justify leading-relaxed">
    <p class="mt-4">
      dis just a shitty project for my first interaction with sveltekit (i come from react +
      express), tailwind css (i come from bootstrap), mongodb (i come from mysql and sqlite).
    </p>

    <p class="mt-4">
      a mini frontend for <Link href="https://www.last.fm/api" blank>Last.FM API</Link>. late ull be
      able to fav an album and see who follow, rate 0-5 stars, make review, follow user, etc, but
      for now the main focus r to maintain project as scallable as possible.
    </p>

    <p class="mt-4">
      tusm: gueibe | <Link href="https://discord.com/invite/svelte" blank
        >Svelte Discord server</Link
      >
      | <Link href="https://medium.com/collabcode" blank>CollabCode</Link> / <Link
        href="https://discord.gg/FP5UaAG"
        blank>Discord server</Link
      > |
      <Link href="https://www.youtube.com/@noneclass" blank>NoNe Class</Link> / <Link
        href="https://discord.com/invite/p9WN6Rx"
        blank>Discord server</Link
      > | <Link href="https://www.youtube.com/@Huntabyte" blank>Huntabyte</Link> | <Link
        href="https://www.youtube.com/@Akitando"
        blank>Fábio Akita insights</Link
      > | <Link href="https://twitter.com/edmotters" blank
        >Fan Clube Ed Motta Nova Iguaçu Queimados e Região</Link
      >
    </p>
  </div>

  <div class="mt-6 text-sm font-thin text-center">
    <p>
      <Link href="https://gitlab.com/jrmsrs/svelte-mento" blank>sauce</Link>
    </p>
    <p>
      <Link href="https://gilab.com/jrmsrs" blank>jrmsrs</Link> | 2023
    </p>
  </div>
</div>
