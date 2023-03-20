<svelte:options accessors />

<script lang="ts">
  import Pagination from '$components/Pagination.svelte'
  import Skeleton from '$components/Skeleton.svelte'
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { Album } from '$root/classes'
  import type { RouteParams } from './$types'
  import { PUBLIC_APP_NAME, PUBLIC_LASTFM_API_URL } from '$env/static/public'
  import Image from '$components/Image.svelte'
  import Link from '$components/Link.svelte'

  export let data: RouteParams = { page: '1' }
  export let albums = new Array<Album>()
  let pageAmount: number
  let img = new Array<Image>()
  let loaded = false

  export const fetchData = async (max = 1000, pageLim = 50) => {
    const resLimit = max
    const pageLimit = pageLim
    const url = PUBLIC_LASTFM_API_URL

    await axios
      .get(
        `${url}method=tag.gettopalbums&tag=1001+albums+you+must+hear+before+you+die&page=${data.page}`
      )
      .then(async res => {
        albums = new Array()
        res.data.albums.album.forEach((res: any, i: number) => {
          albums.push(new Album(undefined, res))
        })
        pageAmount = Math.ceil(resLimit / pageLimit)
        img.forEach(e => e.reload())
      })
    loaded = true
    return albums
  }

  onMount(async () => fetchData())

  export const setup = {
    pageBut:
      'but text-gray-800 hover:text-gray-200 dark:hover:text-gray-200 dark:text-gray-200 bg-gray-200 dark:bg-gray-800',
    pageActive:
      'but text-gray-200 dark:text-gray-800 dark:hover:text-gray-200 bg-gray-800 dark:bg-gray-200',
    ellip: 'ellip sm:py-1 sm:text-base text-gray-800 dark:text-gray-200'
  }
</script>

<svelte:head>
  <title>library | {PUBLIC_APP_NAME}</title>
</svelte:head>

<!-- {#if false} -->
{#if loaded}
  <div class="text-column text-gray-800 dark:text-gray-200">
    <h1>library</h1>
    <Pagination {data} {setup} {pageAmount} {fetchData} className={''} />
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
      {#each albums as album, i}
        <div class="rounded-xl bg-gray-200 dark:bg-gray-800 p-3 item">
          <Link shadow nodefault href="/library/release/{album?.id}">
            <div class="w-full rounded-md overflow-hidden">
              <Image
                bind:this={img[i]}
                alt="{album?.artist} - {album?.name}"
                style="width: 100%"
                src={album?.imgUrl}
              />
            </div>
            <div class="text-center">
              {album?.name}
            </div>
          </Link>
        </div>
      {/each}
    </div>
    <Pagination {data} {setup} {pageAmount} {fetchData} className={'pb-8'} />

    <div class="hidden">
      <p>tasks:</p>

      <ul>
        <li>[x] iterate and list the first 1000 - basic</li>
        <li>[x] list with pagination, limit to 50 - basic/intermediate</li>
        <li>[x] compact, 7 columns on lg or xl screen - stylization</li>
        <li>[ ] allow search - advanced</li>
        <li>[ ] filter by artist - advanced</li>
        <li>[ ] filter by tag (+1001 albums you must hear before you die) - advanced</li>
      </ul>
    </div>
  </div>
{:else}
  <p>loading...</p>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
    {#each { length: 49 } as _}
      <Skeleton type={'photo/title'} />
    {/each}
  </div>
{/if}

<style lang="postcss">
  :root {
    --link-color: rgba(255, 62, 62, 0.5);
    --blur: 1.5px;
  }
  .item a:hover {
    filter: drop-shadow(0 0 var(--blur) var(--link-color))
      drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color))
      drop-shadow(0 0 var(--blur) var(--link-color));
  }
</style>
