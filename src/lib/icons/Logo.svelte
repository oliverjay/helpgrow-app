<script lang="ts">
	let { width = 200, height = 60, className = '' } = $props();
</script>

<svg
	{width}
	{height}
	viewBox="0 0 200 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	aria-label="HelpGrow"
	style="vertical-align: middle;"
>
	<!-- Refined brain icon with better proportions -->
	<g transform="translate(6, 16)">
		<!-- Clean brain outline with better shape -->
		<path d="M14 8C8.5 8 4 12.5 4 18C4 23.5 8.5 28 14 28C19.5 28 24 23.5 24 18C24 12.5 19.5 8 14 8Z" fill="none" stroke="url(#iconGradient)" stroke-width="2.5" stroke-linecap="round"/>
		
		<!-- Refined neural network - more balanced -->
		<circle cx="11" cy="16" r="1.8" fill="#10B981"/>
		<circle cx="17" cy="16" r="1.8" fill="#22C55E"/>
		<circle cx="14" cy="21" r="1.8" fill="#16A34A"/>
		
		<!-- Cleaner connection lines -->
		<path d="M11 16 L17 16 M11 16 L14 21 M17 16 L14 21" stroke="#10B981" stroke-width="1.2" opacity="0.7" stroke-linecap="round"/>
	</g>
	
	<!-- Better growth indicator -->
	<g transform="translate(34, 24)">
		<path d="M0 12 L4 8 L8 10 L12 4" stroke="#10B981" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
		<circle cx="12" cy="4" r="2" fill="#10B981"/>
	</g>
	
	<!-- Text "HelpGrow" with better positioning and size -->
	<text x="54" y="40" font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="800" fill="url(#textGradient)" letter-spacing="-0.02em">HelpGrow</text>
	
	<!-- Enhanced gradients -->
	<defs>
		<linearGradient id="iconGradient" x1="4" y1="8" x2="24" y2="28" gradientUnits="userSpaceOnUse">
			<stop stop-color="#10B981"/>
			<stop offset="1" stop-color="#059669"/>
		</linearGradient>
		
		<linearGradient id="textGradient" x1="54" y1="28" x2="190" y2="48" gradientUnits="userSpaceOnUse">
			<stop stop-color="#0F172A"/>
			<stop offset="0.4" stop-color="#10B981"/>
			<stop offset="1" stop-color="#059669"/>
		</linearGradient>
	</defs>
</svg>
