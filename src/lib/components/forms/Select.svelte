<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = 'Select option...',
		disabled = false,
		required = false,
		id = '',
		name = '',
		size = 'md',
		variant = 'default',
		leftIcon = null,
		rightIcon = null,
		helpIcon = false,
		error = false,
		errorMessage = '',
		helperText = '',
		width = '100%',
		label = '',
		onChange = () => {},
		onFocus = () => {},
		onBlur = () => {},
		class: className = '',
		options = [],
		children = null
	} = $props();

	let selectElement: HTMLSelectElement;

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		if (onChange) onChange(event);
	}

	function handleFocus(event: FocusEvent) {
		if (onFocus) onFocus(event);
	}

	function handleBlur(event: FocusEvent) {
		if (onBlur) onBlur(event);
	}

	function handleHelpClick() {
		console.log('Help clicked');
	}
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
		{#if leftIcon}
			<span class="form-input-icon form-input-icon-left">
				<leftIcon></leftIcon>
			</span>
		{/if}

		<select
			bind:this={selectElement}
			{id}
			{name}
			{disabled}
			{required}
			{value}
			class="form-input-field select"
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}

			{#if options.length > 0}
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			{:else if children}
				{@render children()}
			{/if}
		</select>

		{#if rightIcon}
			<span class="form-input-icon form-input-icon-right">
				<rightIcon></rightIcon>
			</span>
		{/if}

		{#if helpIcon}
			<button
				type="button"
				class="form-input-help-icon"
				onclick={handleHelpClick}
				aria-label="Help"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none" />
					<path
						d="M6.5 6.5c0-1.5 1-2 2-2s2 0.5 2 2c0 1-1 1.5-2 2.5v1"
						stroke="currentColor"
						stroke-width="1.5"
						fill="none"
						stroke-linecap="round"
					/>
					<circle cx="8" cy="12" r="0.5" fill="currentColor" />
				</svg>
			</button>
		{/if}

		<!-- Dropdown arrow -->
		<span class="form-input-dropdown-arrow">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 6L8 10L12 6"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</div>

	{#if error && errorMessage}
		<span class="form-input-error">{errorMessage}</span>
	{/if}

	{#if helperText && !error}
		<span class="form-input-helper">{helperText}</span>
	{/if}
</div>
