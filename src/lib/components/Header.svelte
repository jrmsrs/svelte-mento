<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import githuby from '$lib/images/github.svg';
	import github from '$images/github.svg';
</script>

<header>

	<nav>
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
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" width="50" />
		</a>
	</div>

</header>

<style>

</style>
