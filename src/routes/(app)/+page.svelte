<script lang="ts">
	import "../../app.css";
	import "./styles.css";
	import { onMount } from "svelte";
	import axios from 'axios'

	export const artwork_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"
	export const fallback = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
	

	let randPkNumbers = [0, 0, 0, 0, 0, 0]

	function getRandPkNumber(): number {
		const randNum = Math.floor(Math.random() * 151) + 1;
		const found = randPkNumbers.find((e) => {return e == randNum});
		return found ? getRandPkNumber() : randNum
	}

	function gotoNewTab(url: string) {
		window.open(url,'_blank');
	}

	for (let i = 0; i < randPkNumbers.length; i++) {
		randPkNumbers[i] = getRandPkNumber()
	}

	let randPkData: Array<any> = [null, null, null, null, null, null]
	
	onMount(async()=>{
		const url = "https://pokeapi.co/api/v2"
		for (let i = 0; i < randPkNumbers.length; i++) {
			axios.get(`${url}/pokemon-species/${randPkNumbers[i]}`)
			.then((res1)=>{
				axios.get(`${url}/pokemon/${randPkNumbers[i]}`)
				.then((res2)=>{
					randPkData[i] = res1.data
					randPkData[i].types = [res2.data.types[0].type.name, res2.data.types?.[1]?.type.name]
					randPkData[i].desc = res1.data.flavor_text_entries[1].flavor_text.replaceAll('\f', ' ')
				})
			})
		}
	})
</script>

<svelte:head>
	<title>home | pikomon social</title>
	<meta name="description" content="da app" />
</svelte:head>

<section class="text-gray-900 dark:text-gray-100">
	<!-- <h1>
		pikomon social
	</h1>

	<h2>
		a descript. 
	</h2> -->

	<div class="mt-6">
	{#if (randPkData?.[0]?.types && randPkData?.[1]?.types && randPkData?.[2]?.types && randPkData?.[3]?.types && randPkData?.[4]?.types && randPkData?.[5]?.types)}
		<p>check these pikomons:</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each randPkData as piko}
				<div class="rounded overflow-hidden shadow-lg item">
					<a draggable="false" href="/pikodex/pikomon/{piko?.id}">
						<img class="w-full" src="{artwork_url}/{piko?.id}.png" alt="pokemon {piko?.name} (#{piko?.id})">
						<div class="px-6 py-4">
							<div class="font-bold text-xl mb-2">{piko?.name}</div>
							<p class="text-gray-700 dark:text-gray-200 text-base">
							{piko?.desc}
							</p>
						</div>
					</a>
					<div class="px-6 pt-4 pb-2">
						<a draggable="false" href="/pikodex/1?type={piko?.types[0]}">
							<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko?.types[0] ? ("type-" + piko?.types[0]):"hidden"}">
								{piko?.types[0]}
							</span>
						</a>
						<a draggable="false" href="/pikodex/1?type={piko?.types[1]}">
							<span class="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko?.types[1] ? ("type-" + piko?.types[1]):"hidden"}">
								{piko?.types[1]}
							</span>
						</a>
					</div>
				</div>
			{/each}
			<p class="mt-4">...or check our <a href="/pikodex" class="text-red-500 hover:text-red-300 dark:underline hover:no-underline" on:auxclick={()=>gotoNewTab('/pikodex')}>pikodex</a></p>
		</div>
	{:else}
	<p>loading</p>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each {length: 6} as _, i}
			<div class="rounded overflow-hidden shadow-lg item">
				<div role="status" class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
					<div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
							<svg class="w-24 h-24 text-gray-200 dark:text-gray-600" fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
								<path d="m512 359.18c84.4 0 152.81 68.42 152.82 152.82 0 84.4-68.42 152.81-152.82 152.82-84.4 0-152.81-68.42-152.82-152.82 0-84.4 68.42-152.82 152.82-152.82zm0 50.94c-56.27 0-101.88 45.61-101.88 101.88s45.61 101.88 101.88 101.88 101.88-45.61 101.88-101.88-45.61-101.88-101.88-101.88zm294.16-192.28c78.01 78.02 121.84 183.83 121.84 294.16s-43.83 216.14-121.84 294.16c-78.02 78.01-183.83 121.84-294.16 121.84s-216.14-43.83-294.16-121.84c-78.01-78.02-121.84-183.83-121.84-294.16s43.83-216.14 121.84-294.16c78.02-78.01 183.83-121.84 294.16-121.84s216.14 43.83 294.16 121.84zm-474.14 294.16h-193.57c0 99.07 39.36 194.09 109.41 264.14s165.07 109.41 264.14 109.41 194.09-39.36 264.14-109.41 109.41-165.07 109.41-264.14h-193.57c0-99.4-80.58-179.98-179.98-179.98s-179.98 80.58-179.98 179.98z"/>
								</svg>
					</div>
					<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
					<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
					<div class="flex items-center mt-4 space-x-3">
							<div>
									<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
									<div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
							</div>
					</div>
					<span class="sr-only">Loading...</span>
				</div>
			</div>
		{/each}
		<p class="mt-4">...or check our <a href="/pikodex" class="text-red-500 hover:text-red-300 dark:underline hover:no-underline" on:auxclick={()=>gotoNewTab('/pikodex')}>pikodex</a></p>
	</div>
	{/if}

	<p>tasks:</p>

	<ul>
		<li>[x] basic integration with pokeapi</li>
		<li>[x] advanced integration with pokeapi</li>
		<li>[ ] authentication / permissions</li>
		<li>[ ] mongodb crud integration</li>
	</ul>

</div>

</section>

<style lang="postcss">
	:root {
		--link-color: rgba(255, 62, 62, 0.5);
		--blur: 1.5px;
	}
	/* img {
		image-rendering: pixelated;
	} */
	.item a:hover{
		filter: drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) ;
	}
	
</style>
