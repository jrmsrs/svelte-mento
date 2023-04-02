<svelte:options accessors />

<script lang="ts">
  import Image from '$components/Image.svelte'
  import { loading$ } from '$root/stores'
  import { afterUpdate, onMount } from 'svelte'

  export let data
  $: ({ albumData } = data.streamed)
  $: ({ albumName, artistName } = data)

  const secToISO = (duration?: number) => {
    if ((duration || 0) >= 3600) return new Date((duration || 0) * 1000).toISOString().slice(12, 19) // H:MM:SS
    return new Date((duration || 0) * 1000).toISOString().slice(14, 19) // MM:SS
  }
  function without(this: string, a: string) {
    return this != a
  }

  onMount(() => loading$.set(false))
  afterUpdate(() => loading$.set(false))
</script>

<svelte:head>
  <title>library | {artistName} - {albumName}</title>

  <meta name="description" content="About app" />
</svelte:head>

{#await albumData}
  <p>loading...</p>
{:then album}
  <div class="text-column text-gray-900 dark:text-gray-100 pb-8">
    <div class="grid grid-cols-6 gap-8">
      <div
        class="col-span-6 md:col-span-3 lg:col-span-2 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-800  item"
        style="background-image: url({album.imgUrl}); background-size: 100% 100%;"
      >
        <div class="grid grid-cols-2  gap-8 h-full" style="backdrop-filter: blur(20px);">
          <div class="p-2  col-span-2">
            <Image class="w-full rounded-md overflow-hidden" src={album.imgUrl} alt={album.name} />
          </div>
          <div
            style="backdrop-filter: blur( 20px);"
            class="col-span-2 bg-gray-200 dark:bg-gray-700"
          >
            <div class="px-6 py-4">
              <p class="album">{album.name}</p>
              <p class="artist">{album.artist}</p>
            </div>
            <div class="px-6 pt-4 pb-2">
              {#if album.tags}
                {#each album.tags.filter(without, '1001 albums you must hear before you die') as tag}
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                {/each}
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-6 md:col-span-3 lg:col-span-4 flex h-full rounded-xl bg-gray-300 dark:bg-gray-800 overflow-hidden"
      >
        <div class="h-full m-auto w-full flex-col ">
          <table
            class="text-sm text-left text-gray-500 dark:text-gray-400  bg-gray-200 dark:bg-gray-700"
          >
            <thead>
              <tr class="dark:border-gray-700">
                <th colspan="3" class="pt-4 text-center">tracks</th>
              </tr>
            </thead>
            <tbody>
              <tr class="dark:border-gray-700">
                <td class="w-fit whitespace-nowrap" />
                <td class="w-full text-center" />
                <td />
              </tr>
              {#if album.tracks}
                {#if album.tracks.length <= 0}
                  <tr class="dark:border-gray-700">
                    <td colspan="3" class="text-center px-6 py-4">tracks unavailable</td>
                  </tr>
                {/if}
                {#each album.tracks as track}
                  <tr class="dark:border-gray-700">
                    <td class="px-6 py-4">{track.number}</td>
                    <td> {track.name}</td>

                    <td class="px-6 py-4">{secToISO(track.duration || 0)}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="hidden">
      <p>tasks:</p>

      <ul>
        <li class="txt">[x] basic infos</li>
        <li class="txt">[x] tags and tracks - basic</li>
        <li class="txt">[x] wiki - basic</li>
        <li class="txt">[ ] similar albums - relationships between</li>
      </ul>
    </div>
  </div>
{:catch err}
  <p>{err.message}</p>
{/await}

<style lang="postcss">
  :root {
    --link-color: rgba(255, 62, 62, 0.5);
    --blur: 1.5px;
  }
</style>
