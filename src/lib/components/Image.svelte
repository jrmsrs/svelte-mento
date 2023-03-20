<script>
  import { onMount } from 'svelte'
  import { observe } from './intersection.service'
  import missing from '$images/missing.png'
  import lazy from '$images/colors.gif'

  let image, source

  export async function reload() {
    source = placeholder
    await observe(image)
    source = src
  }

  onMount(async () => {
    source = placeholder
    await observe(image)
    source = src
  })

  export let src, alt
  export let placeholder = lazy
</script>

<img
  src={source}
  {alt}
  bind:this={image}
  {...$$restProps}
  onerror="this.onerror=null;this.src='{missing}';"
/>
