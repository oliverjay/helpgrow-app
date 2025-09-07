<script lang="ts">
	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		id = '',
		name = '',
		size = 'md',
		variant = 'default',
		leftIcon = null,
		rightIcon = null,
		helpIcon = false,
		prefix = '',
		suffix = '',
		error = false,
		errorMessage = '',
		helperText = '',
		width = '100%',
		label = '',
		onInput = () => {},
		onFocus = () => {},
		onBlur = () => {},
		onclick = () => {},
		class: className = ''
	} = $props();

	let inputElement: HTMLInputElement;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		if (onInput) onInput(event);
	}

	function handleFocus(event: FocusEvent) {
		if (onFocus) onFocus(event);
	}

	function handleBlur(event: FocusEvent) {
		if (onBlur) onBlur(event);
	}

	function handleClick(event: MouseEvent) {
		if (onclick) onclick(event);
	}

	function handleHelpClick() {
		// You can expand this to show tooltips or help text
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
		{#if prefix}
			<span class="form-input-prefix">{prefix}</span>
		{/if}

		{#if leftIcon}
			<span class="form-input-icon form-input-icon-left">
				<leftIcon></leftIcon>
			</span>
		{/if}

		<input
			bind:this={inputElement}
			{type}
			{id}
			{name}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{value}
			class="form-input-field"
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
		/>

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

		{#if suffix}
			<span class="form-input-suffix">{suffix}</span>
		{/if}
	</div>

	{#if error && errorMessage}
		<span class="form-input-error">{errorMessage}</span>
	{/if}

	{#if helperText && !error}
		<span class="form-input-helper">{helperText}</span>
	{/if}
</div>
