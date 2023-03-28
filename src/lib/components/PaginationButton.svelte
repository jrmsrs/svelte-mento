<script lang="ts">
  import { goto } from '$app/navigation'

  const gotoNewTab = (url: string) => window.open(url, '_blank')

  export let href = ''
  export let setup: any
  export let active = false
</script>

{#if !active}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    draggable="false"
    class={setup.pageBut}
    {href}
    on:auxclick={() => gotoNewTab(href)}
    {...$$restProps}
  >
    <slot />
  </a>
{:else}
  <div class={setup.pageActive}><slot /></div>
{/if}

<style>
  .but {
    flex: none;
    height: 1.5rem;
    width: 2rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 9999px;
  }
  .but:hover {
    transition: background-color 0.3s;
    --tw-bg-opacity: 1;
    background-color: rgb(61 71 85 / var(--tw-bg-opacity));
  }
  @media (min-width: 640px) {
    .but {
      width: 2.5rem;
      height: 2rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  }
</style>
