<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  onMount(() => goto('/library/1'))
</script>

<svelte:head>
  <title>library</title>
</svelte:head>

<div class="text-column text-gray-900 dark:text-gray-100">
  <h1>redirecting to page 1</h1>
</div>
