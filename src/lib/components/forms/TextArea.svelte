<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		readonly = false,
		required = false,
		id = '',
		name = '',
		size = 'md',
		variant = 'default',
		helpIcon = false,
		error = false,
		errorMessage = '',
		helperText = '',
		width = '100%',
		rows = 4,
		cols = undefined,
		resize = 'vertical',
		maxlength = undefined,
		minlength = undefined,
		label = '',
		onInput = () => {},
		onFocus = () => {},
		onBlur = () => {},
		onclick = () => {},
		class: className = ''
	} = $props();

	let textareaElement: HTMLTextAreaElement;

	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
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
		<textarea
			bind:this={textareaElement}
			{id}
			{name}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{rows}
			{cols}
			{maxlength}
			{minlength}
			{value}
			class="form-input-field textarea"
			style="resize: {resize}"
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
		></textarea>

		{#if helpIcon}
			<button
				type="button"
				class="form-input-help-icon textarea"
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
	</div>

	{#if error && errorMessage}
		<span class="form-input-error">{errorMessage}</span>
	{/if}

	{#if helperText && !error}
		<span class="form-input-helper">{helperText}</span>
	{/if}
</div>

<style>
	/* Component-specific styles only - shared styles are in forms.css */
</style>
