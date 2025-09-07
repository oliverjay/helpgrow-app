<script lang="ts">
	let { width = 200, height = 60, className = '' } = $props();
</script>

<img
	src="/logo.avif"
	alt="HelpGrow"
	{width}
	{height}
	class={className}
	style="vertical-align: middle; object-fit: contain;"
/>
