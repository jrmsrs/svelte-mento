<script lang="ts">
  import '$root/app.css'
  import Header from '$components/Header.svelte'
  import darkIcon from '$images/buttons/dark.webp'
  import lightIcon from '$images/buttons/light.webp'

  import './styles.css'
  import { browser } from '$app/environment'
  import auth, { getUser } from 'sveltekit-auth0'
  import { onMount, onDestroy } from 'svelte'

  let subscription: any

  const registerLocal = (options?: { logout: boolean }) => {
    const user$ = getUser()
    subscription = user$.subscribe(value => {
      localStorage.setItem('auth0:user', options?.logout ? '{}' : JSON.stringify(value || {}))
    })
  }

  onMount(() => {
    auth.initializeAuth0()
    registerLocal()
  })
  onDestroy(() => subscription?.unsubscribe())

  export let dark = true
  if (browser) dark = localStorage.getItem('dark') == 'true' || false
</script>

<svelte:head>
  <meta name="theme-color" content={dark ? '#111827' : 'F3F4F6'} />
  <!-- dark 111827 | light F3F4F6 -->
</svelte:head>

<div class="app {dark ? 'dark' : ''} h-screen">
  <button
    type="button"
    on:click={() => {
      dark = !dark
      localStorage.setItem('dark', dark.toString())
    }}
    class="bottom-0 right-0 fixed bg-gray-900 dark:bg-gray-100 m-4 md:m-8 w-12 z-10 h-12 md:w-16 md:h-16 opacity-25 transition-all hover:opacity-100 rounded-full overflow-hidden"
  >
    <img
      width="250"
      height="250"
      src={dark ? darkIcon : lightIcon}
      alt="{dark ? 'light' : 'dark'} mode"
    />
  </button>

  <div class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100  min-h-screen">
    <Header {registerLocal} />

    <main class="container mx-auto px-5 my-4">
      <slot />
    </main>
  </div>
</div>

<style lang="postcss">
</style>
