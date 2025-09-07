<script>
	const TOTAL_AVATARS = 25;
	
	let { value = $bindable(1), error = false, errorMessage = '' } = $props();
	
	function previousAvatar() {
		value = value <= 1 ? TOTAL_AVATARS : value - 1;
	}
	
	function nextAvatar() {
		value = value >= TOTAL_AVATARS ? 1 : value + 1;
	}
</script>

<div class="avatar-selector">
	<label class="label">Choose Your Avatar</label>
	
	<div class="avatar-container">
		<button type="button" class="nav-button prev" onclick={previousAvatar}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15,18 9,12 15,6"></polyline>
			</svg>
		</button>
		
		<div class="avatar-display">
			<img 
				src="/avatars/{value}.webp" 
				alt="Avatar {value}"
				class="avatar-image"
			/>
			<div class="avatar-number">{value}/{TOTAL_AVATARS}</div>
		</div>
		
		<button type="button" class="nav-button next" onclick={nextAvatar}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9,18 15,12 9,6"></polyline>
			</svg>
		</button>
	</div>
	
	{#if error && errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}
</div>

<style>
	.avatar-selector {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}
	
	.label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}
	
	.avatar-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-4);
	}
	
	.nav-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		background: var(--color-background);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.nav-button:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: var(--color-primary-light);
	}
	
	.nav-button:active {
		transform: scale(0.95);
	}
	
	.avatar-display {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2);
	}
	
	.avatar-image {
		width: 120px;
		height: 120px;
		border-radius: var(--radius-full);
		border: 3px solid var(--color-primary);
		object-fit: cover;
		transition: transform 0.2s ease;
	}
	
	.avatar-image:hover {
		transform: scale(1.05);
	}
	
	.avatar-number {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}
	
	.error-message {
		color: var(--color-error);
		font-size: var(--font-size-sm);
		margin: 0;
	}
</style> 