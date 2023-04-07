<div class="h-screen w-screen -z-30 fixed grid content-center pointer-events-none mobile-bg" />
<div class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
  <slot />
</div>

<style lang="postcss">
  .mobile-bg {
    background: linear-gradient(to top left, #111827, rgba(255, 153, 150, 0), white),
      linear-gradient(to top right, #fca5a5, rgba(255, 153, 150, 0), #fca5a5) #111827;
  }
</style>
