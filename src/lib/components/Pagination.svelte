<script lang="ts">
  import Button from './PaginationButton.svelte'
  export let data: any
  export let setup: any
  export let pageAmount: any
  export let className: string
  $: ({ page } = data)
</script>

<div class="flex m-2 {className}">
  <div class="pagination">
    {#if page != 1}
      <Button {setup} href="/library/1">
        {'|<'}
      </Button>
      <Button {setup} href={`/library/${Number(page) - 1}`}>
        {'<'}
      </Button>
    {/if}
    {#if page >= 3 && pageAmount > 3}
      <div class={setup.ellip}>{'···'}</div>
    {/if}
    {#each { length: pageAmount } as _, i}
      {#if i + 1 == Number(page) - 1 || i + 1 == Number(page) + 1 || (i + 1 == Number(page) + 2 && i + 1 == 3) || (i + 1 == Number(page) - 2 && Number(page) == pageAmount)}
        <Button {setup} href={`/library/${i + 1}`}>
          {i + 1}
        </Button>
      {/if}
      {#if i + 1 == Number(page)}
        <!-- active -->
        <Button active {setup}>{i + 1}</Button>
      {/if}
    {/each}
    {#if pageAmount > 3 && page <= pageAmount - 2}
      <div class={setup.ellip}>{'···'}</div>
    {/if}
    {#if page != pageAmount}
      <Button {setup} href={`/library/${Number(page) + 1}`}>
        {'>'}
      </Button>
      <Button {setup} href={`/library/${pageAmount}`}>
        {'>|'}
      </Button>
    {/if}
  </div>
</div>

<style>
  .pagination {
    text-align: center;
    width: 18rem;
    display: flex;
    margin: auto;
  }
  .pagination .but {
    flex: none;
    height: 1.5rem;
    width: 2rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 9999px;
  }
  .pagination .but:hover {
    transition: background-color 0.3s;
    --tw-bg-opacity: 1;
    background-color: rgb(61 71 85 / var(--tw-bg-opacity));
  }
  .pagination .ellip {
    flex: none;
    height: 1.5rem;
    width: 2rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 9999px;
  }
  @media (min-width: 640px) {
    .pagination .but {
      width: 2.5rem;
      height: 2rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  }
</style>
