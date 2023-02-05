<script lang="ts">
	import "../app.css";
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
	<h1>
		pikomon social
	</h1>

	<h2>
		a descript. 
	</h2>

	<div class="mt-6">
	{#if (randPkData?.[0]?.types && randPkData?.[randPkNumbers.length-1]?.types)}
		<p>check those pikomons:</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each randPkData as piko}
				<div class="rounded overflow-hidden shadow-lg">
					<img class="w-full" src="{(piko?.id) ? `${artwork_url}/${piko?.id}.png` : fallback}" alt="pokemon {piko?.name} (#{piko?.id})">
					<div class="px-6 py-4">
						<div class="font-bold text-xl mb-2">{piko?.name}</div>
						<p class="text-gray-700 dark:text-gray-200 text-base">
							{piko?.flavor_text_entries[1].flavor_text.replaceAll('\f', ' ')}
						</p>
					</div>
					<div class="px-6 pt-4 pb-2">
						<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko?.types[0] ? ("type-" + piko?.types[0]):"hidden"}">
							{piko?.types[0]}
						</span>
						<span class="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {piko?.types[1] ? ("type-" + piko?.types[1]):"hidden"}">
							{piko?.types[1]}
						</span>
					</div>
				</div>
			{/each}
			<p>...check our <a href="/pikodex" class="text-red-500 hover:text-red-300 dark:underline hover:no-underline" on:auxclick={()=>gotoNewTab('/pikodex')}>pikodex</a></p>
		</div>
	{:else}
		<p>loading...</p>
	{/if}
</div>

</section>

<style lang="postcss">
  .type-normal {
		
	}
	.type-water {
		background-color: rgb(122, 191, 255);
	}
	.type-grass {
		background-color: rgb(163 230 53);
	}
	.type-fire {
		background-color: rgb(252 165 165);
	}
	.type-ground {
		background-color: rgb(207, 188, 18);
	}
	.type-fighting {
		background-color: rgb(251 146 60);
	}
	.type-bug {
		background-color: rgb(141, 214, 72);
	}
	.type-poison {
		background-color: rgb(173, 117, 245);
	}
	.type-dragon {
		background-color: rgb(123, 123, 224);
	}
	.type-steel {
		background-color: rgb(181, 181, 241);
	}
	.type-electric {
		background-color: rgb(253, 255, 116);
	}
	.type-ghost {
		background-color: rgb(145, 145, 218);
	}
	.type-psychic {
		background-color: rgb(255, 143, 240);
	}
	.type-fairy {
		background-color: rgb(255, 198, 255);
	}
	.type-rock {
		background-color: rgb(136, 136, 136);
	}
	.type-ice {
		background-color: rgb(172, 225, 250);
	}
	
</style>
