<script lang="ts">
	import { modalStore, modal } from '../stores/modal.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from './Button.svelte';

	$: ({ isOpen, config } = $modalStore);

	function handleBackdropClick() {
		if (config?.closeOnBackdrop && !config?.persistent) {
			modal.close();
		}
	}

	function handleContentClick(event: MouseEvent) {
		// Prevent backdrop click when clicking inside modal content
		event.stopPropagation();
	}

	function handleContentKeydown(event: KeyboardEvent) {
		// Prevent backdrop keydown when focusing inside modal content
		event.stopPropagation();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && config?.closeOnEscape && !config?.persistent) {
			modal.close();
		}
	}

	onMount(() => {
		if (browser) {
			// Add global keydown listener
			document.addEventListener('keydown', handleKeydown);
			return () => {
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});

	$: if (browser) {
		if (isOpen) {
			// Prevent body scroll when modal is open
			document.body.style.overflow = 'hidden';
		} else {
			// Restore body scroll when modal is closed
			document.body.style.overflow = '';
		}
	}

	function getVariantClass(variant: string | undefined) {
		switch (variant) {
			case 'danger':
				return 'modal-danger';
			case 'success':
				return 'modal-success';
			case 'warning':
				return 'modal-warning';
			default:
				return 'modal-default';
		}
	}

	function getSizeClass(size: string | undefined) {
		switch (size) {
			case 'sm':
				return 'modal-sm';
			case 'lg':
				return 'modal-lg';
			case 'xl':
				return 'modal-xl';
			case 'full':
				return 'modal-full';
			default:
				return 'modal-md';
		}
	}
</script>

{#if isOpen && config}
	<div
		class="modal-overlay"
		role="dialog"
		aria-modal="true"
		aria-labelledby={config.title ? 'modal-title' : undefined}
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div
			class="modal-content {getSizeClass(config.size)} {getVariantClass(config.variant)}"
			role="presentation"
			onclick={handleContentClick}
		>
			{#if config.title || config.showCloseButton}
				<div class="modal-header">
					{#if config.title}
						<h2 id="modal-title" class="modal-title">{config.title}</h2>
					{/if}
					{#if config.showCloseButton && !config.persistent}
						<button class="modal-close" onclick={() => modal.close()} aria-label="Close modal">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 4L4 12M4 4L12 12"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					{/if}
				</div>
			{/if}

			<div class="modal-body">
				{#if config.component}
					<svelte:component this={config.component} {...config.componentProps || {}} />
				{:else if config.content}
					<div class="modal-text">
						{@html config.content}
					</div>
				{/if}
			</div>

			{#if config.customActions && config.customActions.length > 0}
				<div class="modal-footer">
					{#each config.customActions as action}
						<Button
							variant={action.variant || 'primary'}
							disabled={action.disabled}
							onclick={action.action}
						>
							{action.label}
						</Button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4);
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-content {
		background-color: var(--color-bg-primary);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-2xl);
		display: flex;
		flex-direction: column;
		max-height: 90vh;
		width: 100%;
		animation: slideIn var(--transition-fast) ease-out;
		border: 1px solid var(--color-border-primary);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(0px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Size variants */
	.modal-sm {
		max-width: 400px;
	}

	.modal-md {
		max-width: 500px;
	}

	.modal-lg {
		max-width: 700px;
	}

	.modal-xl {
		max-width: 900px;
	}

	.modal-full {
		max-width: 95vw;
		max-height: 95vh;
	}

	/* Variant styles */
	.modal-danger {
		border-color: var(--color-error);
	}

	.modal-success {
		border-color: var(--color-success);
	}

	.modal-warning {
		border-color: var(--color-warning);
	}

	.modal-default {
		border-color: var(--color-border-primary);
	}

	.modal-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center; /* Center title */
		padding: var(--spacing-6) var(--spacing-6) var(--spacing-4);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.modal-title {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		padding: 0 var(--spacing-8); /* Add padding to prevent overlap with a potential close button */
	}

	.modal-close {
		position: absolute;
		top: 50%;
		right: var(--spacing-4);
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--color-text-secondary);
		cursor: pointer;
		padding: var(--spacing-2);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.modal-close:hover {
		background-color: var(--color-bg-secondary);
		color: var(--color-text-primary);
	}

	.modal-close:active {
		transform: scale(0.95);
	}

	.modal-body {
		padding: var(--spacing-6);
		flex: 1;
		overflow-y: auto;
	}

	.modal-text {
		color: var(--color-text-primary);
		line-height: 1.6;
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6) var(--spacing-6);
		border-top: 1px solid var(--color-border-primary);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.modal-overlay {
			padding: var(--spacing-2);
		}

		.modal-content {
			max-height: 95vh;
		}

		.modal-sm,
		.modal-md,
		.modal-lg,
		.modal-xl {
			max-width: 100%;
		}

		.modal-full {
			max-width: 100%;
			max-height: 100%;
			border-radius: 0;
		}

		.modal-header {
			padding: var(--spacing-4) var(--spacing-4) var(--spacing-3);
		}

		.modal-body {
			padding: var(--spacing-4);
		}

		.modal-footer {
			padding: var(--spacing-3) var(--spacing-4) var(--spacing-4);
			flex-direction: column;
		}

		.modal-footer :global(.btn) {
			width: 100%;
		}
	}

	/* Dark mode backdrop */
	:global(.dark) .modal-overlay {
		background-color: rgba(0, 0, 0, 0.7);
	}
</style>
