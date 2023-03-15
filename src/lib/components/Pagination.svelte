<script lang="ts">
  const gotoNewTab = (url: string) => window.open(url, '_blank')

  export let data: any
  export let setup: any
  export let pageAmount: any
  export let fetchData: any
  export let className: string
</script>

<div class="flex m-2 {className}">
  <div class="pagination">
    {#if data.page != 1}
      <a
        draggable="false"
        href="/pikodex/1"
        class={setup.pageBut}
        on:auxclick={() => gotoNewTab(`/pikodex/1`)}
        on:click={() => fetchData()}>{'|<'}</a
      >
      <a
        draggable="false"
        href="/pikodex/{Number(data.page) - 1}"
        on:auxclick={() => gotoNewTab(`/pikodex/${Number(data.page) - 1}`)}
        class={setup.pageBut}
        on:click={() => fetchData()}>{'<'}</a
      >
    {/if}
    {#if data.page >= 3 && pageAmount > 3}
      <div class={setup.ellip}>{'···'}</div>
    {/if}
    {#each { length: pageAmount } as _, i}
      {#if i + 1 == Number(data.page) - 1 || i + 1 == Number(data.page) + 1 || (i + 1 == Number(data.page) + 2 && i + 1 == 3) || (i + 1 == Number(data.page) - 2 && Number(data.page) == pageAmount)}
        <a
          draggable="false"
          href="/pikodex/{i + 1}"
          on:auxclick={() => gotoNewTab(`/pikodex/${i + 1}`)}
          class={setup.pageBut}
          on:click={() => fetchData()}>{i + 1}</a
        >
      {/if}
      {#if i + 1 == Number(data.page)}
        <!-- active -->
        <div class={setup.pageActive}>{i + 1}</div>
      {/if}
    {/each}
    {#if pageAmount > 3 && data.page <= pageAmount - 2}
      <div class={setup.ellip}>{'···'}</div>
    {/if}
    {#if data.page != pageAmount}
      <a
        draggable="false"
        href="/pikodex/{Number(data.page) + 1}"
        on:auxclick={() => gotoNewTab(`/pikodex/${Number(data.page) + 1}`)}
        class={setup.pageBut}
        on:click={() => fetchData()}>{'>'}</a
      >
      <a
        draggable="false"
        href="/pikodex/{pageAmount}"
        on:auxclick={() => gotoNewTab(`/pikodex/${pageAmount}`)}
        class={setup.pageBut}
        on:click={() => fetchData()}>{'>|'}</a
      >
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
