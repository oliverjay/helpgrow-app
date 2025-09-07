<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components';
	import { fly } from 'svelte/transition';

	let {
		action,
		method = 'POST',
		title = '',
		description = '',
		submitText = 'Submit',
		submitVariant = 'primary',
		loading = $bindable(false),
		form,
		children,
		onSubmit = null,
		preventSubmit = false,
		errorFormatter = null
	}: {
		action: string;
		method?: 'POST' | 'GET';
		title?: string;
		description?: string;
		submitText?: string;
		submitVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		loading?: boolean;
		form?: {
			error?: string;
			success?: boolean;
			message?: string;
			fieldErrors?: Record<string, string[]>;
		};
		children?: any;
		onSubmit?: ((event: Event) => boolean | void) | null;
		preventSubmit?: boolean;
		errorFormatter?: ((error: string) => { title: string; message: string }) | null;
	} = $props();

	// Default error formatting
	function formatError(error: string): { title: string; message: string } {
		if (errorFormatter) {
			return errorFormatter(error);
		}

		return {
			title: 'Error',
			message: error
		};
	}
</script>

<form
	{method}
	{action}
	novalidate
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// If preventSubmit is true, cancel the submission
		if (preventSubmit) {
			cancel();
			return;
		}

		// If there's a custom onSubmit handler, call it
		if (onSubmit) {
			const shouldContinue = onSubmit(new Event('submit'));
			if (shouldContinue === false) {
				cancel();
				return;
			}
		}

		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	}}
	class="form"
>
	{#if title || description}
		<div class="form-header">
			{#if title}
				<h2 class="form-title">{title}</h2>
			{/if}
			{#if description}
				<p class="form-description">{description}</p>
			{/if}
		</div>
	{/if}

	<div class="form-fields">
		{@render children?.()}
	</div>

	{#if form?.error}
		{@const formattedError = formatError(form.error)}
		<div class="form-error" transition:fly={{ y: -10, duration: 200 }}>
			<div class="form-error-icon">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M10 6V10"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M10 14H10.01"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="form-error-content">
				<div class="form-error-title">{formattedError.title}</div>
				<div class="form-error-message">{formattedError.message}</div>
			</div>
		</div>
	{/if}

	{#if form?.success}
		<div class="form-success" transition:fly={{ y: -10, duration: 200 }}>
			<div class="form-success-icon">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7.5 10L9.5 12L12.5 8"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="form-success-content">
				{form.message || 'Success!'}
			</div>
		</div>
	{/if}

	<div class="form-actions">
		<Button variant={submitVariant} disabled={loading || preventSubmit} width="100%">
			{loading ? 'Loading...' : submitText}
		</Button>
	</div>
</form>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.form-header {
		text-align: center;
		margin-bottom: var(--spacing-2);
	}

	.form-title {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-2);
	}

	.form-description {
		color: var(--color-text-secondary);
		font-size: var(--font-size-base);
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.form-actions {
		margin-top: var(--spacing-2);
	}

	.form-error {
		background: var(--color-red-50);
		border: 1px solid var(--color-error);
		color: var(--color-gray-700);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.form-error-icon {
		color: var(--color-error);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.form-error-content {
		flex: 1;
		min-width: 0;
	}

	.form-error-title {
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-1);
	}

	.form-error-message {
		color: var(--color-red-700);
		font-size: var(--font-size-sm);
		line-height: 1.4;
	}

	.form-success {
		background: var(--color-green-50);
		border: 1px solid var(--color-green-200);
		border-radius: var(--radius-lg);
		padding: var(--spacing-4);
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.form-success-icon {
		color: var(--color-green-500);
		flex-shrink: 0;
	}

	.form-success-content {
		color: var(--color-green-800);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
		flex: 1;
	}

	/* Dark mode styles */
	:global(html.dark) .form-title {
		color: var(--color-white);
	}

	:global(html.dark) .form-description {
		color: var(--color-gray-300);
	}

	:global(html.dark) .form-error {
		background: var(--color-red-950);
		border-color: var(--color-error);
		color: var(--color-gray-200);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	:global(html.dark) .form-error-icon {
		color: var(--color-red-400);
	}

	:global(html.dark) .form-error-title {
		color: var(--color-red-300);
		font-weight: var(--font-weight-semibold);
	}

	:global(html.dark) .form-error-message {
		color: var(--color-red-200);
	}

	:global(html.dark) .form-success {
		background: var(--color-green-950);
		border-color: var(--color-green-700);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	:global(html.dark) .form-success-icon {
		color: var(--color-green-400);
	}

	:global(html.dark) .form-success-content {
		color: var(--color-green-300);
	}
</style>
