<svelte:head>
	<title>About</title>
	<meta name="description" content="About app" />
</svelte:head>

<script>
	import { goto } from "$app/navigation";
	function gotoPath(url) {
		goto("/"+url);
	}
	function gotoNewTab(url) {
		window.open(url,'_blank');
	}
</script>

<div class="text-column text-gray-900 dark:text-gray-100">
	<h1 class="text-3xl font-bold mb-2">about</h1>

	<p>
		dis just a shitty project for my first interaction with sveltekit (i came from react + nodejs), tailwind css (i came from bootstrap), mongodb (i came from mysql and sqlite).
	</p>

	<p>
		a social media based on rateyourmusic but for <span class="text-red-500 hover:text-red-300 dark:underline hover:no-underline" on:click={()=>gotoNewTab('https://pokeapi.co/')} on:auxclick={()=>gotoNewTab('https://pokeapi.co/')}>pokedex database</span>.
	</p>

	<p>
		you will be able to follow a pikomon and see who follow, rate 0 to 5 stars, make review, follow user.
	</p>
</div>
