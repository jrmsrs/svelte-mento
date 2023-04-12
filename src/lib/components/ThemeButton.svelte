<script lang="ts">
  import darkIcon from '$images/buttons/dark.webp'
  import lightIcon from '$images/buttons/light.webp'
  export let dark: boolean, setDarkMode: Function
</script>

<button
  type="button"
  class="bottom-0 right-0 fixed bg-gray-900 dark:bg-gray-100 m-4 md:m-8 w-12 z-10 h-12 md:w-16 md:h-16 opacity-25 transition-all hover:opacity-100 rounded-full overflow-hidden"
  aria-label="{dark ? 'light' : 'dark'} mode"
  on:click={() => setDarkMode()}
>
  <img
    width="250"
    height="250"
    src={dark ? darkIcon : lightIcon}
    alt="{dark ? 'light' : 'dark'} mode"
  />
</button>
