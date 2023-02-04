<script lang="ts">
	import { page } from '$app/stores';
	import github from '$images/github.svg';

	let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>

<header class="dark:bg-gray-800 ">

	<nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <a class="text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl hover:text-red-300" href="/">
					pksoc
				</a>
        <div on:click={toggleNavbar} class="flex md:hidden">
          <button type="button" class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu  ? 'flex' : 'hidden'}">
        <a class="dark:text-gray-100 hover:text-red-300 border-t-4 {$page.url.pathname === '/' ? 'border-red-300' : "border-transparent"}" href="/">Home</a>
        <a class="dark:text-gray-100 hover:text-red-300 border-t-4 {$page.url.pathname === '/about' ? 'border-red-300' : "border-transparent"}" href="/about">About</a>
        <div class="space-y-2">
          <a href="/login" class="py-3 px-4 text-center border text-gray-800 bg-white hover:bg-red-300 hover:text-black dark:hover:bg-red-800 hover:text-white  rounded-md block lg:inline lg:border-0">
            Login
          </a>
        </div>
      </div>
    </nav>

	<!-- <nav>
		<ul>
			<li>
				<a class="{$page.url.pathname === '/' ? 'text-red-500' : undefined}" href="/">Home</a>
			</li>
			<li>
				<a class="{$page.url.pathname === '/about' ? 'text-red-500' : undefined}" href="/about">About</a>
			</li>
		</ul>
	</nav>

	
	<div class="corner">
		<a href="https://github.com/jrmsrs/svelte-mento">
			<img src={github} alt="GitHub" width="50" />
		</a>
	</div> -->

</header>

<style>

</style>
