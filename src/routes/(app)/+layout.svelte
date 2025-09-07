<script>
	import { Navbar } from '$lib/components';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		min-height: calc(100vh - 4rem); /* Account for navbar height */
		display: flex;
		flex-direction: column;
	}
</style>

