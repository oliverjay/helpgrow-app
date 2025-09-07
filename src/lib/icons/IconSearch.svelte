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
	<circle cx="7" cy="7" r="5" stroke={color} stroke-width={strokeWidth} fill="none" />
	<path
		d="m13 13-3-3"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
