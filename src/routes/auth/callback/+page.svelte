<script>
	import { Head } from '$lib/components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data } = $props();
	let { supabase } = $derived(data);
	
	let status = $state('Authenticating...');
	let message = $state('Please wait while we complete your sign-in.');

	onMount(async () => {
		try {
			// Check if we have tokens in the URL hash (email authentication)
			const hash = window.location.hash;
			if (hash) {
				const params = new URLSearchParams(hash.substring(1));
				const accessToken = params.get('access_token');
				const refreshToken = params.get('refresh_token');
				
				if (accessToken && refreshToken) {
					// Handle email authentication tokens
					status = 'Completing sign-in...';
					const { error } = await supabase.auth.setSession({
						access_token: accessToken,
						refresh_token: refreshToken
					});
					
					if (error) {
						console.error('Authentication session error:', error);
						status = 'Authentication failed';
						message = 'There was an error with your sign-in. Please try again.';
						// Immediate redirect on error
						goto('/login?error=auth_failed');
						return;
					}
					
					// Check profile completion and redirect immediately
					await checkProfileAndRedirect();
					return;
				}
			}
			
			// If no hash tokens, the server-side logic should have handled OAuth code flow
			// If we reach here, something went wrong
			status = 'Redirecting...';
			message = 'Completing authentication...';
			
		} catch (error) {
			console.error('Auth callback error:', error);
			status = 'Authentication failed';
			message = 'There was an error during authentication. Please try again.';
			// Immediate redirect on error
			goto('/login?error=auth_failed');
		}
	});

	async function checkProfileAndRedirect() {
		try {
			status = 'Setting up your account...';
			
			// Get current user
			const { data: { user }, error: userError } = await supabase.auth.getUser();
			
			if (userError || !user) {
				console.error('User error:', userError);
				goto('/login?error=auth_failed');
				return;
			}
			
			// Check profile completion
			const { data: profile, error: profileError } = await supabase
				.from('users')
				.select('full_name, phone, dob, avatar_id, profile_complete')
				.eq('id', user.id)
				.single();
			
			console.log('Profile data:', profile);
			console.log('Profile error:', profileError);
			
			if (profileError) {
				console.error('Profile query error:', profileError);
				// If profile doesn't exist or error, go to account creation
				console.log('Redirecting to create-account due to profile error');
				window.location.href = '/create-account';
				return;
			}
			
			// Check if profile is marked as complete
			const isComplete = profile && profile.profile_complete;
			console.log('Profile completion check:', {
				profile,
				full_name: profile?.full_name,
				phone: profile?.phone,
				dob: profile?.dob,
				avatar_id: profile?.avatar_id,
				profile_complete: profile?.profile_complete,
				isComplete
			});
			
			if (isComplete) {
				// Profile complete, go to dashboard immediately
				status = 'Welcome back!';
				console.log('Redirecting to dashboard');
				window.location.href = '/dashboard';
			} else {
				// Profile incomplete, continue account creation immediately
				status = 'Continue setup...';
				console.log('Redirecting to create-account');
				window.location.href = '/create-account';
			}
			
		} catch (error) {
			console.error('Profile check error:', error);
			status = 'Redirecting...';
			window.location.href = '/create-account';
		}
	}
</script>

<Head title="Authenticating..." description="Please wait while we complete your sign-in" />

<section class="section">
	<div class="container">
		<div class="content">
			<div class="loading-spinner">
				<div class="spinner"></div>
			</div>
			<h1>{status}</h1>
			<p>{message}</p>
		</div>
	</div>
</section>

<style>
	/* Global Styles */
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		min-height: 100vh;
	}

	.section {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		padding: var(--spacing-8);
		position: relative;
		overflow-y: auto;
	}

	/* Ensure proper scrolling on very short screens */
	@media (max-height: 600px) {
		.section {
			align-items: flex-start;
			padding-top: var(--spacing-6);
			padding-bottom: var(--spacing-6);
			min-height: 100vh;
		}
		
		.content {
			padding: var(--spacing-8);
		}
	}

	@media (max-height: 500px) {
		.section {
			padding-top: var(--spacing-4);
			padding-bottom: var(--spacing-4);
		}
		
		.content {
			padding: var(--spacing-6);
		}
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

	.content {
		text-align: center;
		max-width: 640px;
		margin: 0 auto;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: var(--spacing-10);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04),
			0 0 0 1px rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		z-index: 1;
	}

	.loading-spinner {
		margin-bottom: var(--spacing-6);
		display: flex;
		justify-content: center;
	}

	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--color-border);
		border-top: 3px solid var(--color-primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.content h1 {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		margin-bottom: var(--spacing-4);
		color: #0f172a;
		letter-spacing: -0.02em;
	}

	.content p {
		color: #64748b;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.6;
	}
</style> 