<script lang="ts">
	let {
		title = '',
		description = '',
		variant = 'default',
		padding = 'lg',
		clickable = false,
		bg = '',
		onclick,
		onkeydown,
		children
	}: {
		title?: string;
		description?: string;
		variant?: 'default' | 'outlined' | 'elevated' | 'white';
		padding?: 'sm' | 'md' | 'lg' | 'xl';
		clickable?: boolean;
		bg?: string;
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		children?: any;
	} = $props();

	// Create CSS custom properties for dynamic styling
	const cardStyle = $derived(bg ? `--card-bg-color: ${bg};` : '');
</script>

{#if clickable}
	<button
		class="card card-{variant} card-padding-{padding} clickable"
		style={cardStyle}
		{onclick}
		{onkeydown}
		type="button"
	>
		<div class="card-content">
			{#if title || description}
				<h3 class="card-title">{title}</h3>
			{/if}
			{#if description}
				<p class="card-description">{description}</p>
			{/if}
		</div>
		{@render children?.()}
	</button>
{:else}
	<div class="card card-{variant} card-padding-{padding}" style={cardStyle}>
		<div class="card-content">
			{#if title}
				<h3 class="card-title">{title}</h3>
			{/if}
			{#if description}
				<p class="card-description">{description}</p>
			{/if}
		</div>
		{@render children?.()}
	</div>
{/if}

<style>
	.card {
		background-color: var(--card-bg-color, var(--color-bg-secondary));
		border-radius: var(--radius-xl);
		transition: all var(--transition-base);
		display: block;
		width: 100%;
		border: 1px solid var(--color-border-primary);
	}

	.card-outlined {
		background-color: var(--card-bg-color, transparent);
		border: 2px solid var(--color-border-primary);
	}

	.card-elevated {
		/* Uses default background from .card */
		box-shadow: var(--shadow-lg);
	}

	.card-white {
		background-color: var(--card-bg-color, white);
	}

	.card-padding-sm {
		padding: var(--spacing-4);
	}

	.card-padding-md {
		padding: var(--spacing-6);
	}

	.card-padding-lg {
		padding: var(--spacing-8);
	}

	.card-padding-xl {
		padding: var(--spacing-12);
	}

	.card-content {
		margin-bottom: var(--spacing-4);
	}

	.clickable {
		cursor: pointer;
	}

	.clickable:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-md);
	}

	.clickable:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.card-title {
		margin-bottom: var(--spacing-2);
		color: var(--color-text-primary);
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
	}

	.card-description {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-6);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.card-padding-sm {
			padding: var(--spacing-3);
		}

		.card-padding-md {
			padding: var(--spacing-4);
		}

		.card-padding-lg {
			padding: var(--spacing-6);
		}

		.card-padding-xl {
			padding: var(--spacing-8);
		}
	}
</style>
