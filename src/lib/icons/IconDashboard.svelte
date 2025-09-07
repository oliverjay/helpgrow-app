<script lang="ts">
	let { size = 16, className = '' } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
>
	<rect x="3" y="3" width="7" height="7" />
	<rect x="14" y="3" width="7" height="7" />
	<rect x="14" y="14" width="7" height="7" />
	<rect x="3" y="14" width="7" height="7" />
</svg>
