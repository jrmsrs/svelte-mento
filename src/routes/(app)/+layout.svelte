<script lang="ts">
	import "../../app.css";
	import Header from '$components/Header.svelte';
	import darkIcon from '$images/buttons/dark.png'
	import lightIcon from '$images/buttons/light.png'
	import './styles.css';

	export let dark = true
</script>

<svelte:head>
	<meta name="theme-color" content="{dark?"#111827":"F3F4F6"}" />
	<!-- dark 111827 | light F3F4F6 -->
</svelte:head>

<div class="app {dark?"dark":""} h-screen">
	<button on:click={()=>dark=!dark} class="bottom-0 right-0 fixed bg-gray-900 dark:bg-gray-100 m-8 w-12 z-10 h-12 md:w-16 md:h-16 opacity-25 transition-all hover:opacity-100 rounded-full overflow-hidden">
		<img src="{dark?lightIcon:darkIcon}" alt="{dark?"light":"dark"} mode">
	</button>

	<div class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100  min-h-screen">

		<Header />

		<main class="container mx-auto px-5 my-4">
			<slot />
		</main>
	</div>
</div>

<style lang="postcss">
	:global(html) {
    user-select: none;
  }
	:global(img:active) {
		pointer-events: none;
	}
	:global(button, a) {
		cursor: default;
	}
	:global(h1) {
		font-weight: 700;
		font-size: 1.875rem/* 30px */;
  	line-height: 2.25rem/* 36px */;
	}
	:global(h1, h2, h3, h4, h5, h6, p) {
		margin-bottom: 8px;
	}
	:global(h1, h2, h3, h4, h5, h6, p, li) {
		opacity: .75;
	}
	:global(h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, p:hover, li:hover) {
		transition: opacity .3s;
		opacity: 1
	}
	:global(.type-water) {
		background-color: rgb(122, 191, 255);
	}
	:global(.type-grass) {
		background-color: rgb(163 230 53);
	}
	:global(.type-fire) {
		background-color: rgb(252 165 165);
	}
	:global(.type-ground) {
		background-color: rgb(207, 188, 18);
	}
	:global(.type-fighting) {
		background-color: rgb(251 146 60);
	}
	:global(.type-bug) {
		background-color: rgb(141, 214, 72);
	}
	:global(.type-poison) {
		background-color: rgb(173, 117, 245);
	}
	:global(.type-dragon) {
		background-color: rgb(123, 123, 224);
	}
	:global(.type-steel) {
		background-color: rgb(181, 181, 241);
	}
	:global(.type-electric) {
		background-color: rgb(253, 255, 116);
	}
	:global(.type-ghost) {
		background-color: rgb(145, 145, 218);
	}
	:global(.type-psychic) {
		background-color: rgb(255, 143, 240);
	}
	:global(.type-fairy) {
		background-color: rgb(255, 198, 255);
	}
	:global(.type-rock) {
		background-color: rgb(136, 136, 136);
	}
	:global(.type-ice) {
		background-color: rgb(172, 225, 250);
	}
</style>
