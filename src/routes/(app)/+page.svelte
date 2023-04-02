<script lang="ts">
  import Skeleton from '$components/Skeleton.svelte'
  import '$root/app.css'
  import './styles.css'
  import { afterUpdate, onMount } from 'svelte'
  import auth, { getUser } from 'sveltekit-auth0'
  import { PUBLIC_APP_NAME } from '$env/static/public'
  import Link from '$components/Link.svelte'
  import Image from '$components/Image.svelte'
  import { loading$ } from '$root/stores'

  let randAlbumIndexes = [0, 0, 0, 0, 0, 0]
  const pageNumbers = 20 // 1000 releases

  export const getRandAlbumIndex: (arr: Array<number>) => number = arr => {
    const randNum = Math.ceil(Math.random() * (pageNumbers * 50))
    const found = arr.find(e => e == randNum)
    return found ? getRandAlbumIndex(arr) : randNum
  }

  randAlbumIndexes.forEach(
    (_, i: number) => (randAlbumIndexes[i] = getRandAlbumIndex(randAlbumIndexes))
  )

  export let user: any = {}
  export let data: any
  $: ({ randAlbumList } = data.streamed)

  onMount(async () => (user = JSON.parse(localStorage.getItem('auth0:user') || '{}')))
  afterUpdate(() => loading$.set(false))
</script>

<svelte:head>
  <title>home | {PUBLIC_APP_NAME}</title>
  <meta name="description" content="da app" />
</svelte:head>

<section class="text-gray-900 dark:text-gray-100">
  <div class="mt-6">
    {#await randAlbumList}
      <p>loading</p>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {#each { length: 6 } as _, i}
          <Skeleton type={'photo/textbox'} />
        {/each}
      </div>
    {:then randAlbumList}
      <p>welcome {user?.name ?? 'guest'} what do you think about listening to these albums?</p>
      {#if !user?.name}
        <Link on:click={async () => await auth.loginWithPopup({})} href="/" cls="text-xs">
          login if you want to rate, favorite or review
        </Link>
      {/if}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {#each randAlbumList as album}
          <div class="rounded overflow-hidden shadow-lg item p-2">
            <Link shadow nodefault href="/library/release/{album?.id}">
              <div class="p-4">
                <Image
                  class="w-full rounded-md overflow-hidden"
                  src={album?.imgUrl}
                  alt={album?.name}
                />
              </div>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 album">{album?.name}</div>
                <p class="text-gray-700 dark:text-gray-200 text-base artist">
                  from {album?.artist}
                </p>
              </div>
            </Link>
          </div>
        {/each}
        <p class="mt-4">
          ...or check the <Link href="/library">full library</Link>
        </p>
      </div>
    {:catch err}
      <p>{err.message}</p>
    {/await}

    <div class="hidden">
      <p>tasks:</p>

      <ul>
        <li>[x] basic integration with Last.FM API</li>
        <li>[x] advanced integration with Last.FM API</li>
        <li>[x] authentication / permissions</li>
        <li>[ ] mongodb crud integration</li>
      </ul>
    </div>
  </div>
</section>

<style lang="postcss">
  :root {
    --link-color: rgba(255, 62, 62, 0.5);
    --blur: 1.5px;
  }
</style>
