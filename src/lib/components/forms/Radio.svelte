<script lang="ts">
	export let id: string;
	export let label: string = '';
	export let description: string = '';
	export let value: string = '';
	export let group: any = undefined;
	export let disabled: boolean = false;
	export let variant: 'simple' | 'card' | 'toggle' = 'simple';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let icon: any = undefined;
	export let name: string = '';
	export let required: boolean = false;
	export let error: boolean = false;
	export let errorMessage: string = '';
	export let helperText: string = '';

	$: checked = group === value;

	// Generate classes based on props
	$: wrapperClasses = `form-control-wrapper radio-${variant} size-${size} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${checked ? 'checked' : ''}`;
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
				bind:group
				type="radio"
				class="form-control-simple-input"
			/>
			<span
				class="form-control-box radio-box {checked ? 'checked' : ''} {disabled
					? 'disabled'
					: ''} {error ? 'error' : ''}"
			>
				<span class="radio-dot"></span>
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
				bind:group
				type="radio"
				class="form-control-input"
			/>
			<div class="form-control-card-content">
				<div class="form-control-card-header">
					{#if icon}
						<div class="form-control-card-icon">
							<svelte:component this={icon} />
						</div>
					{/if}
					<div class="form-control-card-title">{label}</div>
					<div
						class="form-control-box radio-box {checked ? 'checked' : ''} {disabled
							? 'disabled'
							: ''} {error ? 'error' : ''}"
					>
						<span class="radio-dot"></span>
					</div>
				</div>
				{#if description}
					<div class="form-control-card-description">{description}</div>
				{/if}
			</div>
		</label>
	{:else if variant === 'toggle'}
		<label
			for={id}
			class="form-control-toggle {checked ? 'checked' : ''} {disabled ? 'disabled' : ''}"
		>
			<input
				{id}
				{name}
				{value}
				{required}
				{disabled}
				bind:group
				type="radio"
				class="form-control-input"
			/>
			<span class="form-control-toggle-text">{label}</span>
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
	/* Size variants for radio boxes */
	.radio-simple.size-sm .form-control-box {
		width: 0.875rem;
		height: 0.875rem;
	}

	.radio-simple.size-sm .radio-dot {
		width: 0.375rem;
		height: 0.375rem;
	}

	.radio-simple.size-lg .form-control-box {
		width: 1.25rem;
		height: 1.25rem;
	}

	.radio-simple.size-lg .radio-dot {
		width: 0.75rem;
		height: 0.75rem;
	}
</style>
