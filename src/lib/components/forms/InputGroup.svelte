<script lang="ts">
	let {
		size = 'md',
		variant = 'default',
		error = false,
		errorMessage = '',
		helperText = '',
		width = '100%',
		disabled = false,
		label = '',
		id = '',
		required = false,
		class: className = '',
		children = null
	} = $props();
</script>

<div class="form-input-wrapper {className}" style="width: {width}">
	{#if label}
		<label for={id} class="form-input-label {required ? 'required' : ''}">
			{label}
		</label>
	{/if}

	<div
		class="form-input-container size-{size} {variant} {error ? 'error' : ''} {disabled
			? 'disabled'
			: ''}"
	>
		<div class="form-input-group">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>

	{#if error && errorMessage}
		<span class="form-input-error">{errorMessage}</span>
	{/if}

	{#if helperText && !error}
		<span class="form-input-helper">{helperText}</span>
	{/if}
</div>

<style>
	/* Override form-input-container padding for input groups */
	.form-input-container {
		padding: 0;
	}

	/* Input group structure */
	.form-input-group {
		display: flex;
		align-items: stretch;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}

	/* Global styles for child elements */
	.form-input-group :global(.input-group-item) {
		border: none;
		outline: none;
		background: transparent;
		color: var(--color-text-primary);
		font-size: inherit;
		font-family: inherit;
		border-radius: 0;
	}

	.form-input-group :global(.input-group-item:focus) {
		box-shadow: none;
	}

	.form-input-group :global(.input-group-select) {
		border: none;
		border-right: 1px solid var(--color-border-primary);
		padding: var(--spacing-3) var(--spacing-4);
		background-color: var(--color-bg-secondary);
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
		min-width: 80px;
		cursor: pointer;
		appearance: none;
		position: relative;
	}

	.form-input-group :global(.input-group-prefix) {
		border: none;
		border-right: 1px solid var(--color-border-primary);
		padding: var(--spacing-3) var(--spacing-4);
		background-color: var(--color-bg-secondary);
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		display: flex;
		align-items: center;
	}

	.form-input-group :global(.input-group-input) {
		flex: 1;
		padding: var(--spacing-3) var(--spacing-4);
		min-width: 0;
		border: none;
		outline: none;
		background: transparent;
		color: var(--color-text-primary);
		font-size: inherit;
		font-family: inherit;
	}

	.form-input-group :global(.input-group-input::placeholder) {
		color: var(--color-text-placeholder);
	}

	.form-input-group :global(.input-group-input:disabled) {
		cursor: not-allowed;
		color: var(--color-text-disabled);
	}

	.form-input-group :global(.input-group-suffix) {
		border: none;
		border-left: 1px solid var(--color-border-primary);
		padding: var(--spacing-3) var(--spacing-4);
		background-color: var(--color-bg-secondary);
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		display: flex;
		align-items: center;
	}

	.form-input-group :global(.input-group-button) {
		border: none;
		background-color: var(--color-primary);
		color: var(--color-text-inverse);
		padding: var(--spacing-3) var(--spacing-4);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.form-input-group :global(.input-group-button:hover) {
		background-color: var(--color-primary-dark);
	}

	.form-input-group :global(.input-group-button:disabled) {
		background-color: var(--color-bg-disabled);
		color: var(--color-text-disabled);
		cursor: not-allowed;
	}

	/* Size-specific spacing */
	.form-input-container.size-sm .form-input-group :global(.input-group-select),
	.form-input-container.size-sm .form-input-group :global(.input-group-prefix),
	.form-input-container.size-sm .form-input-group :global(.input-group-input),
	.form-input-container.size-sm .form-input-group :global(.input-group-suffix),
	.form-input-container.size-sm .form-input-group :global(.input-group-button) {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-sm);
	}

	.form-input-container.size-lg .form-input-group :global(.input-group-select),
	.form-input-container.size-lg .form-input-group :global(.input-group-prefix),
	.form-input-container.size-lg .form-input-group :global(.input-group-input),
	.form-input-container.size-lg .form-input-group :global(.input-group-suffix),
	.form-input-container.size-lg .form-input-group :global(.input-group-button) {
		padding: var(--spacing-4) var(--spacing-5);
		font-size: var(--font-size-lg);
	}

	/* Dark mode adjustments */
	:global(.dark) .form-input-group :global(.input-group-select),
	:global(.dark) .form-input-group :global(.input-group-prefix),
	:global(.dark) .form-input-group :global(.input-group-suffix) {
		background-color: var(--color-bg-secondary);
	}
</style>
