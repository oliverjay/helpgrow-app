<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Card, Button, Head } from '$lib/components';

	// Get error details from the page store using Svelte 5 syntax
	let error = $derived($page.error);
	let status = $derived($page.status);

	// Get user-friendly error messages
	function getErrorDetails(status: number) {
		switch (status) {
			case 404:
				return {
					title: 'Page Not Found',
					message: 'The page you are looking for does not exist or has been moved.',
					suggestion: 'Check the URL for typos or navigate back to the homepage.',
					icon: 'not-found'
				};
			case 403:
				return {
					title: 'Access Denied',
					message: 'You do not have permission to access this page.',
					suggestion: 'Please sign in or contact support if you believe this is an error.',
					icon: 'forbidden'
				};
			case 500:
				return {
					title: 'Server Error',
					message: 'Something went wrong on our end. We are working to fix this issue.',
					suggestion: 'Please try again later or contact support if the problem persists.',
					icon: 'server-error'
				};
			case 503:
				return {
					title: 'Service Unavailable',
					message: 'Our service is temporarily unavailable due to maintenance.',
					suggestion: 'Please try again in a few minutes.',
					icon: 'maintenance'
				};
			default:
				return {
					title: 'Something Went Wrong',
					message: 'An unexpected error occurred.',
					suggestion: 'Please try again or contact support if the problem continues.',
					icon: 'error'
				};
		}
	}

	let errorDetails = $derived(getErrorDetails(status));

	// Navigation functions
	function goBack() {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			window.history.back();
		} else {
			goto('/');
		}
	}

	function goHome() {
		goto('/');
	}

	function reload() {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	}
</script>

<Head
	title="Error {status} - {errorDetails.title}"
	description={errorDetails.message}
	noindex={true}
/>

<div class="error-container">
	<Card variant="elevated" padding="xl" bg="var(--color-bg-primary)">
		<div class="error-content">
			<!-- Status Badge -->
			<div class="status-badge">
				{status}
			</div>

			<!-- Error Details -->
			<div class="error-details">
				<h1 class="error-title">{errorDetails.title}</h1>
				<p class="error-message">{errorDetails.message}</p>
				<p class="error-suggestion">{errorDetails.suggestion}</p>
			</div>

			<!-- Actions -->
			<div class="error-actions">
				<Button variant="primary" onclick={goHome} size="lg">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
					</svg>
					Go to Homepage
				</Button>
				<Button variant="outline" onclick={goBack} size="lg">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
							fill="currentColor"
						/>
					</svg>
					Go Back
				</Button>
				{#if status >= 500}
					<Button variant="ghost" onclick={reload} size="lg">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
								fill="currentColor"
							/>
						</svg>
						Try Again
					</Button>
				{/if}
			</div>
		</div>
	</Card>
</div>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4);
		background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
	}

	.error-container :global(.card) {
		max-width: 700px;
		width: 100%;
		backdrop-filter: blur(10px);
		border: 1px solid var(--color-border-primary);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-6);
	}

	.status-badge {
		background: var(--color-error);
		color: var(--color-white);
		padding: var(--spacing-2) var(--spacing-4);
		border-radius: var(--radius-full);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		font-family: var(--font-mono);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.error-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		max-width: 600px;
	}

	.error-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin: 0;
		line-height: 1.2;
		letter-spacing: -0.025em;
	}

	.error-message {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.6;
		font-weight: var(--font-weight-medium);
	}

	.error-suggestion {
		font-size: var(--font-size-lg);
		color: var(--color-text-tertiary);
		margin: 0;
		line-height: 1.5;
	}

	.error-actions {
		display: flex;
		gap: var(--spacing-3);
		flex-wrap: wrap;
		justify-content: center;
		margin-top: var(--spacing-2);
	}

	.error-actions :global(.button) {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		transition: all 0.2s ease;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.error-container {
			padding: var(--spacing-3);
		}

		.error-title {
			font-size: var(--font-size-3xl);
		}

		.error-message {
			font-size: var(--font-size-lg);
		}

		.error-suggestion {
			font-size: var(--font-size-base);
		}

		.error-actions {
			flex-direction: column;
			width: 100%;
			gap: var(--spacing-2);
		}

		.error-actions :global(.button) {
			width: 100%;
			justify-content: center;
		}

		.status-badge {
			font-size: var(--font-size-base);
		}
	}

	/* Dark mode styles */
	:global(html.dark) .error-container {
		background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
	}

	:global(html.dark) .error-title {
		color: var(--color-white);
	}

	:global(html.dark) .error-message {
		color: var(--color-gray-300);
	}

	:global(html.dark) .error-suggestion {
		color: var(--color-gray-400);
	}
</style>
