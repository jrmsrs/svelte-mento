<svelte:options accessors />

<script lang="ts">
  import Pagination from '$components/Pagination.svelte'
  import Skeleton from '$components/Skeleton.svelte'
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { PikomonData } from '$root/classes'
  import type { RouteParams } from './$types'

  function gotoNewTab(url: string) {
    window.open(url, '_blank')
  }
  export const artwork_url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
  export const dream_url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world'
  export const animated_url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated'
  export const fallback =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'

  export let data: RouteParams = { page: '1' }
  export let pikomonData = new Array<PikomonData>()
  let pageAmount: number

  export async function fetchData(max = 151, pageLim = 18): Promise<PikomonData[]> {
    const resLimit = max
    const pageLimit = pageLim
    const url = 'https://pokeapi.co/api/v2'

    await axios.get(`${url}/pokemon/?limit=${resLimit}`).then(res1 => {
      pikomonData = new Array()
      res1.data.results.forEach((res: any, i: number) => {
        pikomonData.push(new PikomonData(res))
      })
      //pikomonData = res1.data.results
      // trim 60*(page number-1) first results
      pikomonData.splice(0, pageLimit * (Number(data.page) - 1))
      // trim all results after 60
      pikomonData.splice(pageLimit, Number.MAX_VALUE)
      pageAmount = Math.ceil(resLimit / pageLimit)
    })
    return pikomonData
  }

  onMount(async () => {
    fetchData()
  })

  export const setup = {
    pageBut:
      'but text-gray-800 hover:text-gray-200 dark:hover:text-gray-200 dark:text-gray-200 bg-gray-200 dark:bg-gray-800',
    pageActive:
      'but text-gray-200 dark:text-gray-800 dark:hover:text-gray-200 bg-gray-800 dark:bg-gray-200',
    ellip: 'ellip sm:py-1 sm:text-base text-gray-800 dark:text-gray-200'
  }
</script>

<svelte:head>
  <title>pikodex | pikomon social</title>
  <meta name="description" content="About app" />
</svelte:head>

{#if pikomonData}
  <div class="text-column text-gray-800 dark:text-gray-200">
    <h1>pikodex</h1>
    <Pagination {data} {setup} {pageAmount} {fetchData} className={''} />
    <div class="grid grid-cols-12 gap-8">
      {#each pikomonData as piko}
        <div
          class="col-span-6 sm:col-span-3 lg:col-span-2 rounded-xl bg-gray-200 dark:bg-gray-800 p-3 item"
        >
          <a
            draggable="false"
            href="/pikodex/pikomon/{piko?.id}"
            on:auxclick={() => gotoNewTab(`/pikodex/pikomon/${piko?.id}`)}
          >
            <div class="w-full">
              <img
                class="w-full"
                src="{artwork_url}/{piko?.id}.png"
                alt="pokemon {piko?.name} (#{piko?.id})"
              />
            </div>
            <div class="text-center">
              {piko?.name}
            </div>
          </a>
        </div>
      {/each}
    </div>
    <Pagination {data} {setup} {pageAmount} {fetchData} className={'pb-8'} />

    <div class="hidden">
      <p>tasks:</p>

      <ul>
        <li>[x] iterate and list the first 151 - basic</li>
        <li>[x] list with pagination, limit to 60 - basic/intermediate</li>
        <li>[x] compact, 6 columns on lg or xl screen - stylization</li>
        <li>[ ] allow search - advanced</li>
        <li>[ ] filter by type, egg group(?), evolution(?) etc - advanced</li>
      </ul>
    </div>
  </div>
{:else}
  <p>loading...</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
    {#each { length: 18 } as _}
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
