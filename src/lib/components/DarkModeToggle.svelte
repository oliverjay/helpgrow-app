<script>
	import { mode, toggleMode } from 'mode-watcher';

	function handleToggle() {
		toggleMode();
	}
</script>

<button
	class="dark-mode-toggle"
	onclick={handleToggle}
	aria-label="Toggle dark mode"
	title="Toggle dark mode"
>
	{#if mode.current === 'dark'}
		<!-- Sun icon for light mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="5" />
			<path
				d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
			/>
		</svg>
	{:else}
		<!-- Moon icon for dark mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
		</svg>
	{/if}
</button>

<style>
	.dark-mode-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-bg-primary);
		color: var(--color-text-primary);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: 0;
	}

	.dark-mode-toggle:hover {
		background-color: var(--color-bg-secondary);
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-md);
	}

	.dark-mode-toggle:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.dark-mode-toggle:active {
		transform: translateY(0);
	}

	.dark-mode-toggle svg {
		transition: transform var(--transition-fast);
	}

	.dark-mode-toggle:hover svg {
		transform: rotate(15deg);
	}
</style>
