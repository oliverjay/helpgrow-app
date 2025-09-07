<script lang="ts">
	import { onMount } from 'svelte';

	let {
		isOpen = $bindable(false),
		position = 'bottom-right',
		className = '',
		children,
		trigger
	} = $props();

	let dropdownRef = $state<HTMLDivElement>();
	let triggerRef = $state<HTMLElement>();

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (
			isOpen &&
			dropdownRef &&
			triggerRef &&
			!dropdownRef.contains(event.target as Node) &&
			!triggerRef.contains(event.target as Node)
		) {
			isOpen = false;
		}
	}

	// Close dropdown on escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	// Toggle dropdown
	function toggleDropdown() {
		isOpen = !isOpen;
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="dropdown-container {className}">
	<!-- Trigger -->
	<div
		bind:this={triggerRef}
		class="dropdown-trigger"
		onclick={toggleDropdown}
		onkeydown={toggleDropdown}
		role="button"
		tabindex="0"
		aria-expanded={isOpen}
		aria-haspopup="true"
	>
		{@render trigger()}
	</div>

	<!-- Dropdown content -->
	{#if isOpen}
		<div
			bind:this={dropdownRef}
			class="dropdown-content position-{position}"
			role="menu"
			aria-label="Dropdown menu"
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.dropdown-container {
		position: relative;
		display: inline-block;
	}

	.dropdown-trigger {
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		z-index: 1000;
		min-width: 12rem;
		background: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		padding: var(--spacing-2);
		animation: dropdownEnter 0.15s ease-out;
	}

	:global(.dark) .dropdown-content {
		background: var(--color-gray-800);
		border-color: var(--color-gray-700);
	}

	/* Positioning variants */
	.dropdown-content.position-bottom-left {
		top: 100%;
		left: 0;
		margin-top: var(--spacing-2);
	}

	.dropdown-content.position-bottom-right {
		top: 100%;
		right: 0;
		margin-top: var(--spacing-2);
	}

	.dropdown-content.position-top-left {
		bottom: 100%;
		left: 0;
		margin-bottom: var(--spacing-2);
	}

	.dropdown-content.position-top-right {
		bottom: 100%;
		right: 0;
		margin-bottom: var(--spacing-2);
	}

	/* Animation */
	@keyframes dropdownEnter {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Global styles for dropdown items */
	:global(.dropdown-content .dropdown-item) {
		display: flex;
		align-items: center;
		width: 100%;
		padding: var(--spacing-3) var(--spacing-4);
		border: none;
		background: none;
		color: var(--color-text);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		text-align: left;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		gap: var(--spacing-3);
	}

	:global(.dropdown-content .dropdown-item:hover) {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
	}

	:global(.dropdown-content .dropdown-item.destructive) {
		color: var(--color-error);
	}

	:global(.dropdown-content .dropdown-item.destructive:hover) {
		background: var(--color-error);
		color: var(--color-white);
	}

	:global(.dropdown-content .dropdown-separator) {
		height: 1px;
		background: var(--color-border);
		margin: var(--spacing-2) 0;
	}

	:global(.dark .dropdown-content .dropdown-separator) {
		background: var(--color-gray-700);
	}
</style>
