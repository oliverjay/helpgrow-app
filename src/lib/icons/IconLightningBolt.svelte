<script lang="ts">
	let { size = 16, color = 'currentColor', strokeWidth = 1.5, className = '' } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
>
	<path
		d="M8.5 1L3.5 8h3l-1 6 5-7h-3l1-6z"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
