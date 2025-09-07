<script>
	import { Navbar } from '$lib/components';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
