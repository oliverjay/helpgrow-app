<script lang="ts">
	import { Button, Head } from '$lib/components';
	import { page } from '$app/stores';
	import { trackSurveyLanding } from '$lib/analytics';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	const inviterName = data.inviterProfile?.fullName || 'Someone';
	const firstName = inviterName.split(' ')[0].charAt(0).toUpperCase() + inviterName.split(' ')[0].slice(1).toLowerCase();

	function handleStartSurvey() {
		// Redirect directly to the survey - no authentication required for taking surveys
		window.location.href = `/survey/${data.invite.code}`;
	}

	onMount(() => {
		// Track survey invite landing
		trackSurveyLanding(data.invite.code);
	});
</script>

<Head 
	title="You've been invited to share your perspective"
	description="Help {inviterName} understand how others see them by taking a quick anonymous survey."
/>

<section class="section">
	<div class="container">
		<div class="invite-content">
					<div class="invite-header">
			<div class="avatar-container">
				{#if data.inviterProfile?.avatar_id}
					<img 
						src="/avatars/{data.inviterProfile.avatar_id}.webp" 
						alt="{inviterName}'s avatar"
						class="avatar-image"
					/>
				{:else}
					<div class="avatar-placeholder">
						<span class="avatar-initials">
							{inviterName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
						</span>
					</div>
				{/if}
			</div>
				<h1>
					{firstName} wants to know how you see them
				</h1>
				<p class="invite-subtitle">
					You've been invited to take a quick, anonymous survey about {firstName}. 
					Your honest perspective will help them understand how others perceive them.
				</p>
			</div>

			<div class="invite-details">
				<div class="detail-card">
					<h3>📝 Quick & Anonymous</h3>
					<p>Takes just 5 minutes and your responses are completely anonymous</p>
				</div>
				<div class="detail-card">
					<h3>🎯 Meaningful Impact</h3>
					<p>Your honest feedback helps {firstName} grow and improve</p>
				</div>
				<div class="detail-card">
					<h3>🔒 Completely Private</h3>
					<p>Your identity is never revealed to {firstName} or anyone else</p>
				</div>
			</div>

			<div class="cta-section">
				<Button 
					variant="primary" 
					size="lg" 
					onclick={handleStartSurvey}
				>
					Start Anonymous Survey
				</Button>
				<p class="cta-note">
					Takes just 5 minutes • Completely anonymous
				</p>
			</div>

			<div class="trust-indicators">
				<p class="trust-text">
					This survey is powered by a secure platform that prioritizes your privacy and anonymity.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		min-height: 100vh;
	}

	.section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: var(--spacing-6);
		position: relative;
	}

	.section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
		pointer-events: none;
	}

	.container {
		max-width: 650px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
		position: relative;
		z-index: 1;
	}

	.invite-content {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: var(--spacing-10);
		box-shadow: 
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04),
			0 0 0 1px rgba(255, 255, 255, 0.2);
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.invite-header {
		margin-bottom: var(--spacing-8);
	}

	.avatar-container {
		margin: 0 auto var(--spacing-6);
	}

	.avatar-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
		border: 3px solid rgba(255, 255, 255, 0.2);
	}

	.avatar-placeholder {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
		border: 3px solid rgba(255, 255, 255, 0.2);
	}

	.avatar-initials {
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.invite-subtitle {
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		color: #64748b;
		line-height: 1.6;
		max-width: 500px;
		margin: 0 auto;
		font-weight: 500;
	}

	.invite-details {
		display: grid;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-8);
	}

	.detail-card {
		padding: var(--spacing-6);
		background: rgba(248, 250, 252, 0.8);
		border-radius: 16px;
		text-align: center;
		border: 1px solid rgba(226, 232, 240, 0.8);
		transition: all 0.3s ease;
	}

	.detail-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		background: rgba(248, 250, 252, 1);
	}

	.detail-card h3 {
		font-size: 1.125rem;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-3);
		letter-spacing: -0.01em;
	}

	.detail-card p {
		font-size: 0.875rem;
		color: #475569;
		margin: 0;
		line-height: 1.5;
		font-weight: 500;
	}

	.cta-section {
		margin-bottom: var(--spacing-8);
	}

	.cta-note {
		font-size: 0.875rem;
		color: #64748b;
		margin-top: var(--spacing-4);
		font-weight: 500;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		display: inline-block;
	}

	.trust-indicators {
		border-top: 1px solid rgba(226, 232, 240, 0.6);
		padding-top: var(--spacing-6);
	}

	.trust-text {
		font-size: 0.8125rem;
		color: #94a3b8;
		margin: 0;
		line-height: 1.5;
		font-weight: 500;
	}

	/* Responsive design */
	/* Mobile Responsive Styles */
	@media (max-width: 768px) {
		.section {
			padding: var(--spacing-4);
			align-items: flex-start;
			padding-top: var(--spacing-6);
		}

		.container {
			padding: 0 var(--spacing-3);
			max-width: 100%;
		}
		
		.invite-content {
			padding: var(--spacing-6);
			border-radius: 20px;
		}

		.invite-header {
			margin-bottom: var(--spacing-6);
		}

		.avatar-container, .avatar-placeholder {
			width: 80px;
			height: 80px;
			margin-bottom: var(--spacing-4);
		}

		.avatar-image {
			width: 80px;
			height: 80px;
		}

		.avatar-initials {
			font-size: 1.25rem;
		}
		
		h1 {
			font-size: clamp(1.5rem, 5vw, 1.75rem);
			margin-bottom: var(--spacing-3);
		}
		
		.invite-subtitle {
			font-size: 1rem;
			margin-bottom: var(--spacing-6);
		}

		.details-grid {
			gap: var(--spacing-4);
			margin-bottom: var(--spacing-6);
		}

		.detail-card {
			padding: var(--spacing-4);
		}

		.detail-card h3 {
			font-size: 1rem;
			margin-bottom: var(--spacing-2);
		}

		.detail-card p {
			font-size: 0.8125rem;
		}

		.cta-section {
			margin-bottom: var(--spacing-6);
		}

		.trust-indicators {
			padding-top: var(--spacing-4);
		}

		.trust-text {
			font-size: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.section {
			padding: var(--spacing-3);
			padding-top: var(--spacing-4);
		}

		.container {
			padding: 0 var(--spacing-2);
		}

		.invite-content {
			padding: var(--spacing-4);
			border-radius: 16px;
		}

		.invite-header {
			margin-bottom: var(--spacing-4);
		}

		.avatar-container, .avatar-placeholder {
			width: 70px;
			height: 70px;
			margin-bottom: var(--spacing-3);
		}

		.avatar-image {
			width: 70px;
			height: 70px;
		}

		.avatar-initials {
			font-size: 1.125rem;
		}

		h1 {
			font-size: clamp(1.25rem, 6vw, 1.5rem);
			margin-bottom: var(--spacing-2);
			line-height: 1.2;
		}

		.invite-subtitle {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-4);
		}

		.details-grid {
			gap: var(--spacing-3);
			margin-bottom: var(--spacing-4);
		}

		.detail-card {
			padding: var(--spacing-3);
		}

		.detail-card h3 {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-2);
		}

		.detail-card p {
			font-size: 0.75rem;
		}

		.cta-section {
			margin-bottom: var(--spacing-4);
		}

		.cta-note {
			font-size: 0.75rem;
			margin-top: var(--spacing-3);
		}

		.trust-indicators {
			padding-top: var(--spacing-3);
		}

		.trust-text {
			font-size: 0.6875rem;
		}
	}

	/* iPhone SE and very small screens */
	@media (max-width: 375px) and (max-height: 667px) {
		.section {
			padding: var(--spacing-2);
			padding-top: var(--spacing-3);
		}

		.invite-content {
			padding: var(--spacing-3);
		}

		.invite-header {
			margin-bottom: var(--spacing-3);
		}

		.avatar-container, .avatar-placeholder {
			width: 60px;
			height: 60px;
			margin-bottom: var(--spacing-2);
		}

		.avatar-image {
			width: 60px;
			height: 60px;
		}

		h1 {
			font-size: 1.25rem;
			margin-bottom: var(--spacing-2);
		}

		.invite-subtitle {
			font-size: 0.875rem;
			margin-bottom: var(--spacing-3);
		}

		.details-grid {
			gap: var(--spacing-2);
			margin-bottom: var(--spacing-3);
		}

		.detail-card {
			padding: var(--spacing-2);
		}

		.cta-section {
			margin-bottom: var(--spacing-3);
		}

		.trust-indicators {
			padding-top: var(--spacing-2);
		}
	}
</style> 