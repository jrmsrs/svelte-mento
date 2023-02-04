<script lang="ts">
	import "../app.css";
	import Header from '$components/Header.svelte';
	import './styles.css';
</script>

<div class="app dark h-screen">
	<div class="bg-gray-100 dark:bg-gray-800 h-screen">
		<Header />

		<main class="container mx-auto px-5 my-4">
			<slot />
		</main>
	</div>
</div>

<style>
	
</style>
