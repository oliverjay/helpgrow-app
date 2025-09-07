<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Head, Button } from '$lib/components';
	import { IconShare, IconEmail } from '$lib/icons';
	import { trackShare } from '$lib/analytics';

	let responseCount = $state(0);
	let results = $state<any>(null);
	let isLoading = $state(true);
	let error = $state('');
	
	// Sharing functionality
	let inviteUrl = $state('');
	let hasCopied = $state(false);
	let copyTimeout: number;

	interface CategoryAnalysis {
		name: string;
		emoji: string;
		primaryTrait: string;
		secondaryTrait: string;
		growthArea: string;
		score: number;
		details: {
			strengths: string[];
			considerations: string[];
			breakdown: { trait: string; percentage: number }[];
		};
	}

	onMount(async () => {
		await Promise.all([fetchResponseCount(), fetchResults()]);
		isLoading = false;
		
		// Generate invite URL
		if ($page.data.user) {
			inviteUrl = $page.url.origin + '/invite/' + $page.data.user.id;
		}
	});

	async function fetchResponseCount() {
		try {
			const response = await fetch('/api/user/response-count');
			const data = await response.json();
			
			if (data.success) {
				responseCount = data.responseCount;
			}
		} catch (err) {
			console.error('Error fetching response count:', err);
		}
	}

	async function fetchResults() {
		try {
			const response = await fetch('/api/user/results');
			
			if (response.status === 401) {
				error = 'Please log in to view your results';
				return;
			}
			
			const data = await response.json();
			
			if (data.error) {
				error = data.error;
			} else {
				results = data;
			}
		} catch (err) {
			console.error('Error fetching results:', err);
			error = 'Failed to load results';
		}
	}

	function getScoreColor(score: number): string {
		if (score >= 4) return 'var(--color-success)';
		if (score >= 3) return 'var(--color-warning)';
		return 'var(--color-info)';
	}

	function getScoreDescription(score: number): string {
		if (score >= 4.5) return 'Very Strong';
		if (score >= 4) return 'Strong';
		if (score >= 3.5) return 'Moderate-High';
		if (score >= 3) return 'Moderate';
		if (score >= 2.5) return 'Moderate-Low';
		if (score >= 2) return 'Low';
		return 'Very Low';
	}

	// Sharing functions
	async function copyToClipboard() {
		if (!inviteUrl) return;
		
		try {
			await navigator.clipboard.writeText(inviteUrl);
			trackShare('copy_url', 'results');
			hasCopied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				hasCopied = false;
			}, 3000);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			// Fallback for older browsers
			fallbackCopy();
		}
	}

	function fallbackCopy() {
		const textArea = document.createElement('textarea');
		textArea.value = inviteUrl;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand('copy');
			trackShare('copy_url_fallback', 'results');
			hasCopied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				hasCopied = false;
			}, 3000);
		} catch (error) {
			console.error('Fallback copy failed:', error);
		}
		document.body.removeChild(textArea);
	}

	async function handleShare() {
		if (!inviteUrl) return;
		
		trackShare('share_link', 'results');
		
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Help me understand how others see me',
					text: 'I\'d love to get your perspective on how you see me. It\'s completely anonymous and takes just 5 minutes.',
					url: inviteUrl
				});
			} catch (error) {
				if ((error as Error).name !== 'AbortError') {
					console.error('Share failed:', error);
					copyToClipboard();
				}
			}
		} else {
			copyToClipboard();
		}
	}

	function handleEmail() {
		if (!inviteUrl) return;
		
		trackShare('email_invite', 'results');
		
		const subject = encodeURIComponent('Help me understand how others see me');
		const body = encodeURIComponent(
			`Hi there!\n\nI'd love to get your perspective on how you see me. It's completely anonymous and takes just 5 minutes.\n\nClick here to share your thoughts: ${inviteUrl}\n\nThanks so much!\n`
		);
		
		window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
	}
</script>

<Head 
	title="Your Personality Insights" 
	description="Discover what others think about your personality traits and strengths"
/>

<div class="results-container">
	<div class="results-header">
		<h1>Your Personality Insights</h1>
		<p class="subtitle">Based on {responseCount} response{responseCount !== 1 ? 's' : ''} from people who know you</p>
	</div>

	{#if isLoading}
		<div class="loading">
			<div class="loading-spinner"></div>
			<p>Analyzing your personality insights...</p>
		</div>
	{:else if error}
		<div class="error-state">
			<h2>Unable to Load Results</h2>
			<p>{error}</p>
		</div>
	{:else if !results || results.totalResponses === 0}
		<div class="no-results">
			<h2>No Responses Yet</h2>
			<p>Share your invite link to start collecting insights about your personality!</p>
			<a href="/dashboard" class="cta-button">Go to Dashboard</a>
		</div>
	{:else}
		<!-- Category Analysis -->
		<div class="categories-grid">
			{#each Object.entries(results.categories) as [key, categoryData] (key)}
				{@const category = categoryData as CategoryAnalysis}
				<div class="category-card">
					<div class="category-header">
						<span class="category-emoji">{category.emoji}</span>
						<h3>{category.name}</h3>
						<div class="score-badge" style="background-color: {getScoreColor(category.score)}">
							{category.score}/5
						</div>
					</div>
					
					<div class="category-content">
						<div class="primary-trait">
							<h4>{category.primaryTrait}</h4>
							<p class="secondary-trait">{category.secondaryTrait}</p>
						</div>

						<div class="breakdown">
							<h5>Key Traits:</h5>
							<div class="breakdown-bars">
								{#each category.details.breakdown as item}
									<div class="breakdown-item">
										<span class="trait-name">{item.trait}</span>
										<div class="progress-bar">
											<div class="progress-fill" style="width: {item.percentage}%"></div>
										</div>
										<span class="percentage">{item.percentage}%</span>
									</div>
								{/each}
							</div>
						</div>

						<div class="insights">
							<div class="strengths">
								<h5>💪 Strengths:</h5>
								<ul>
									{#each category.details.strengths as strength}
										<li>{strength}</li>
									{/each}
								</ul>
							</div>

							<div class="considerations">
								<h5>🌱 Growth Areas:</h5>
								<ul>
									{#each category.details.considerations as consideration}
										<li>{consideration}</li>
									{/each}
								</ul>
							</div>
						</div>

						<div class="growth-area">
							<p><strong>Development Focus:</strong> {category.growthArea}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Overall Insights -->
		{#if results.overallInsights}
			<div class="overall-insights">
				<div class="summary-header">
					<div class="summary-icon">📊</div>
					<h2>Your Personality Summary</h2>
					<p class="summary-subtitle">Key insights from {responseCount} response{responseCount !== 1 ? 's' : ''}</p>
				</div>
				
				<div class="insights-grid">
					<div class="insight-section strengths-section">
						<div class="insight-header">
							<div class="insight-icon">🌟</div>
							<h3>Top Strengths</h3>
						</div>
						<div class="insight-content">
							{#each results.overallInsights.topStrengths as strength}
								<div class="insight-item">{strength}</div>
							{/each}
						</div>
					</div>

					<div class="insight-section development-section">
						<div class="insight-header">
							<div class="insight-icon">🎯</div>
							<h3>Development Areas</h3>
						</div>
						<div class="insight-content">
							{#each results.overallInsights.developmentAreas as area}
								<div class="insight-item">{area}</div>
							{/each}
						</div>
					</div>

					<div class="insight-section unique-section">
						<div class="insight-header">
							<div class="insight-icon">✨</div>
							<h3>Unique Qualities</h3>
						</div>
						<div class="insight-content">
							{#each results.overallInsights.uniqueQualities as quality}
								<div class="insight-item">{quality}</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Action Steps -->
		<div class="action-steps">
			<h2>Get More Insights</h2>
			<div class="single-step">
				<div class="step-card-centered">
					<h4>📈 Invite More People</h4>
					<p>The more responses you collect, the more accurate and detailed your personality insights become. Share your link with friends, family, and colleagues to unlock deeper understanding.</p>
					
					{#if inviteUrl}
						<div class="sharing-section-results">
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
					{:else}
						<a href="/dashboard" class="step-link">Go to Dashboard</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Global Styles */
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
		min-height: 100vh;
	}

	.results-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-6);
		padding-top: calc(var(--spacing-6) + 80px); /* Add space for navbar */
		min-height: 100vh;
	}

	.results-header {
		text-align: center;
		/* margin-bottom: var(--spacing-20); */
		margin-top: var(--spacing-8);
		padding: var(--spacing-12) var(--spacing-8);
		/* background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); */
		/* border-radius: 32px; */
		/* border: 1px solid #e2e8f0; */
		/* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
		position: relative;
		overflow: hidden;
	}


	.results-header h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: clamp(1rem, 3vw, 1.25rem);
		color: #64748b;
		margin: 0;
		font-weight: 500;
		line-height: 1.6;
	}

	.loading {
		text-align: center;
		padding: var(--spacing-16) 0;
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 24px;
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 4px solid #e2e8f0;
		border-top: 4px solid #10b981;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto var(--spacing-6);
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
	}

	.loading p {
		color: #64748b;
		font-weight: 500;
		font-size: 1.125rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error-state, .no-results {
		text-align: center;
		padding: var(--spacing-12);
		background: var(--color-surface);
		border-radius: var(--border-radius-lg);
		border: 1px solid var(--color-border);
	}

	.cta-button, .step-link {
		display: inline-block;
		background: #10b981;
		color: white;
		padding: var(--spacing-3) var(--spacing-6);
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		margin-top: var(--spacing-4);
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.cta-button:hover, .step-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 15px -3px rgba(16, 185, 129, 0.4);
		background: #059669;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
		gap: var(--spacing-10);
		margin-bottom: var(--spacing-20);
	}

	.category-card {
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 24px;
		padding: var(--spacing-10);
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.category-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
		border-radius: 24px 24px 0 0;
	}

	.category-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
		border-color: #10b981;
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-6);
		padding-bottom: var(--spacing-4);
		border-bottom: 1px solid #f1f5f9;
	}

	.category-emoji {
		font-size: 2rem;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		padding: var(--spacing-3);
		border-radius: 16px;
		border: 1px solid #e2e8f0;
	}

	.category-header h3 {
		flex: 1;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.01em;
	}

	.score-badge {
		background: #10b981;
		color: white;
		padding: var(--spacing-2) var(--spacing-4);
		border-radius: 50px;
		font-size: 0.875rem;
		font-weight: 700;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
		border: 2px solid rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.primary-trait h4 {
		margin: 0 0 var(--spacing-2);
		font-size: 1.25rem;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.01em;
	}

	.secondary-trait {
		margin: 0 0 var(--spacing-6);
		color: #64748b;
		font-style: normal;
		font-weight: 500;
		font-size: 1rem;
		line-height: 1.6;
	}

	.breakdown {
		margin-bottom: var(--spacing-6);
		background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
		padding: var(--spacing-6);
		border-radius: 20px;
		border: 1px solid #e2e8f0;
		box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		position: relative;
	}

	.breakdown::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, #10b981, #22c55e);
		border-radius: 20px 20px 0 0;
	}

	.breakdown h5 {
		margin: 0 0 var(--spacing-4);
		font-size: 0.875rem;
		font-weight: 700;
		color: #374151;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.breakdown-bars {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.breakdown-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
	}

	.trait-name {
		flex: 0 0 120px;
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}

	.progress-bar {
		flex: 1;
		height: 10px;
		background: #e2e8f0;
		border-radius: 50px;
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.progress-fill {
		height: 100%;
		background: #10b981;
		border-radius: 50px;
		transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
		position: relative;
	}

	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
		border-radius: 50px;
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	.percentage {
		flex: 0 0 40px;
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-primary);
		text-align: right;
	}

	.insights {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-6);
	}

	.strengths, .considerations {
		padding: var(--spacing-5);
		border-radius: 20px;
		border: 1px solid transparent;
		background-clip: padding-box;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.strengths {
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-color: rgba(16, 185, 129, 0.2);
	}

	.strengths::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #10b981, #22c55e);
		border-radius: 20px 20px 0 0;
	}

	.considerations {
		background: linear-gradient(135deg, #fefdf8 0%, #fef3c7 100%);
		border-color: rgba(245, 158, 11, 0.2);
	}

	.considerations::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #f59e0b, #d97706);
		border-radius: 20px 20px 0 0;
	}

	.insights h5 {
		margin: 0 0 var(--spacing-2);
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.insights ul {
		margin: 0;
		padding-left: var(--spacing-4);
		list-style: none;
	}

	.insights li {
		position: relative;
		margin-bottom: var(--spacing-1);
		font-size: var(--text-sm);
		line-height: 1.4;
	}

	.insights li::before {
		content: "•";
		position: absolute;
		left: -12px;
		color: var(--color-primary);
		font-weight: bold;
	}

	.growth-area {
		padding: var(--spacing-3);
		background: var(--color-info-light, #f8fafc);
		border-radius: var(--border-radius-md);
		border-left: 4px solid var(--color-primary);
	}

	.growth-area p {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.4;
	}

	.overall-insights {
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 24px;
		padding: var(--spacing-10);
		margin-bottom: var(--spacing-16);
		border: 1px solid #e2e8f0;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		position: relative;
		overflow: hidden;
	}

	.overall-insights::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e, #06b6d4);
	}

	.summary-header {
		text-align: center;
		margin-bottom: var(--spacing-10);
	}

	.summary-icon {
		font-size: 3rem;
		margin-bottom: var(--spacing-4);
		display: block;
	}

	.overall-insights h2 {
		margin: 0 0 var(--spacing-2);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.summary-subtitle {
		color: #64748b;
		font-size: var(--text-lg);
		font-weight: 500;
		margin: 0;
	}

	.insights-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-8);
	}

	/* Responsive grid layout */
	@media (max-width: 1200px) {
		.insights-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 1201px) and (max-width: 1400px) {
		.insights-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-6);
		}
	}

	.insight-section {
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border-radius: 20px;
		padding: var(--spacing-6);
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		min-height: 300px;
		display: flex;
		flex-direction: column;
	}

	/* Responsive padding */
	@media (max-width: 1200px) {
		.insight-section {
			padding: var(--spacing-8);
			min-height: auto;
		}
	}

	.insight-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
	}

	.strengths-section::before {
		background: linear-gradient(90deg, #10b981, #059669);
	}

	.development-section::before {
		background: linear-gradient(90deg, #f59e0b, #d97706);
	}

	.unique-section::before {
		background: linear-gradient(90deg, #22c55e, #16a34a);
	}

	.insight-section:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.insight-header {
		display: flex;
		align-items: center;
		margin-bottom: var(--spacing-6);
		gap: var(--spacing-3);
	}

	.insight-icon {
		font-size: 1.5rem;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
	}

	.insight-section h3 {
		margin: 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.01em;
	}

	.insight-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
		flex: 1;
	}

	.insight-item {
		background: rgba(16, 185, 129, 0.05);
		border: 1px solid rgba(16, 185, 129, 0.1);
		border-radius: 12px;
		padding: var(--spacing-4);
		font-size: var(--text-base);
		line-height: 1.5;
		color: #374151;
		transition: all 0.2s ease;
		position: relative;
	}

	.insight-item:hover {
		background: rgba(16, 185, 129, 0.1);
		border-color: rgba(16, 185, 129, 0.2);
		transform: translateX(4px);
	}

	.insight-item::before {
		content: "✓";
		position: absolute;
		left: var(--spacing-2);
		top: var(--spacing-2);
		color: #10b981;
		font-weight: bold;
		font-size: 0.875rem;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.insight-item:hover::before {
		opacity: 1;
	}

	.action-steps {
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		border-radius: 24px;
		padding: var(--spacing-12);
		text-align: center;
		position: relative;
		overflow: hidden;
		color: white;
	}

	.action-steps::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
		animation: rotate 20s linear infinite;
	}

	@keyframes rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.action-steps h2 {
		margin: 0 0 var(--spacing-8);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		color: white;
		letter-spacing: -0.02em;
		position: relative;
		z-index: 1;
	}

	.single-step {
		display: flex;
		justify-content: center;
	}

	.step-card-centered {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: var(--spacing-8);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		position: relative;
		z-index: 1;
		transition: all 0.3s ease;
		text-align: center;
		max-width: 800px;
		width: 100%;
	}

	.step-card-centered:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	.step-card-centered h4 {
		margin: 0 0 var(--spacing-4);
		font-size: 1.25rem;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.01em;
	}

	.step-card-centered p {
		margin: 0 0 var(--spacing-6);
		font-size: 1rem;
		color: #64748b;
		line-height: 1.6;
		font-weight: 500;
	}

	.step-link {
		font-size: var(--text-sm);
		padding: var(--spacing-2) var(--spacing-4);
		margin-top: 0;
	}

	.sharing-section-results {
		margin-top: var(--spacing-6);
	}

	.share-url-container {
		display: flex;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-4);
		background: rgba(16, 185, 129, 0.1);
		border-radius: 16px;
		padding: var(--spacing-2);
		border: 1px solid rgba(16, 185, 129, 0.2);
	}

	.share-url-input {
		flex: 1;
		padding: var(--spacing-3) var(--spacing-4);
		border: none;
		border-radius: 12px;
		background: white;
		color: #374151;
		font-size: 0.875rem;
		font-weight: 500;
		outline: none;
		transition: all 0.2s ease;
	}

	.share-url-input:focus {
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
		border-color: #10b981;
	}

	.copy-button {
		padding: var(--spacing-3);
		background: #10b981;
		border: 1px solid #10b981;
		border-radius: 12px;
		color: white;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
		min-width: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.copy-button:hover {
		background: #059669;
		transform: translateY(-1px);
	}

	.copy-success {
		color: #10b981;
		font-size: 0.875rem;
		margin: var(--spacing-2) 0 var(--spacing-4);
		font-weight: 500;
	}

	.share-buttons {
		display: flex;
		gap: var(--spacing-3);
		justify-content: center;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.results-container {
			padding: var(--spacing-4);
		}

		.results-header {
			padding: var(--spacing-8) var(--spacing-6);
			/* margin-bottom: var(--spacing-12); */
			border-radius: 24px;
		}

		.results-header h1 {
			font-size: clamp(2rem, 6vw, 2.5rem);
		}

		.categories-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-8);
		}

		.category-card {
			padding: var(--spacing-6);
			border-radius: 20px;
		}

		.category-card:hover {
			transform: translateY(-2px);
		}

		.insights {
			grid-template-columns: 1fr;
		}

		.breakdown {
			padding: var(--spacing-4);
		}

		.strengths, .considerations {
			padding: var(--spacing-4);
		}

		.insights-grid {
			grid-template-columns: 1fr;
		}

		.loading {
			padding: var(--spacing-12) var(--spacing-4);
			border-radius: 20px;
		}

		.steps-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Tablet responsiveness */
	@media (min-width: 769px) and (max-width: 1024px) {
		.categories-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-8);
		}

		.category-card {
			padding: var(--spacing-8);
		}
	}
</style> 