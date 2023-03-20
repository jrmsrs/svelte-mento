<script lang="ts">
  import { goto } from '$app/navigation'
  import { PUBLIC_APP_NAME } from '$env/static/public'
  import { onMount } from 'svelte'
  onMount(() => goto('/library/1'))
</script>

<svelte:head>
  <title>library | {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="text-column text-gray-900 dark:text-gray-100">
  <h1>redirecting to page 1</h1>
</div>
