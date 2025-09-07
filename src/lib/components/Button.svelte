<script lang="ts">
	let {
		variant = 'primary',
		onclick = () => {},
		href = null,
		disabled = false,
		children = null,
		width = '',
		size = 'md',
		icon = null,
		iconPosition = 'left',
		iconOnly = false,
		alternate = false
	} = $props();

	function handleClick(event: MouseEvent) {
		if (!disabled && onclick) {
			onclick(event);
		}
	}
</script>

{#if href}
	<a
		{href}
		class={`btn btn-${variant} size-${size} ${disabled ? 'disabled' : ''} ${iconOnly ? 'icon-only' : ''} ${alternate ? 'alternate' : ''}`}
	>
		{#if icon && iconPosition === 'left' && !iconOnly}
			{@const IconComponent = icon}
			<span class="icon icon-left"><IconComponent /></span>
		{/if}
		{#if iconOnly && icon}
			{@const IconComponent = icon}
			<span class="icon"><IconComponent /></span>
		{:else if children}
			{@render children()}
		{/if}
		{#if icon && iconPosition === 'right' && !iconOnly}
			{@const IconComponent = icon}
			<span class="icon icon-right"><IconComponent /></span>
		{/if}
	</a>
{:else}
	<button
		class="btn btn-{variant} size-{size} {iconOnly ? 'icon-only' : ''} {alternate
			? 'alternate'
			: ''}"
		{disabled}
		onclick={handleClick}
		style={iconOnly ? '' : `width: ${width}`}
	>
		{#if icon && iconPosition === 'left' && !iconOnly}
			{@const IconComponent = icon}
			<span class="icon icon-left"><IconComponent /></span>
		{/if}
		{#if iconOnly && icon}
			{@const IconComponent = icon}
			<span class="icon"><IconComponent /></span>
		{:else if children}
			{@render children()}
		{/if}
		{#if icon && iconPosition === 'right' && !iconOnly}
			{@const IconComponent = icon}
			<span class="icon icon-right"><IconComponent /></span>
		{/if}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-body);
		font-weight: var(--font-weight-medium);
		border-radius: var(--radius-lg);
		border: 1px solid transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
		text-decoration: none;
		line-height: 1;
		white-space: nowrap;
		gap: var(--spacing-2);
	}

	/* Size variants */
	.btn.size-sm {
		padding: var(--spacing-2) var(--spacing-4);
		font-size: var(--font-size-sm);
		min-height: 32px;
	}

	.btn.size-md {
		padding: var(--spacing-3) var(--spacing-6);
		font-size: var(--font-size-base);
		min-height: 40px;
	}

	.btn.size-lg {
		padding: var(--spacing-4) var(--spacing-8);
		font-size: var(--font-size-lg);
		min-height: 48px;
	}

	.btn.size-xl {
		padding: var(--spacing-5) var(--spacing-10);
		font-size: var(--font-size-xl);
		min-height: 56px;
	}

	/* Icon-only variants */
	.btn.icon-only {
		padding: 0;
		aspect-ratio: 1;
		width: auto;
	}

	.btn.icon-only.size-sm {
		width: 32px;
		height: 32px;
	}

	.btn.icon-only.size-md {
		width: 40px;
		height: 40px;
	}

	.btn.icon-only.size-lg {
		width: 48px;
		height: 48px;
	}

	.btn.icon-only.size-xl {
		width: 56px;
		height: 56px;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.btn:disabled,
	.btn.disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Icon styling */
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.icon-left {
		margin-right: var(--spacing-1);
	}

	.icon-right {
		margin-left: var(--spacing-1);
	}

	.icon :global(svg) {
		width: 16px;
		height: 16px;
	}

	.btn.size-sm .icon :global(svg) {
		width: 14px;
		height: 14px;
	}

	.btn.size-lg .icon :global(svg) {
		width: 18px;
		height: 18px;
	}

	.btn.size-xl .icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	/* Button variants */
	.btn-primary {
		background: var(--color-primary);
		color: var(--color-white);
		border-color: var(--color-primary);
	}

	.btn-primary:hover:not(:disabled):not(.disabled) {
		background: var(--color-primary-dark);
		border-color: var(--color-primary-dark);
		box-shadow: var(--shadow-lg);
	}

	.btn-secondary {
		background: var(--color-gray-900);
		color: var(--color-white);
		border-color: var(--color-gray-900);
	}

	.btn-secondary:hover:not(:disabled):not(.disabled) {
		background: var(--color-gray-800);
		border-color: var(--color-gray-800);
		box-shadow: var(--shadow-lg);
	}

	.btn-outline {
		background: transparent;
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.btn-outline:hover:not(:disabled):not(.disabled) {
		background: var(--color-primary);
		color: var(--color-white);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-text-primary);
		border-color: transparent;
	}

	.btn-ghost:hover:not(:disabled):not(.disabled) {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
	}

	.btn-destructive {
		background: var(--color-error);
		color: var(--color-white);
		border-color: var(--color-error);
	}

	.btn-destructive:hover:not(:disabled):not(.disabled) {
		background: var(--color-error-light);
		border-color: var(--color-error-light);
		box-shadow: var(--shadow-lg);
	}

	.btn-destructive.alternate {
		background: transparent;
		color: var(--color-error);
		border-color: var(--color-error);
	}

	.btn-destructive.alternate:hover:not(:disabled):not(.disabled) {
		color: var(--color-white);
		background: var(--color-error);
		border-color: var(--color-error);
		box-shadow: var(--shadow-md);
	}
</style>
