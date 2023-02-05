<svelte:head>
	<title>about | pikomon social</title>
	<meta name="description" content="About app" />
</svelte:head>

<script lang="ts">
	// import { goto } from "$app/navigation";
	// function gotoPath(url: string) {
	// 	goto(url);
	// }
	function gotoNewTab(url: string) {
		window.open(url,'_blank');
	}
</script>

<div class="text-column text-gray-900 dark:text-gray-100">
	<h1>about</h1>

	<p>
		dis just a shitty project for my first interaction with sveltekit (i came from react + express), tailwind css (i came from bootstrap), mongodb (i came from mysql and sqlite).
	</p>

	<p>
		a social media based on rateyourmusic but for <a href="https://pokeapi.co" target="_blank" rel="noreferrer" class="text-red-500 hover:text-red-300 dark:underline hover:no-underline" on:auxclick={()=>gotoNewTab('https://pokeapi.co/')}>pokedex database</a>.
	</p>

	<p>
		you will be able to follow a pikomon and see who follow, rate 0 to 5 stars, make review, follow user.
	</p>
</div>
