<script lang="ts">
  import { page } from '$app/stores'
  import { PUBLIC_APP_NAME } from '$env/static/public'
  import { onMount } from 'svelte'
  import auth from 'sveltekit-auth0'
  import Link from './Link.svelte'

  let showMenu = false

  const toggleNavbar = () => (showMenu = !showMenu)

  let isAuthenticated = false
  export let registerLocal: Function

  const authenticate = () => {
    // If auth0:user = '{}', parse to empty object {}, then if empty return false even Boolean({}) being true, otherwise true
    isAuthenticated = Object.keys(JSON.parse(localStorage.getItem('auth0:user') || '{}')).length > 0
    registerLocal({ login: true })
  }
  const unauthenticate = () => {
    isAuthenticated = false
    registerLocal({ logout: true })
  }

  onMount(() => authenticate())
</script>

<header class="dark:bg-gray-900 ">
  <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
    <div class="flex items-center justify-between">
      <Link
        href="/"
        nodefault
        class="dark:text-gray-100 text-gray-900 dark:hover:text-red-300 hover:text-red-300 text-xl font-bold md:text-2xl"
      >
        {PUBLIC_APP_NAME}
      </Link>
      <button on:click={toggleNavbar} class="flex md:hidden" aria-label="menu">
        <span
          class="text-gray-900 dark:text-gray-100 hover:text-red-300 dark:hover:text-red-300 focus:outline-none focus:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
      </button>
    </div>

    <div
      class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
        ? 'flex'
        : 'hidden'}"
    >
      <Link
        href="/"
        nodefault
        class="dark:text-gray-100 text-gray-900 dark:hover:text-red-300 hover:text-red-300 border-t-4 {$page
          .url.pathname === '/'
          ? 'border-red-300'
          : 'border-transparent'}"
      >
        home
      </Link>
      <Link
        href="/library"
        nodefault
        class="dark:text-gray-100 text-gray-900 dark:hover:text-red-300 hover:text-red-300 border-t-4 {$page.url.pathname.slice(
          0,
          '/library'.length
        ) === '/library'
          ? 'border-red-300'
          : 'border-transparent'}"
      >
        library
      </Link>
      <Link
        href="/about"
        nodefault
        class="dark:text-gray-100 text-gray-900 dark:hover:text-red-300 hover:text-red-300 border-t-4 {$page
          .url.pathname === '/about'
          ? 'border-red-300'
          : 'border-transparent'}"
      >
        about
      </Link>
      <div class="space-y-2">
        {#if !isAuthenticated}
          <button
            aria-label="login"
            draggable="false"
            on:click={async () => {
              await auth.loginWithPopup({})
              authenticate()
            }}
            class="py-3 px-4 text-center border text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-red-300 hover:text-gray-800 dark:hover:text-black dark:hover:bg-red-300  rounded-md block lg:inline lg:border-0"
          >
            login
          </button>
        {:else}
          <button
            aria-label="logout"
            draggable="false"
            on:click={async () => {
              unauthenticate()
              await auth.logout()
            }}
            class="py-3 px-4 text-center border text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-red-300 hover:text-gray-800 dark:hover:text-black dark:hover:bg-red-300  rounded-md block lg:inline lg:border-0"
          >
            logout
          </button>
        {/if}
      </div>
    </div>
  </nav>
</header>

<style>
</style>
