<script lang="ts">
  import Skeleton from '$components/Skeleton.svelte'
  import '$root/app.css'
  import './styles.css'
  import { onMount, onDestroy } from 'svelte'
  import axios from 'axios'
  import { PikomonData } from '$root/classes'
  import auth, { getUser } from 'sveltekit-auth0'

  export const artwork_url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
  export const fallback =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'

  let randPkNumbers = [0, 0, 0, 0, 0, 0]

  export const getRandPkNumber: (arr: Array<number>) => number = arr => {
    const randNum = Math.floor(Math.random() * 151) + 1
    const found = arr.find(e => {
      return e == randNum
    })
    return found ? getRandPkNumber(arr) : randNum
  }

  function gotoNewTab(url: string) {
    window.open(url, '_blank')
  }

  randPkNumbers.forEach((_, i: number) => {
    randPkNumbers[i] = getRandPkNumber(randPkNumbers)
  })

  let randPkData: PikomonData[] = new Array()
  export let loaded = 0

  export let user: any = {}

  onMount(async () => {
    const url = 'https://pokeapi.co/api/v2'
    randPkNumbers.forEach((_, i: number) => {
      axios.get(`${url}/pokemon-species/${randPkNumbers[i]}`).then(res1 => {
        axios.get(`${url}/pokemon/${randPkNumbers[i]}`).then(res2 => {
          randPkData.push(new PikomonData(res2.data, res1.data))
          loaded++
        })
      })
    })
    user = JSON.parse(localStorage.getItem('auth0:user') || '{}')
  })
</script>

<svelte:head>
  <title>home | pikomon social</title>
  <meta name="description" content="da app" />
</svelte:head>

<section class="text-gray-900 dark:text-gray-100">
  <div class="mt-6">
    {#if loaded >= 6}
      <p>welcome {user?.name ?? 'guest'} take a look at these pikomons</p>
      {#if !user?.name}
        <a
          href={null}
          on:click={async () => {
            await auth.loginWithPopup({})
          }}
          class="text-red-500 hover:text-red-300 dark:underline hover:no-underline text-xs"
        >
          login if you want to rate, favorite or review
        </a>
      {/if}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {#each randPkData as piko}
          <div class="rounded overflow-hidden shadow-lg item p-2">
            <a
              draggable="false"
              href="/pikodex/pikomon/{piko?.id}"
              on:auxclick={() => gotoNewTab(`/pikodex/pikomon/${piko?.id}`)}
            >
              <img
                class="w-full"
                src="{artwork_url}/{piko?.id}.png"
                alt="pokemon {piko?.name} (#{piko?.id})"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{piko?.name}</div>
                <p class="text-gray-700 dark:text-gray-200 text-base">
                  {piko?.desc}
                </p>
              </div>
            </a>
            <div class="px-6 pt-4 pb-2">
              <a
                draggable="false"
                href="/pikodex/1?type={piko?.types[0]}"
                on:auxclick={() => gotoNewTab(`/pikodex/1?type=${piko?.types[0]}`)}
              >
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko
                    ?.types[0]
                    ? 'type-' + piko?.types[0]
                    : 'hidden'}"
                >
                  {piko?.types[0]}
                </span>
              </a>
              <a
                draggable="false"
                href="/pikodex/1?type={piko?.types[1]}"
                on:auxclick={() => gotoNewTab(`/pikodex/1?type=${piko?.types[1]}`)}
              >
                <span
                  class="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko
                    ?.types[1]
                    ? 'type-' + piko?.types[1]
                    : 'hidden'}"
                >
                  {piko?.types[1]}
                </span>
              </a>
            </div>
          </div>
        {/each}
        <p class="mt-4">
          ...or check our <a
            draggable="false"
            href="/pikodex"
            class="text-red-500 hover:text-red-300 dark:underline hover:no-underline"
            on:auxclick={() => gotoNewTab('/pikodex')}>pikodex</a
          >
        </p>
      </div>
    {:else}
      <p>loading</p>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {#each { length: 6 } as _, i}
          <Skeleton type={'photo/textbox'} />
        {/each}
        <p class="mt-4">
          ...or check our <a
            draggable="false"
            href="/pikodex"
            class="text-red-500 hover:text-red-300 dark:underline hover:no-underline"
            on:auxclick={() => gotoNewTab('/pikodex')}>pikodex</a
          >
        </p>
      </div>
    {/if}

    <div class="hidden">
      <p>tasks:</p>

      <ul>
        <li>[x] basic integration with pokeapi</li>
        <li>[x] advanced integration with pokeapi</li>
        <li>[ ] authentication / permissions</li>
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
  .item a:hover {
    filter: drop-shadow(0 0 var(--blur) var(--link-color))
      drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color))
      drop-shadow(0 0 var(--blur) var(--link-color));
  }
</style>
