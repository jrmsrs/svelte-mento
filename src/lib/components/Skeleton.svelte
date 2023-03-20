<script lang="ts">
  export let type: string
  let svgPlaceholderPath =
    'm 451.49584,453.95019 c 32.05997,-33.41547 85.13471,-34.51036 118.55397,-2.45435 33.41547,32.05997 34.51036,85.13471 2.45435,118.55397 -32.05997,33.41547 -85.13471,34.51036 -118.55397,2.45435 -33.41547,-32.05997 -34.51432,-85.13851 -2.45435,-118.55397 z m 20.16805,19.34993 c -21.37458,22.2783 -20.64206,57.66141 1.63623,79.03598 22.2783,21.37458 57.66141,20.64207 79.03598,-1.63622 21.37458,-22.2783 20.64207,-57.66141 -1.63622,-79.03599 -22.2783,-21.37458 -57.66141,-20.64206 -79.03599,1.63623 z m 35.61179,-189.50217 c 60.52219,-1.24907 119.0634,21.59056 162.74502,63.50024 43.68161,41.90967 68.92453,99.45546 70.18135,159.97749 1.24907,60.52219 -21.59057,119.0634 -63.50024,162.74502 -41.90967,43.68161 -99.45546,68.92453 -159.97749,70.18135 -60.52219,1.24907 -119.0634,-21.59057 -162.74502,-63.50024 -43.68161,-41.90967 -68.92452,-99.45546 -70.18135,-159.97749 -1.24907,-60.52219 21.59056,-119.0634 63.50024,-162.74502 41.90967,-43.68161 99.45546,-68.92452 159.97749,-70.18135 z m -63.64242,299.45934 -73.52901,76.63781 c 39.22358,37.63248 91.79488,58.14321 146.13793,57.01818 54.34306,-1.12503 106.02044,-23.79395 143.65292,-63.01753 37.63248,-39.22358 58.14321,-91.79488 57.01818,-146.13793 -1.12503,-54.34306 -23.79395,-106.02044 -63.01753,-143.65292 l -73.52901,76.63781 c -39.35423,-37.75783 -101.8662,-36.46368 -139.62403,2.89055 -37.75783,39.35423 -36.46368,101.8662 2.89055,139.62403 z'
</script>

{#if type == 'photo/title'}
  <div class="rounded overflow-hidden shadow-lg item">
    <div
      role="status"
      class="w-full p-4 border border-gray-200 rounded shadow animate-pulse dark:border-gray-700"
    >
      <div class="flex items-center justify-center mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          class="text-gray-200 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgPlaceholderPath} />
          <rect
            x="256"
            y="256"
            width="512"
            height="512"
            fill="none"
            stroke="currentColor"
            stroke-width="24"
          />
        </svg>
      </div>
      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
      <div class="flex items-center mt-4 space-x-3">
        <div class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-2" />
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else if type == 'photo/textbox'}
  <div class="rounded overflow-hidden shadow-lg item">
    <div
      role="status"
      class="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div class="flex items-center justify-center mb-8 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          class=" text-gray-200 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgPlaceholderPath} />
          <rect
            x="256"
            y="256"
            width="512"
            height="512"
            fill="none"
            stroke="currentColor"
            stroke-width="24"
          />
        </svg>
      </div>
      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <div class="flex items-center mt-4 space-x-3">
        <div>
          <div class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
        </div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{/if}

<style>
  @keyframes spin {
    to {
      transform: rotate(720deg);
    }
  }
  path {
    animation: spin 1.5s ease-in infinite;
    transform-origin: 50%;
  }
</style>
