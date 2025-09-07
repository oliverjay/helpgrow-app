<script lang="ts">
	export let id: string;
	export let label: string = '';
	export let description: string = '';
	export let value: string = '';
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let variant: 'simple' | 'card' = 'simple';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let name: string = '';
	export let required: boolean = false;
	export let error: boolean = false;
	export let errorMessage: string = '';
	export let helperText: string = '';

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
	}

	// Generate classes based on props
	$: wrapperClasses = `form-control-wrapper toggle-${variant} size-${size} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${checked ? 'checked' : ''}`;
</script>

<div class={wrapperClasses}>
	{#if variant === 'simple'}
		<label for={id} class="form-control-simple-label">
			<input
				{id}
				{name}
				{value}
				{required}
				{disabled}
				bind:checked
				on:change={handleChange}
				type="checkbox"
				class="form-control-simple-input"
			/>
			<span class="toggle-switch">
				<span class="toggle-slider"></span>
			</span>
			{#if label}
				<span class="form-control-simple-text">{label}</span>
			{/if}
		</label>
	{:else if variant === 'card'}
		<label
			for={id}
			class="form-control-card {checked ? 'checked' : ''} {disabled ? 'disabled' : ''} {error
				? 'error'
				: ''}"
		>
			<input
				{id}
				{name}
				{value}
				{required}
				{disabled}
				bind:checked
				on:change={handleChange}
				type="checkbox"
				class="form-control-input"
			/>
			<div class="form-control-card-content">
				<div class="form-control-card-header">
					<div class="form-control-card-title">{label}</div>
					<span class="toggle-switch">
						<span class="toggle-slider"></span>
					</span>
				</div>
				{#if description}
					<div class="form-control-card-description">{description}</div>
				{/if}
			</div>
		</label>
	{/if}

	{#if error && errorMessage}
		<div class="form-control-error">{errorMessage}</div>
	{/if}
	{#if helperText && !error}
		<div class="form-control-helper">{helperText}</div>
	{/if}
</div>

<style>
	/* Toggle switch styling */
	.toggle-switch {
		display: flex;
		align-items: center;
		width: 2.5rem;
		height: 1.5rem;
		background-color: var(--color-gray-300);
		border-radius: var(--radius-full);
		position: relative;
		transition: background-color var(--transition-fast);
		flex-shrink: 0;
	}

	.toggle-slider {
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--color-white);
		border-radius: var(--radius-full);
		position: absolute;
		left: 0.125rem;
		top: 50%;
		transform: translateY(-50%);
		transition: left var(--transition-fast);
		box-shadow: var(--shadow-sm);
	}

	/* Checked state */
	.toggle-simple.checked .toggle-switch,
	.toggle-card.checked .toggle-switch {
		background-color: var(--color-primary);
	}

	.toggle-simple.checked .toggle-slider,
	.toggle-card.checked .toggle-slider {
		left: calc(100% - 1.25rem - 0.125rem);
	}

	/* Size variants */
	.size-sm .toggle-switch {
		width: 2rem;
		height: 1.25rem;
	}

	.size-sm .toggle-slider {
		width: 1rem;
		height: 1rem;
	}

	.size-sm.checked .toggle-slider {
		left: calc(100% - 1rem - 0.125rem);
	}

	.size-lg .toggle-switch {
		width: 3rem;
		height: 1.75rem;
	}

	.size-lg .toggle-slider {
		width: 1.5rem;
		height: 1.5rem;
	}

	.size-lg.checked .toggle-slider {
		left: calc(100% - 1.5rem - 0.125rem);
	}

	/* Disabled state */
	.form-control-wrapper.disabled .toggle-switch {
		background-color: var(--color-bg-disabled);
	}

	.form-control-wrapper.disabled .toggle-slider {
		background-color: var(--color-gray-200);
	}

	/* Error state */
	.form-control-wrapper.error .toggle-switch {
		border: 2px solid var(--color-error);
	}

	/* Focus states */
	.form-control-simple-input:focus + .toggle-switch,
	.form-control-input:focus ~ .form-control-card-content .toggle-switch {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
</style>
