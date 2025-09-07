<script lang="ts">
	import { Button } from '$lib/components';
	import { IconSparkles, IconShare, IconEmail } from '$lib/icons';
	import { profile } from '$lib/stores/profile.svelte';
	import { trackShare } from '$lib/analytics';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const totalResponsesNeeded = 3; // Encourage 3 responses for better insights
	let responseCount = $state(0);
	let canViewResults = $state(false);
	let isLoading = $state(true);
	let hasCopied = $state(false);
	let copyTimeout: number;
	
	let progress = $derived((responseCount / totalResponsesNeeded) * 100);
	let inviteUrl = $state('');
	
	// User profile state for avatar
	let userProfile = $state<{full_name?: string, avatar_id?: number} | null>(null);
	let user = $derived($page.data.user);
	let supabase = $derived($page.data.supabase);
	
	// Get user display info
	let userDisplayName = $derived(
		userProfile?.full_name ||
			user?.user_metadata?.full_name ||
			user?.user_metadata?.name ||
			user?.email?.split('@')[0] ||
			'User'
	);

	// Get avatar - prioritize custom avatar, fallback to OAuth avatar
	let userAvatar = $derived.by(() => {
		const customAvatar = userProfile?.avatar_id ? `/avatars/${userProfile.avatar_id}.webp` : null;
		const oauthAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
		return customAvatar || oauthAvatar;
	});

	// Generate avatar initials if no image
	let avatarInitials = $derived(
		userDisplayName
			.split(' ')
			.map((name: string) => name[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);

	async function fetchResponseCount() {
		try {
			const response = await fetch('/api/user/response-count');
			if (response.ok) {
				const data = await response.json();
				responseCount = data.responseCount;
				canViewResults = data.canViewResults;
				profile.responsesReceived = data.responseCount; // Update profile store
			} else {
				console.error('Failed to fetch response count:', await response.text());
			}
		} catch (error) {
			console.error('Error fetching response count:', error);
		} finally {
			isLoading = false;
		}
	}

	async function handleShare() {
		if (!inviteUrl) return;
		
		trackShare('share_link', 'dashboard');
		
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Help me understand how others see me',
					text: 'I\'d love to get your perspective on how you see me. It\'s completely anonymous and takes just 5 minutes.',
					url: inviteUrl
				});
			} catch (error) {
				if ((error as Error).name !== 'AbortError') {
					console.error('Error sharing:', error);
					copyToClipboard();
				}
			}
		} else {
			copyToClipboard();
		}
	}

	async function copyToClipboard() {
		if (!inviteUrl) return;
		
		trackShare('copy_url', 'dashboard');
		
		try {
			await navigator.clipboard.writeText(inviteUrl);
			hasCopied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				hasCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			fallbackCopy();
		}
	}

	function fallbackCopy() {
		trackShare('copy_url', 'dashboard_fallback');
		
		const textArea = document.createElement('textarea');
		textArea.value = inviteUrl;
		textArea.style.position = 'fixed';
		textArea.style.opacity = '0';
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand('copy');
			hasCopied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				hasCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Fallback copy failed:', error);
		}
		document.body.removeChild(textArea);
	}

	function handleEmail() {
		if (!inviteUrl) return;
		
		trackShare('invite_email', 'dashboard');
		
		const subject = encodeURIComponent('Help me understand how others see me');
		const body = encodeURIComponent(`Hi!

I'd love to get your perspective on how you see me. It's completely anonymous and takes just 5 minutes.

${inviteUrl}

Thanks!`);
		
		window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
	}

	// Fetch user profile data
	$effect(() => {
		if (user?.id && supabase) {
			(async () => {
				try {
					let { data, error } = await supabase
						.from('users')
						.select('full_name, avatar_id')
						.eq('id', user.id)
						.single();
					
					if (error && error.message?.includes('column')) {
						const { data: fallbackData } = await supabase
							.from('users')
							.select('full_name, gender')
							.eq('id', user.id)
							.single();
						
						data = fallbackData ? {
							...fallbackData,
							avatar_id: fallbackData.gender ? 1 : undefined
						} : null;
					}
					
					if (data) {
						userProfile = data;
					}
				} catch (err) {
					console.error('Error fetching user profile:', err);
				}
			})();
		}
	});

	onMount(() => {
		fetchResponseCount();
		// Generate invite URL using current page data
		if ($page.data.user) {
			inviteUrl = $page.url.origin + '/invite/' + $page.data.user.id;
		}
	});
</script>

<section class="section">
	<div class="container">
		<div class="content">
			{#if isLoading}
				<div class="loading-state">
					<p>Loading your responses...</p>
				</div>
			{:else}
				<!-- Main dashboard state -->
				<header class="header">
					<!-- User Avatar (Desktop Only) -->
					<div class="user-avatar-section">
						<div class="user-avatar">
							{#if userAvatar}
								<img src={userAvatar} alt="{userDisplayName}'s avatar" />
							{:else}
								<div class="avatar-initials">{avatarInitials}</div>
							{/if}
						</div>
						<p class="welcome-text">Welcome back, {userDisplayName}!</p>
					</div>
					
					<h1>You've received {responseCount} response{responseCount === 1 ? '' : 's'} so far.</h1>
					
					<!-- Personalized Encouragement -->
					<div class="encouragement-section">
						{#if responseCount === 0}
							<p class="encouragement-text">🚀 Ready to unlock insights about yourself? Share your link to get started!</p>
						{:else if responseCount === 1}
							<p class="encouragement-text">🎉 Great start! One response down. Each new response reveals more about your personality.</p>
						{:else if responseCount === 2}
							<p class="encouragement-text">⭐ You're building momentum! Two responses already show patterns emerging.</p>
						{:else if responseCount < totalResponsesNeeded}
							<p class="encouragement-text">🔥 Amazing progress! You're {Math.round((responseCount / totalResponsesNeeded) * 100)}% of the way to unlocking deeper insights.</p>
						{:else}
							<p class="encouragement-text">🎯 Fantastic! You have enough responses for meaningful insights. Keep going for even more accuracy.</p>
						{/if}
					</div>
					
					<!-- Response Comparison -->
					{#if responseCount >= 5}
						<div class="comparison-insight">
							<div class="insight-card">
								<span class="insight-icon">📊</span>
								<p class="insight-text">People with {responseCount}+ responses discover <strong>73% more personality insights</strong> than those with fewer responses.</p>
							</div>
						</div>
					{:else if responseCount >= 3}
						<div class="comparison-insight">
							<div class="insight-card">
								<span class="insight-icon">💡</span>
								<p class="insight-text">Users with 5+ responses unlock <strong>detailed trait breakdowns</strong> and <strong>growth recommendations</strong>.</p>
							</div>
						</div>
					{/if}
				</header>
				
				{#if responseCount >= 1}
					<div class="results-section">
						<div class="results-card">
							<h3>Ready to see your insights?</h3>
							<p>You have {responseCount} response{responseCount === 1 ? '' : 's'}. Get more responses to unlock deeper insights!</p>
							<Button href="/results" variant="primary" size="lg" icon={IconSparkles}>
								View My Results
							</Button>
						</div>
					</div>
				{/if}

				{#if inviteUrl}
					<div class="sharing-section">
						<div class="sharing-header">
							<h3>Share Your Link</h3>
							<p>Copy this link and share it with friends, family, and colleagues to get their perspective on you.</p>
						</div>
						<div class="share-url-container">
							<input 
								type="text" 
								value={inviteUrl} 
								readonly 
								class="share-url-input" 
								onclick={(e) => e.currentTarget.select()}
							/>
							<button 
								class="copy-button" 
								onclick={copyToClipboard} 
								title="Copy to clipboard"
							>
								{hasCopied ? '✓' : '📋'}
							</button>
						</div>
						{#if hasCopied}
							<p class="copy-success">Link copied to clipboard!</p>
						{/if}
						<div class="share-buttons">
							<Button variant="primary" size="md" onclick={handleShare} icon={IconShare}>
								{hasCopied ? 'Copied!' : 'Share Link'}
							</Button>
							<Button variant="outline" size="md" onclick={handleEmail} icon={IconEmail}>
								Invite via Email
							</Button>
						</div>
					</div>
				{/if}
			{/if}
			
			<!-- Social Proof at Bottom -->
			<div class="social-proof">
				<div class="proof-badge">
					<span class="proof-icon">👥</span>
					<span class="proof-text">Join 12,847 people who've discovered their personality</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Global Styles - Force override other page backgrounds */
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%) !important;
		min-height: 100vh;
	}

	/* Additional specificity to ensure background override */
	:global(html body) {
		background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%) !important;
	}

	.section {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: var(--spacing-8);
		padding-top: calc(var(--spacing-8) + 80px); /* Add space for navbar */
	}

	.content {
		text-align: center;
		max-width: 700px;
		margin: 0 auto;
		position: relative;
	}

	.content::before {
		content: '';
		position: absolute;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
		border-radius: 2px;
	}

	.user-avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: var(--spacing-6);
	}

	.user-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid #10b981;
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2);
		margin-bottom: var(--spacing-3);
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.user-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-initials {
		color: white;
		font-weight: 700;
		font-size: 1.5rem;
		text-transform: uppercase;
	}

	.welcome-text {
		color: #64748b;
		font-size: 1rem;
		font-weight: 500;
		margin: 0;
		text-align: center;
	}

	.header h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.header p {
		color: #64748b;
		margin-bottom: var(--spacing-6);
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		font-weight: 500;
		line-height: 1.6;
	}

	/* Social Proof */
	.social-proof {
		margin-top: var(--spacing-10);
		margin-bottom: var(--spacing-4);
		display: flex;
		justify-content: center;
	}

	.proof-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-4);
		background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 50px;
		font-size: 0.875rem;
		color: #1e40af;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
	}

	.proof-icon {
		font-size: 1rem;
	}

	/* Encouragement Section */
	.encouragement-section {
		margin-bottom: var(--spacing-6);
	}

	.encouragement-text {
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		color: #374151;
		margin: 0;
		font-weight: 600;
		line-height: 1.6;
		text-align: center;
		padding: var(--spacing-4) var(--spacing-6);
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-radius: 16px;
		border: 1px solid rgba(245, 158, 11, 0.2);
		box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
	}

	/* Response Comparison */
	.comparison-insight {
		margin-bottom: var(--spacing-6);
	}

	.insight-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-6);
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
	}

	.insight-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.insight-text {
		font-size: 0.9375rem;
		color: #166534;
		margin: 0;
		font-weight: 500;
		line-height: 1.5;
	}

	.insight-text strong {
		font-weight: 700;
		color: #15803d;
	}
	.progress-section {
		margin: var(--spacing-10) 0;
		background: white;
		border-radius: 20px;
		padding: var(--spacing-6);
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		position: relative;
		overflow: hidden;
	}

	.progress-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
	}

	.progress-label {
		color: #374151;
		margin-bottom: var(--spacing-3);
		font-weight: 600;
		font-size: 1rem;
		text-align: center;
	}

	.progress-bar-container {
		width: 100%;
		background-color: #e2e8f0;
		border-radius: 50px;
		height: 16px;
		overflow: hidden;
		margin-bottom: var(--spacing-3);
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #10b981 0%, #22c55e 100%);
		border-radius: 50px;
		transition: width 0.6s ease;
		box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
	}

	.sharing-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
		margin-top: var(--spacing-8);
		background: white;
		border-radius: 20px;
		padding: var(--spacing-8);
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		position: relative;
		overflow: hidden;
	}

	.sharing-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
	}

	.sharing-header {
		text-align: center;
		margin-bottom: var(--spacing-6);
	}

	.sharing-header h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-2);
		letter-spacing: -0.01em;
	}

	.sharing-header p {
		color: #64748b;
		font-size: 0.875rem;
		line-height: 1.5;
		font-weight: 500;
		margin: 0;
	}

	.share-url-container {
		display: flex;
		gap: var(--spacing-3);
		align-items: center;
	}

	.share-url-input {
		flex: 1;
		padding: var(--spacing-4);
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		background: #f8fafc;
		color: #374151;
		font-size: 0.875rem;
		font-family: 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco, Consolas, monospace;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 500;
	}

	.share-url-input:focus {
		outline: none;
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
		background: white;
	}

	.copy-button {
		padding: var(--spacing-4);
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		background: white;
		color: #374151;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.copy-button:hover {
		background: #f8fafc;
		border-color: #cbd5e1;
		transform: translateY(-1px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
	.copy-success {
		color: #22c55e;
		font-size: 0.875rem;
		text-align: center;
		margin: 0;
		font-weight: 600;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
		padding: var(--spacing-2) var(--spacing-4);
		border-radius: 50px;
		border: 1px solid #86efac;
	}

	.share-buttons {
		display: flex;
		gap: var(--spacing-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.results-section {
		/* margin-top: var(--spacing-10); */
	}

	.results-card {
		background: #10b981;
		border-radius: 24px;
		padding: var(--spacing-10);
		text-align: center;
		position: relative;
		overflow: hidden;
		color: white;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.results-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
		animation: rotate 20s linear infinite;
		z-index: 0;
	}

	@keyframes rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.results-card h3 {
		color: white;
		margin-bottom: var(--spacing-4);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		position: relative;
		z-index: 5;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.results-card p {
		color: rgba(255, 255, 255, 0.95);
		margin-bottom: var(--spacing-6);
		font-size: clamp(1rem, 2vw, 1.125rem);
		line-height: 1.6;
		font-weight: 500;
		position: relative;
		z-index: 5;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.results-card :global(.btn) {
		position: relative;
		z-index: 10 !important;
		background: rgba(255, 255, 255, 0.95) !important;
		color: #1e293b !important;
		border: 2px solid rgba(255, 255, 255, 0.2) !important;
		font-weight: 600 !important;
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05) !important;
		transition: all 0.3s ease !important;
	}

	.results-card :global(.btn:hover) {
		background: rgba(255, 255, 255, 1) !important;
		transform: translateY(-2px) !important;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1) !important;
	}

	.results-card :global(.btn:active) {
		transform: translateY(0px) !important;
	}

	.results-card :global(.btn .icon) {
		color: #10b981 !important;
	}

	.loading-state {
		text-align: center;
		padding: var(--spacing-12) 0;
		color: #64748b;
		font-size: 1.125rem;
		font-weight: 500;
	}

	/* Tablet/Medium Desktop Responsive Styles */
	@media (max-width: 1024px) and (min-width: 769px) {
		.container {
			padding: 0 var(--spacing-6);
			max-width: 900px;
		}

		.content {
			padding: var(--spacing-8) 0;
		}

		.header {
			padding: var(--spacing-8);
			/* margin-bottom: var(--spacing-8); */
		}

		.header h1 {
			font-size: clamp(1.75rem, 4vw, 2.25rem);
		}

		.encouragement-text {
			font-size: 1.0625rem;
			padding: var(--spacing-4) var(--spacing-6);
		}

		.insight-card {
			padding: var(--spacing-4) var(--spacing-6);
		}

		.results-card {
			padding: var(--spacing-8);
		}

		.sharing-section {
			padding: var(--spacing-8);
		}

		.sharing-header h3 {
			font-size: 1.375rem;
		}

		.share-url-input {
			font-size: 0.9375rem;
			padding: var(--spacing-4);
		}

		.copy-button {
			min-width: 52px;
			height: 52px;
		}
	}

	/* Mobile Responsive Styles */
	@media (max-width: 768px) {
		.container {
			padding: 0 var(--spacing-3);
		}

		.content {
			padding: var(--spacing-6) 0;
		}

		/* Hide avatar on mobile */
		.user-avatar-section {
			display: none;
		}

		/* Reduce padding on all sections */
		.header {
			padding: var(--spacing-4);
			/* margin-bottom: var(--spacing-2); */
		}

		.encouragement-section {
			margin-bottom: var(--spacing-4);
		}

		.encouragement-text {
			padding: var(--spacing-3) var(--spacing-4);
		}

		.comparison-insight {
			margin-bottom: var(--spacing-4);
		}

		.insight-card {
			padding: var(--spacing-3) var(--spacing-4);
		}

		.results-section {
			/* margin-top: var(--spacing-4); */
		}

		.results-card {
			padding: var(--spacing-4);
		}

		.sharing-section {
			margin-top: var(--spacing-6);
			padding: var(--spacing-4);
		}

		.sharing-header {
			margin-bottom: var(--spacing-4);
		}

		/* Fix share URL container for mobile */
		.share-url-container {
			gap: var(--spacing-2);
		}

		.share-url-input {
			font-size: 0.875rem;
			padding: var(--spacing-3);
			min-width: 0; /* Allow input to shrink */
			flex: 1; /* Take up remaining space */
		}

		.copy-button {
			min-width: 48px;
			height: 48px;
			flex-shrink: 0; /* Don't let button shrink */
		}

		/* Full width buttons on mobile */
		.share-buttons {
			flex-direction: column;
			gap: var(--spacing-3);
		}

		.share-buttons :global(.btn) {
			width: 100%;
		}

		.social-proof {
			margin-top: var(--spacing-6);
		}

		.encouragement-section {
			margin-bottom: var(--spacing-3);
		}

		.comparison-insight {
			margin-bottom: var(--spacing-3);
		}
	}

	/* Large Mobile/Small Tablet */
	@media (max-width: 900px) and (min-width: 481px) {
		.container {
			padding: 0 var(--spacing-4);
		}

		.content {
			padding: var(--spacing-6) 0;
		}

		.header {
			padding: var(--spacing-6);
			/* margin-bottom: var(--spacing-3); */
		}

		.header h1 {
			font-size: clamp(1.5rem, 5vw, 1.875rem);
		}

		.encouragement-text {
			font-size: 1rem;
			padding: var(--spacing-3) var(--spacing-5);
		}

		.insight-card {
			padding: var(--spacing-3) var(--spacing-5);
		}

		.results-card {
			padding: var(--spacing-6);
		}

		.sharing-section {
			padding: var(--spacing-6);
		}

		.share-url-input {
			font-size: 0.875rem;
			padding: var(--spacing-3);
		}

		.copy-button {
			min-width: 50px;
			height: 50px;
		}

		.share-buttons {
			gap: var(--spacing-4);
		}

		.share-buttons :global(.btn) {
			padding: var(--spacing-3) var(--spacing-6);
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--spacing-2);
		}

		.content {
			padding: var(--spacing-4) 0;
		}

		/* Even more compact on very small screens */
		.header {
			padding: var(--spacing-3);
			/* margin-bottom: var(--spacing-1); */
		}

		.header h1 {
			font-size: clamp(1.5rem, 6vw, 2rem);
		}

		.encouragement-text {
			font-size: 0.9375rem;
			padding: var(--spacing-3);
		}

		.results-card {
			padding: var(--spacing-3);
		}

		.sharing-section {
			padding: var(--spacing-3);
		}

		.share-url-input {
			font-size: 0.8125rem;
			padding: var(--spacing-2);
		}

		.copy-button {
			min-width: 44px;
			height: 44px;
		}
	}
</style>
