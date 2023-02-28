<style>
</style>

<script lang="ts">
  export let type: string
  let svgPlaceholderPath =
    'm512 359.18c84.4 0 152.81 68.42 152.82 152.82 0 84.4-68.42 152.81-152.82 152.82-84.4 0-152.81-68.42-152.82-152.82 0-84.4 68.42-152.82 152.82-152.82zm0 50.94c-56.27 0-101.88 45.61-101.88 101.88s45.61 101.88 101.88 101.88 101.88-45.61 101.88-101.88-45.61-101.88-101.88-101.88zm294.16-192.28c78.01 78.02 121.84 183.83 121.84 294.16s-43.83 216.14-121.84 294.16c-78.02 78.01-183.83 121.84-294.16 121.84s-216.14-43.83-294.16-121.84c-78.01-78.02-121.84-183.83-121.84-294.16s43.83-216.14 121.84-294.16c78.02-78.01 183.83-121.84 294.16-121.84s216.14 43.83 294.16 121.84zm-474.14 294.16h-193.57c0 99.07 39.36 194.09 109.41 264.14s165.07 109.41 264.14 109.41 194.09-39.36 264.14-109.41 109.41-165.07 109.41-264.14h-193.57c0-99.4-80.58-179.98-179.98-179.98s-179.98 80.58-179.98 179.98z'
</script>

{#if type == 'photo/title'}
  <div class="rounded overflow-hidden shadow-lg item col-span-2">
    <div
      role="status"
      class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div
        class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"
      >
        <svg
          class="w-24 h-24 text-gray-200 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgPlaceholderPath} />
        </svg>
      </div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else if type == 'photo/textbox'}
  <div class="rounded overflow-hidden shadow-lg item">
    <div
      role="status"
      class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div
        class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"
      >
        <svg
          class="w-24 h-24 text-gray-200 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgPlaceholderPath} />
        </svg>
      </div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      <div class="flex items-center mt-4 space-x-3">
        <div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
          <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{/if}
