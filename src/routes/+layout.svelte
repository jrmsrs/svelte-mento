<script lang="ts">
	import "../app.css";
	import Header from '$components/Header.svelte';
	import './styles.css';
</script>

<div class="app  h-screen">
	<div class="bg-gray-100 dark:bg-gray-900 h-screen">
		<Header />

		<main class="container mx-auto px-5 my-4">
			<slot />
		</main>
	</div>
</div>

<style lang="postcss">
	:global(html) {
    /* background-color: theme(colors.gray.100); */
		
		user-select: none;
  }
	:global(h1, h2, h3, h4, h5, h6, p) {
		opacity: .75
	}
	:global(h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, p:hover) {
		transition: opacity .3s;  
		opacity: 1
	}
</style>
