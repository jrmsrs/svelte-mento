<svelte:options accessors />

<script lang="ts">
  import Pagination from '$components/Pagination.svelte'
  import Skeleton from '$components/Skeleton.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import Image from '$components/Image.svelte'
  import Link from '$components/Link.svelte'
  import { loading$ } from '$root/stores'

  export let data
  $: ({ albumList } = data.lazy)

  let pageAmount: number
  let img = new Array<Image>()

  export const setup = {
    pageBut:
      'but text-gray-800 hover:text-gray-200 dark:hover:text-gray-200 dark:text-gray-200 bg-gray-200 dark:bg-gray-800',
    pageActive:
      'but text-gray-200 dark:text-gray-800 dark:hover:text-gray-200 bg-gray-800 dark:bg-gray-200',
    ellip: 'ellip sm:py-1 sm:text-base text-gray-800 dark:text-gray-200'
  }
  export const setPage = async (max = 1000, perPageLim = 50) => {
    pageAmount = Math.ceil(max / perPageLim)
  }

  onMount(() => setPage())
  afterUpdate(() => loading$.set(false))
</script>

<svelte:head>
  <title>library | page {data.page}</title>
</svelte:head>

<!-- {#if false} -->
{#await albumList}
  <p>loading...</p>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
    {#each { length: 49 } as _}
      <Skeleton type={'photo/title'} />
    {/each}
  </div>
{:then albums}
  <div class="text-column text-gray-800 dark:text-gray-200">
    <h1>library</h1>
    <Pagination {data} {setup} {pageAmount} className={''} />
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
    <Pagination {data} {setup} {pageAmount} className={'pb-8'} />
  </div>
{/await}

<style lang="postcss">
  :root {
    --link-color: rgba(255, 62, 62, 0.5);
    --blur: 1.5px;
  }
</style>
