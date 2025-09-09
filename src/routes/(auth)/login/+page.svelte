<script lang="ts">
	import { Button, Head, Input, Checkbox } from '$lib/components';
	import { IconEmail } from '$lib/icons';
	import { auth } from '$lib/auth';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Determine mode from URL parameter
	let isSignupMode = $derived($page.url.searchParams.get('mode') === 'signup');

	let email = $state('');
	let isSigningInWithGoogle = $state(false);
	let isSendingMagicLink = $state(false);
	let magicLinkSent = $state(false);
	let emailError = $state('');
	let agreeToTerms = $state(false);
	let termsError = $state('');
	let recentSignups = $state(Math.floor(Math.random() * (300 - 150 + 1)) + 150);

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	async function handleGoogleSignIn() {
		if (isSigningInWithGoogle) return;
		
		// For signup mode, check terms agreement
		if (isSignupMode && !agreeToTerms) {
			termsError = 'Please agree to the terms and conditions';
			return;
		}
		
		isSigningInWithGoogle = true;
		termsError = '';

		try {
			const { error } = await auth.signInWithProvider('google');
			if (error) {
				console.error('Google sign-in error:', error);
				emailError = 'Failed to sign in with Google. Please try again.';
			}
			// If successful, user will be redirected via OAuth flow
		} catch (error) {
			console.error('Google sign-in error:', error);
			emailError = 'Failed to sign in with Google. Please try again.';
		} finally {
			isSigningInWithGoogle = false;
		}
	}

	async function handleMagicLink() {
		if (!email.trim() || !isValidEmail(email)) {
			emailError = 'Please enter a valid email address';
			return;
		}

		// For signup mode, check terms agreement
		if (isSignupMode && !agreeToTerms) {
			termsError = 'Please agree to the terms and conditions';
			return;
		}

		isSendingMagicLink = true;
		emailError = '';
		termsError = '';

		try {
			// Try to send secure email link - this works for both new and existing users
			const { error } = await auth.signInWithOtp(email);
			
			if (error) {
				console.error('Email authentication error:', error);
				
				// Check if it's a rate limiting error
				if (error.message.toLowerCase().includes('rate') || 
					error.message.toLowerCase().includes('seconds') ||
					error.message.toLowerCase().includes('too many')) {
					// For rate limiting, still show success message since link was likely sent
					magicLinkSent = true;
					console.log('✓ Secure link sent (rate limited but successful)');
				} else {
					// Other errors
					emailError = error.message || 'Failed to send secure link. Please try again.';
				}
				return;
			}

			// Show success message
			emailError = ''; // Clear any errors
			console.log('Secure link sent successfully to:', email);
			
			// Show success message
			magicLinkSent = true;
			console.log('✓ Secure link sent! User should check their email.');
			
		} catch (error) {
			console.error('Email authentication error:', error);
			emailError = 'Failed to send secure link. Please try again.';
		} finally {
			isSendingMagicLink = false;
		}
	}

	function handleSubmit() {
		if (!email.trim() || !isValidEmail(email)) {
			emailError = 'Please enter a valid email address';
			return;
		}

		// For signup mode, check terms agreement
		if (isSignupMode && !agreeToTerms) {
			termsError = 'Please agree to the terms and conditions';
			return;
		}

		handleMagicLink();
	}

	function switchToLogin() {
		goto('/login');
	}

	function switchToSignup() {
		goto('/login?mode=signup');
	}

	// Reset states when email changes
	$effect(() => {
		if (!email.trim() || !isValidEmail(email)) {
			magicLinkSent = false;
		}
	});

	// Clear terms error when checkbox changes
	$effect(() => {
		if (agreeToTerms) {
			termsError = '';
		}
	});

	// Update recent signups counter every second (only in signup mode)
	$effect(() => {
		if (!isSignupMode) return;
		
		const interval = setInterval(() => {
			recentSignups = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<Head 
	title={isSignupMode ? "Create Account" : "Sign In"} 
	description={isSignupMode ? "Create your account to get started" : "Sign in to your account to access your dashboard"} 
	noindex={true} 
/>

<!-- Meta Pixel Code -->
<svelte:head>
	<script>
		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window, document,'script',
		'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '2006486006769915');
		fbq('track', 'PageView');
	</script>
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=2006486006769915&ev=PageView&noscript=1"
	/></noscript>
</svelte:head>
<!-- End Meta Pixel Code -->

<div class="login-container">
	<div class="login-card">
		<div class="login-content">
			<h1>{isSignupMode ? 'Create account' : 'Welcome back'}</h1>
			<p class="subtitle">{isSignupMode ? 'Get started with your account' : 'Sign in to your account'}</p>

			{#if isSignupMode && !magicLinkSent}
				<div class="signup-activity">
					<span class="activity-dot"></span>
					<span class="activity-text">{recentSignups} people just joined up</span>
				</div>
			{/if}

			{#if magicLinkSent}
				<div class="email-check-message">
					<div class="email-icon-centered">
						<IconEmail />
					</div>
					<h2>Check your email!</h2>
					<p>We've sent a secure sign-in link to <strong>{email}</strong></p>
					<p class="instruction">Click the link in your email to {isSignupMode ? 'create your account and' : ''} sign in instantly.</p>
					<button 
						class="resend-link" 
						onclick={() => { magicLinkSent = false; }}
					>
						Didn't receive it? Try again
					</button>
				</div>
			{:else}
				<div class="auth-options">
					<div class="google-btn">
						<Button 
							variant="secondary" 
							size="lg" 
							onclick={handleGoogleSignIn}
							disabled={isSigningInWithGoogle}
						>
							{isSigningInWithGoogle ? 'Signing in...' : `${isSignupMode ? 'Sign up' : 'Sign in'} with Google`}
						</Button>
					</div>
					
					<div class="divider">
						<span>or</span>
					</div>
					
					<Input 
						id="email" 
						label="Email Address" 
						type="email" 
						placeholder="your.email@example.com" 
						bind:value={email}
						error={!!emailError}
						errorMessage={emailError}
						disabled={isSendingMagicLink}
					/>

					{#if isSignupMode}
						<div class="terms-section">
							<div class="terms-checkbox" class:error={!!termsError}>
								<Checkbox
									id="terms"
									bind:checked={agreeToTerms}
									error={!!termsError}
									errorMessage={termsError}
								/>
								<label for="terms" class="terms-label">
									I agree to the <a href="/terms" target="_blank" class="terms-link">Terms of Service</a> and <a href="/privacy" target="_blank" class="terms-link">Privacy Policy</a>
								</label>
							</div>
						</div>
					{/if}
					
					{#if isSendingMagicLink}
						<p class="loading-message">Sending secure link...</p>
					{/if}

					<div class="submit-button">
						<Button 
							variant="primary" 
							size="lg" 
							onclick={handleSubmit}
							disabled={isSendingMagicLink || !email.trim() || !isValidEmail(email) || (isSignupMode && !agreeToTerms)}
						>
							{isSendingMagicLink ? 'Sending Link...' : `Email me a secure link`}
						</Button>
					</div>
				</div>
			{/if}

			<div class="login-footer">
				{#if isSignupMode}
					<p>
						Already have an account?
						<button class="mode-switch-link" onclick={switchToLogin}>Sign in</button>
					</p>
				{:else}
					<p>
						Don't have an account?
						<button class="mode-switch-link" onclick={switchToSignup}>Create account</button>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	:global(html), :global(body) {
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		margin: 0;
		padding: 0;
	}

	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-6);
		width: 100%;
		position: relative;
	}

	/* Ensure proper scrolling on very short screens */
	@media (max-height: 800px) {
		.login-container {
			min-height: 100vh;
			align-items: flex-start;
			padding-top: var(--spacing-8);
			padding-bottom: var(--spacing-8);
		}
	}

	@media (max-height: 700px) {
		.login-container {
			padding-top: var(--spacing-6);
			padding-bottom: var(--spacing-6);
		}
	}

	@media (max-height: 600px) {
		.login-container {
			padding-top: var(--spacing-4);
			padding-bottom: var(--spacing-4);
		}
		
		.login-card {
			padding: var(--spacing-8);
		}
	}

	@media (max-height: 500px) {
		.login-container {
			padding-top: var(--spacing-3);
			padding-bottom: var(--spacing-3);
		}
		
		.login-card {
			padding: var(--spacing-6);
		}
	}

	.login-container::before {
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

	.login-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		box-shadow: 
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04),
			0 0 0 1px rgba(255, 255, 255, 0.2);
		padding: var(--spacing-10);
		width: 100%;
		max-width: 450px;
		position: relative;
		z-index: 1;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}



	.login-content h1 {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-weight: 700;
		margin-bottom: var(--spacing-2);
		color: #0f172a;
		letter-spacing: -0.02em;
		text-align: center;
	}

	.login-content p.subtitle {
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		color: #64748b;
		margin-bottom: var(--spacing-6);
		text-align: center;
		font-weight: 500;
		line-height: 1.5;
	}

	.signup-activity {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-6);
		padding: var(--spacing-3) var(--spacing-4);
		background: linear-gradient(135deg, #dcfdf7 0%, #f0fdf4 100%);
		border-radius: 12px;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.activity-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.activity-text {
		font-size: 0.875rem;
		color: #15803d;
		font-weight: 600;
	}

	.auth-options {
		margin-top: var(--spacing-6);
	}

	.google-btn {
		margin-bottom: var(--spacing-6);
	}

	.google-btn :global(.btn) {
		width: 100%;
	}

	.divider {
		display: flex;
		align-items: center;
		margin: var(--spacing-6) 0;
		color: #64748b;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
	}

	.divider span {
		padding: 0 var(--spacing-4);
		background: rgba(255, 255, 255, 0.95);
		color: #64748b;
		font-weight: 500;
	}

	.email-check-message {
		text-align: center;
		padding: var(--spacing-8);
		background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
		border-radius: 20px;
		margin-bottom: var(--spacing-6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		position: relative;
	}



	.email-icon-centered {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-4);
	}

	.email-icon-centered :global(svg) {
		width: 48px;
		height: 48px;
		color: #10b981;
	}

	.email-check-message h2 {
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		font-weight: 700;
		margin-bottom: var(--spacing-3);
		color: #0f172a;
		letter-spacing: -0.01em;
	}

	.email-check-message p {
		font-size: clamp(0.875rem, 2vw, 1rem);
		color: #374151;
		margin-bottom: var(--spacing-2);
		font-weight: 500;
		line-height: 1.5;
	}

	.email-check-message .instruction {
		font-size: clamp(0.8125rem, 1.8vw, 0.875rem);
		color: #64748b;
		margin-bottom: var(--spacing-4);
		font-weight: 500;
		line-height: 1.4;
	}

	.email-check-message .resend-link {
		display: block;
		width: 100%;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		color: white;
		padding: var(--spacing-3) var(--spacing-6);
		border-radius: 12px;
		border: none;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
		text-align: center;
		text-decoration: none;
	}

	.email-check-message .resend-link:hover {
		transform: translateY(-1px);
		box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
	}

	.email-icon-centered {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-3);
	}

	.terms-section {
		margin: var(--spacing-6) 0;
		position: relative;
	}

	.terms-checkbox {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3);
		padding: var(--spacing-4);
		background: rgba(248, 250, 252, 0.8);
		border-radius: 12px;
		border: 1px solid rgba(226, 232, 240, 0.8);
		transition: all 0.3s ease;
	}

	.terms-checkbox.error {
		border-color: rgba(239, 68, 68, 0.3);
		background: rgba(239, 68, 68, 0.02);
	}

	.terms-label {
		font-size: 0.875rem;
		color: #475569;
		line-height: 1.5;
		font-weight: 500;
	}

	.terms-link {
		color: #10b981;
		text-decoration: none;
		font-weight: 600;
	}

	.terms-link:hover {
		text-decoration: underline;
	}

	/* Custom styling for terms error to prevent layout breaking */
	.terms-section :global(.form-control-error) {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 12px;
		font-size: 0.8125rem;
		color: #dc2626;
		font-weight: 600;
		z-index: 100;
		box-shadow: 0 8px 25px rgba(239, 68, 68, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.loading-message {
		text-align: center;
		color: #64748b;
		font-size: 0.875rem;
		margin: var(--spacing-4) 0;
		font-weight: 500;
	}

	.submit-button {
		margin-top: var(--spacing-6);
	}

	.submit-button :global(.btn) {
		width: 100%;
	}

	.login-footer {
		text-align: center;
		padding-top: var(--spacing-6);
		border-top: 1px solid rgba(226, 232, 240, 0.6);
		margin-top: var(--spacing-6);
	}

	.login-footer p {
		color: #64748b;
		font-size: 0.875rem;
		margin-bottom: 0;
		font-weight: 500;
	}

	.mode-switch-link {
		color: #10b981;
		background: none;
		border: none;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		font-size: inherit;
	}

	.mode-switch-link:hover {
		text-decoration: underline;
	}

	/* Responsive design */
	@media (max-width: 480px) {
		.login-card {
			padding: var(--spacing-6);
			margin: var(--spacing-4);
		}

		.login-content h1 {
			font-size: 1.5rem;
		}

		.login-content p.subtitle {
			font-size: 1rem;
		}
	}
</style>
