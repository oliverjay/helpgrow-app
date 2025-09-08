<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let avatars: Array<{
		id: number;
		src: string;
		x: number;
		y: number;
		size: number;
		animationDelay: number;
		animationDuration: number;
		opacity: number;
	}> = $state([]);

	// Generate random positions and properties for avatars
	function generateAvatars() {
		const avatarCount = 15; // Number of floating avatars
		const availableAvatars = 25; // Total avatars available (1-25)
		const newAvatars = [];

		// Create array of unique avatar numbers and shuffle it
		const avatarNumbers = Array.from({ length: availableAvatars }, (_, i) => i + 1);
		
		// Fisher-Yates shuffle algorithm
		for (let i = avatarNumbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[avatarNumbers[i], avatarNumbers[j]] = [avatarNumbers[j], avatarNumbers[i]];
		}

		for (let i = 0; i < avatarCount; i++) {
			// Use unique avatar from shuffled array
			const avatarNum = avatarNumbers[i];
			
			// Random positions (avoiding center content area)
			const x = Math.random() < 0.5 
				? Math.random() * 20 // Left side (0-20%)
				: 80 + Math.random() * 20; // Right side (80-100%)
			
			const y = Math.random() * 70 + 15; // 15-85% from top (more centered)
			
			// Random size and animation properties
			const size = Math.random() * 30 + 40; // 40-70px
			const animationDelay = Math.random() * 10; // 0-10s delay
			const animationDuration = Math.random() * 10 + 15; // 15-25s duration
			const opacity = 1; // Full opacity on desktop

			newAvatars.push({
				id: i,
				src: `/avatars/${avatarNum}.webp`,
				x,
				y,
				size,
				animationDelay,
				animationDuration,
				opacity
			});
		}

		avatars = newAvatars;
	}

	onMount(() => {
		generateAvatars();
		mounted = true;
	});
</script>

{#if mounted}
	<div class="floating-avatars">
		{#each avatars as avatar (avatar.id)}
			<div 
				class="floating-avatar {avatar.x < 50 ? 'left-side' : ''}"
				style="
					left: {avatar.x}%;
					top: {avatar.y}%;
					width: {avatar.size}px;
					height: {avatar.size}px;
					opacity: {avatar.opacity};
					animation-delay: {avatar.animationDelay}s;
					animation-duration: {avatar.animationDuration}s;
				"
			>
				<img 
					src={avatar.src} 
					alt="Floating avatar"
					loading="lazy"
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.floating-avatars {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.floating-avatar {
		position: absolute;
		border-radius: 50%;
		overflow: hidden;
		animation: float-gentle 20s ease-in-out infinite;
		transform-origin: center;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
		border: 3px solid rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(2px);
	}

	.floating-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	/* Horizontally flip avatars on the left side */
	.floating-avatar.left-side img {
		transform: scaleX(-1);
	}

	@keyframes float-gentle {
		0%, 100% { 
			transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
		}
		25% { 
			transform: translateY(-20px) translateX(15px) scale(1.08) rotate(3deg);
		}
		50% { 
			transform: translateY(-10px) translateX(-8px) scale(0.92) rotate(-2deg);
		}
		75% { 
			transform: translateY(-25px) translateX(12px) scale(1.05) rotate(2deg);
		}
	}

	/* Add some variation with different animation styles */
	.floating-avatar:nth-child(3n) {
		animation-name: float-drift;
	}

	.floating-avatar:nth-child(4n) {
		animation-name: float-sway;
	}

	@keyframes float-drift {
		0%, 100% { 
			transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
		}
		33% { 
			transform: translateY(-12px) translateX(-10px) scale(1.03) rotate(-1deg);
		}
		66% { 
			transform: translateY(-18px) translateX(8px) scale(0.97) rotate(1deg);
		}
	}

	@keyframes float-sway {
		0%, 100% { 
			transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
		}
		50% { 
			transform: translateY(-15px) translateX(0px) scale(1.02) rotate(0deg);
		}
	}

	/* Responsive behavior */
	@media (max-width: 1200px) {
		.floating-avatar:nth-child(n+11) {
			display: none; /* Show only 10 avatars on smaller screens */
		}
	}

	@media (max-width: 768px) {
		.floating-avatar:nth-child(n+8) {
			display: none; /* Show only 7 avatars on mobile */
		}
		
		.floating-avatar {
			opacity: 0.5 !important; /* Translucent on mobile */
		}
	}

	@media (max-width: 480px) {
		.floating-avatar:nth-child(n+5) {
			display: none; /* Show only 4 avatars on very small screens */
		}
		
		.floating-avatar {
			opacity: 0.4 !important; /* More subtle on very small screens */
		}
	}
</style> 