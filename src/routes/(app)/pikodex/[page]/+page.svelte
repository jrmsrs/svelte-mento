<svelte:head>
	<title>pikodex | pikomon social</title>
	<meta name="description" content="About app" />
</svelte:head>

<script lang="ts">
	import { onMount } from "svelte";
	import axios from 'axios'
	import { page } from "$app/stores";
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
  export let data: any
	let pikomonData: any
	let pageAmount: number

	async function fetchData(){
		const resLimit	= 151
		const pageLimit = 18
		const url = "https://pokeapi.co/api/v2"
		const urlPokemonPattern = "https://pokeapi.co/api/v2/pokemon/"
		
		axios.get(`${url}/pokemon/?limit=${resLimit}`)
		.then((res1)=>{pikomonData = res1.data.results
			// trim 60*(page number-1) first results
			pikomonData.splice(0, pageLimit*(data.page-1))
			// trim all results after 60
			pikomonData.splice(pageLimit, Number.MAX_VALUE)
			pikomonData.forEach((piko: any) => {
				// workaround to get id by url string
				piko.id = piko.url.slice(urlPokemonPattern.length, -1)
			});
			pageAmount = Math.ceil(resLimit/pageLimit)
			
		})
	}
	
	onMount(async()=>{
		fetchData()
		// const url = "https://pokeapi.co/api/v2"
		// axios.get(`${url}/pokemon-species/${data.pikomon}`)
		// .then((res1)=>{
		// 	axios.get(`${url}/pokemon/${data.pikomon}`)
		// 	.then((res2)=>{
		// 		pikomonData = res1.data
		// 		pikomonData.desc = res1.data.flavor_text_entries[1].flavor_text.replaceAll('\f', ' ')
		// 		pikomonData.types = [res2.data.types[0].type.name, res2.data.types?.[1]?.type.name]
		// 		pikomonData.stats = res2.data.stats
		// 	})
		// })
	})
</script>

{#if (pikomonData)}
	<div class="text-column text-gray-900 dark:text-gray-100">
		<h1>pikodex</h1>
		<div class="flex m-2">
			<div class="pagination">
				{#if (data.page!=1)}
					<a href="/pikodex/1" class="but" on:click={()=>fetchData()}>{"|<"}</a>
					<a href="/pikodex/{parseInt(data.page)-1}" class="but" on:click={()=>fetchData()}>{"<"}</a>
				{/if}
				{#if (data.page>=3 && pageAmount>3)}
					<a href="/" class="ellip sm:py-1 sm:text-base" on:click={()=>fetchData()}>{"···"}</a>
				{/if}
				{#each {length: pageAmount} as _, i}
					{#if ((i+1)==parseInt(data.page)-1 || (i+1)==parseInt(data.page)+1) || ((i+1)==parseInt(data.page)+2 && (i+1)==3) || ((i+1)==parseInt(data.page)-2 && (parseInt(data.page))==pageAmount)}
						<a href="/pikodex/{i+1}" class="but" on:click={()=>fetchData()}>{i+1}</a>
					{/if}
					{#if ((i+1)==parseInt(data.page))}
						<a href="/pikodex/{i+1}" class="but selected" on:click={()=>fetchData()}>{i+1}</a>
					{/if}
				{/each}
				{#if (pageAmount>3 && data.page<=pageAmount-2)}
					<a href="/" class="ellip sm:py-1 sm:text-base" on:click={()=>fetchData()}>{"···"}</a>
				{/if}
				{#if (data.page!=pageAmount)}
					<a href="/pikodex/{parseInt(data.page)+1}" class="but" on:click={()=>fetchData()}>{">"}</a>
					<a href="/pikodex/{pageAmount}" class="but" on:click={()=>fetchData()}>{">|"}</a>
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-12 gap-8">
			{#each pikomonData as piko}
				<div class="col-span-6 sm:col-span-3 lg:col-span-2 rounded-xl bg-gray-800 p-3 item">
					<a draggable="false" href="/pikodex/pikomon/{piko?.id}">
						<div class="w-full">
							<img class="w-full" src="{artwork_url}/{piko?.id}.png" alt="pokemon {piko?.name} (#{piko?.id})">
						</div>
						<div class="text-center">
							{piko.name}
						</div>
					</a>
				</div>
			{/each}
		</div>
		<div class="flex m-2">
			<div class="pagination">
				{#if (data.page!=1)}
					<a href="/pikodex/1" class="but" on:click={()=>fetchData()}>{"|<"}</a>
					<a href="/pikodex/{parseInt(data.page)-1}" class="but" on:click={()=>fetchData()}>{"<"}</a>
				{/if}
				{#if (data.page>=3 && pageAmount>3)}
					<a href="/" class="ellip sm:py-1 sm:text-base" on:click={()=>fetchData()}>{"···"}</a>
				{/if}
				{#each {length: pageAmount} as _, i}
					{#if ((i+1)==parseInt(data.page)-1 || (i+1)==parseInt(data.page)+1) || ((i+1)==parseInt(data.page)+2 && (i+1)==3) || ((i+1)==parseInt(data.page)-2 && (parseInt(data.page))==pageAmount)}
						<a href="/pikodex/{i+1}" class="but" on:click={()=>fetchData()}>{i+1}</a>
					{/if}
					{#if ((i+1)==parseInt(data.page))}
						<a href="/pikodex/{i+1}" class="but selected" on:click={()=>fetchData()}>{i+1}</a>
					{/if}
				{/each}
				{#if (pageAmount>3 && data.page<=pageAmount-2)}
					<a href="/" class="ellip sm:py-1 sm:text-base" on:click={()=>fetchData()}>{"···"}</a>
				{/if}
				{#if (data.page!=pageAmount)}
					<a href="/pikodex/{parseInt(data.page)+1}" class="but" on:click={()=>fetchData()}>{">"}</a>
					<a href="/pikodex/{pageAmount}" class="but" on:click={()=>fetchData()}>{">|"}</a>
				{/if}
			</div>
		</div>
		

		<p>tasks:</p>

		<ul>
			<li>[x] iterate and list the first 151 - basic</li>
			<li>[x] list with pagination, limit to 60 - basic/intermediate</li>
			<li>[x] compact, 6 columns on lg or xl screen - stylization</li>
			<li>[ ] allow search - advanced</li>
			<li>[ ] filter by type, egg group(?), evolution(?) etc - advanced</li>
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
	.pagination {
		text-align: center;
		width: 18rem;
		display: flex;
		margin: auto;
	}
	.pagination .but {
		--tw-bg-opacity: 1;
		--tw-text-opacity: 1;
		background-color: rgb(31 41 55 / var(--tw-bg-opacity));
		color: rgb(243 244 246 / var(--tw-text-opacity));
		flex: none;
		height: 1.5rem;
		width: 2rem;
		margin-left: auto;
  	margin-right: auto;
		border-radius: 9999px;
	}
	.pagination .selected{
		--tw-bg-opacity: 1;
		background-color: rgb(243 244 246 / var(--tw-text-opacity));
		--tw-text-opacity: 1;
		color: rgb(31 41 55 / var(--tw-bg-opacity));
	}
	.pagination .but:hover {
		transition: background-color .3s;
		--tw-bg-opacity: 1;
		background-color: rgb(61 71 85 / var(--tw-bg-opacity));
	}
	.pagination .ellip {
		--tw-text-opacity: 1;
		color: rgb(243 244 246 / var(--tw-text-opacity));
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