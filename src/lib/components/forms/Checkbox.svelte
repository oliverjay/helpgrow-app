<script lang="ts">
	export let id: string;
	export let label: string = '';
	export let description: string = '';
	export let value: string = '';
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let variant: 'simple' | 'card' | 'toggle' = 'simple';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let icon: any = undefined;
	export let name: string = '';
	export let required: boolean = false;
	export let indeterminate: boolean = false;
	export let error: boolean = false;
	export let errorMessage: string = '';
	export let helperText: string = '';

	let inputElement: HTMLInputElement;

	// Handle indeterminate state
	$: if (inputElement) {
		inputElement.indeterminate = indeterminate;
	}

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
	}

	// Generate classes based on props
	$: wrapperClasses = `form-control-wrapper checkbox-${variant} size-${size} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${checked ? 'checked' : ''}`;
</script>

<div class={wrapperClasses}>
	{#if variant === 'simple'}
		<label for={id} class="form-control-simple-label">
			<input
				bind:this={inputElement}
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
			<span
				class="form-control-box checkbox-box {checked ? 'checked' : ''} {disabled
					? 'disabled'
					: ''} {error ? 'error' : ''}"
			>
				<svg
					class="checkbox-icon"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
						fill="currentColor"
					/>
				</svg>
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
				bind:this={inputElement}
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
					{#if icon}
						<div class="form-control-card-icon">
							<svelte:component this={icon} />
						</div>
					{/if}
					<div class="form-control-card-title">{label}</div>
					<div
						class="form-control-box checkbox-box {checked ? 'checked' : ''} {disabled
							? 'disabled'
							: ''} {error ? 'error' : ''}"
					>
						<svg
							class="checkbox-icon"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
								fill="currentColor"
							/>
						</svg>
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
				bind:this={inputElement}
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
	/* Size variants for checkbox boxes */
	.checkbox-simple.size-sm .form-control-box {
		width: 0.875rem;
		height: 0.875rem;
	}

	.checkbox-simple.size-sm .checkbox-icon {
		width: 0.625rem;
		height: 0.625rem;
	}

	.checkbox-simple.size-lg .form-control-box {
		width: 1.25rem;
		height: 1.25rem;
	}

	.checkbox-simple.size-lg .checkbox-icon {
		width: 1rem;
		height: 1rem;
	}
</style>
