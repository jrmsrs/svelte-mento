<svelte:head>
	<title>pikodex | {pikomonData?.name? `pikomon ${pikomonData.name} (#${data.pikomon})` : "loading"}</title>
	<meta name="description" content="About app" />
</svelte:head>

<script lang="ts">
	import { onMount } from "svelte";
	import axios from 'axios'
	// import { goto } from "$app/navigation";
	// function gotoPath(url: string) {
	// 	goto(url);
	// }
	// function gotoNewTab(url: string) {
	// 	window.open(url,'_blank');
	// }
	export const artwork_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"
	export const dream_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world"
	export const animated_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated"
	
	export const fallback = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
  export let data: any;
	let pikomonData: any
	
	onMount(async()=>{
		const url = "https://pokeapi.co/api/v2"
		axios.get(`${url}/pokemon-species/${data.pikomon}`)
		.then((res1)=>{
			axios.get(`${url}/pokemon/${data.pikomon}`)
			.then((res2)=>{
				pikomonData = res1.data
				pikomonData.desc = res1.data.flavor_text_entries[1].flavor_text.replaceAll('\f', ' ')
				pikomonData.types = [res2.data.types[0].type.name, res2.data.types?.[1]?.type.name]
				pikomonData.stats = res2.data.stats
			})
		})
	})
</script>

{#if (pikomonData?.types)}
	<div class="text-column text-gray-900 dark:text-gray-100">
		<h1>{pikomonData.name} #{data.pikomon}</h1>
		<div class="grid grid-cols-6 gap-8">
			<div class="col-span-6 md:col-span-3 lg:col-span-2 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-800 grid grid-cols-2 gap-8 item">
				<div class="col-span-2">
					<img class="w-full" src="{artwork_url}/{data.pikomon}.png" alt="pokemon {pikomonData.name} (#{data.pikomon})">
				</div>
				<div class="col-span-2 bg-gray-200 dark:bg-gray-700">
					<div class="px-6 py-4">
						<p>{pikomonData.name}</p>
						<p>{pikomonData.desc}</p>
					</div>
					<div class="px-6 pt-4 pb-2">
						<a draggable="false" href="/pikodex/1?type={pikomonData.types[0]}">
							<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {pikomonData.types[0] ? ("type-" + pikomonData.types[0]):"hidden"}">
								{pikomonData.types[0]}
							</span>
						</a>
						<a draggable="false" href="/pikodex/1?type={pikomonData.types[1]}">
							<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 {pikomonData.types[1] ? ("type-" + pikomonData.types[1]):"hidden"}">
								{pikomonData.types[1]}
							</span>
						</a>
					</div>
				</div>
			</div>
			<div class="col-span-6 md:col-span-3 lg:col-span-4 flex h-full rounded-xl bg-gray-300 dark:bg-gray-800 overflow-hidden">
				<div class="m-auto w-full flex-col ">
					<div class="text-gray-500 dark:text-gray-400 m-auto w-full bg-gray-200 dark:bg-gray-700 grid grid-cols-3 gap-8 p-8">
						<div class="col-span-1 m-auto">
							<img class="h-full" style="width: 128px; image-rendering: pixelated;" src="{animated_url}/{data.pikomon}.gif" alt="pokemon {pikomonData.name} (#{data.pikomon})">
						</div>
						<div class="col-span-1 m-auto">
							<img class="h-full" style="width: 128px; image-rendering: pixelated;" src="{animated_url}/shiny/{data.pikomon}.gif" alt="pokemon {pikomonData.name} (#{data.pikomon})">
						</div>
						<div class="col-span-1 m-auto flex h-full">
							<img class="h-full mt-auto" style="width: 128px; max-height: 128px; " src="{dream_url}/{data.pikomon}.svg" alt="pokemon {pikomonData.name} (#{data.pikomon})">
						</div>
					</div>
					<table class="text-sm text-left text-gray-500 dark:text-gray-400  bg-gray-200 dark:bg-gray-700">
						<thead>
							<tr class="dark:border-gray-700">
								<th colspan="3" class="text-center">base stats (lvl 100)</th>
							</tr>
						</thead>
						<tbody>
							<tr class="dark:border-gray-700">
								<td class="w-fit whitespace-nowrap"></td>
								<td class="w-full text-center"></td>
								<td></td>
							</tr>
							<tr class="dark:border-gray-700">
								<td class="px-6 py-4">HP</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[0].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[0].base_stat}</td>
							</tr>
							<tr class="dark:border-gray-700">
								<td class="px-6 py-4">Attack</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[1].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[1].base_stat}</td>
							</tr>
							<tr>
								<td class="px-6 py-4">Defense</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[2].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[2].base_stat}</td>
							</tr>
							<tr>
								<td class="px-6 py-4">Sp.Atk.</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[3].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[3].base_stat}</td>
							</tr>
							<tr>
								<td class="px-6 py-4">Sp.Def.</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[4].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[4].base_stat}</td>
							</tr>
							<tr>
								<td class="px-6 py-4">Speed</td>
								<td>
									<div class="bg-gray-400 rounded-full h-2.5 dark:bg-gray-800">
										<div class="bg-red-400 dark:bg-red-300 h-2.5 rounded-full" style="width: {(pikomonData.stats[5].base_stat/255)*100}%"></div>
									</div>
								</td>
								<td class="px-6 py-4">{pikomonData.stats[5].base_stat}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<p>tasks:</p>

		<ul>
			<li class="txt">[x] basic infos</li>
			<li class="txt">[x] stats with graph - still basic</li>
			<li class="txt">[ ] evolutions - relationships between</li>
			<li class="txt">[ ] weakness/strenghts - relationships between + multipliers calc</li>
		</ul>
	</div>
{:else}
	<p>loading...</p>
{/if}

<style lang="postcss">
	:root {
		--link-color: rgba(255, 62, 62, 0.5);
		--blur: 1.5px;
	}
	.item a:hover{
		filter: drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) drop-shadow(0 0 var(--blur) var(--link-color)) ;
	}
</style>