<script lang="ts">
	import { Button, Head } from '$lib/components';
	import { IconSparkles } from '$lib/icons';
	import { trackSurveyCTA } from '$lib/analytics';
	import { page } from '$app/stores';

	// Get survey code from URL params
	const surveyCode = $derived($page.params.code || '');

	function handleGetInsights() {
		trackSurveyCTA('get_insights', surveyCode);
	}

	function handleLearnMore() {
		trackSurveyCTA('learn_more', surveyCode);
	}
</script>

<Head 
	title="Thank you for your feedback!"
	description="Your anonymous feedback has been submitted successfully."
/>

<section class="section">
	<div class="container">
		<div class="thank-you-content">
			<h1>Thank you! 🎉</h1>
			<p class="thank-you-message">
				Your feedback has been submitted! Your honest perspective will help them grow.
			</p>

			<div class="separator">
				<div class="separator-line"></div>
				<div class="separator-dots">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
				<div class="separator-line"></div>
			</div>

			<div class="insight-section">
				<div class="insight-card">
					<h3>Want to discover your own insights?</h3>
					<p>
						See yourself through the eyes of others. Get anonymous feedback and unlock insights about how you're perceived.
					</p>
					<div class="cta-buttons">
						<Button 
							href="/?ref=survey" 
							variant="primary" 
							size="lg"
							icon={IconSparkles}
							onclick={handleGetInsights}
						>
							Get My Own Insights
						</Button>
						<Button 
							href="/" 
							variant="outline" 
							size="lg"
							onclick={handleLearnMore}
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>

			<div class="features-grid">
				<div class="feature">
					<div class="feature-icon">📊</div>
					<h4>Detailed Analytics</h4>
					<p>Comprehensive reports on how others perceive your strengths and areas for growth</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🔒</div>
					<h4>100% Anonymous</h4>
					<p>All feedback is completely anonymous, encouraging honest and valuable insights</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🚀</div>
					<h4>Personal Growth</h4>
					<p>Use insights to improve relationships, communication, and professional development</p>
				</div>
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
		max-width: 850px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
		position: relative;
		z-index: 1;
	}

	.thank-you-content {
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



	h1 {
		font-size: clamp(2rem, 5vw, 2.5rem);
		font-weight: 700;
		color: #0f172a;
		margin: var(--spacing-6) 0 var(--spacing-4) 0;
		letter-spacing: -0.02em;
	}

	.thank-you-message {
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		color: #64748b;
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto var(--spacing-8);
		font-weight: 500;
	}

	.separator {
		display: flex;
		align-items: center;
		margin: var(--spacing-10) 0;
		gap: var(--spacing-4);
	}

	.separator-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%);
	}

	.separator-dots {
		display: flex;
		gap: var(--spacing-2);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		opacity: 0.6;
		animation: pulse 2s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.3s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.6s;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	.insight-section {
		margin-bottom: var(--spacing-10);
	}

	.insight-card {
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-radius: 20px;
		padding: var(--spacing-8);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(226, 232, 240, 0.8);
		position: relative;
		overflow: hidden;
	}

	.insight-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #10b981, #22c55e);
	}

	.insight-card h3 {
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		letter-spacing: -0.01em;
	}

	.insight-card p {
		font-size: clamp(0.875rem, 2vw, 1rem);
		color: #475569;
		line-height: 1.6;
		margin-bottom: var(--spacing-6);
		font-weight: 500;
	}

	.cta-buttons {
		display: flex;
		gap: var(--spacing-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-6);
		margin-top: var(--spacing-8);
	}

	.feature {
		text-align: center;
		padding: var(--spacing-6);
		background: rgba(248, 250, 252, 0.8);
		border-radius: 16px;
		border: 1px solid rgba(226, 232, 240, 0.8);
		transition: all 0.3s ease;
	}

	.feature:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
		background: rgba(248, 250, 252, 1);
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: var(--spacing-4);
		display: block;
	}

	.feature h4 {
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-3);
		letter-spacing: -0.01em;
	}

	.feature p {
		font-size: 0.875rem;
		color: #64748b;
		line-height: 1.5;
		margin: 0;
		font-weight: 500;
	}

	/* Medium screens - 2 columns for features */
	@media (max-width: 1024px) and (min-width: 769px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-5);
		}
	}

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
		
		.thank-you-content {
			padding: var(--spacing-6);
			border-radius: 20px;
		}

		h1 {
			font-size: clamp(1.5rem, 5vw, 1.75rem);
			margin-bottom: var(--spacing-3);
		}

		.thank-you-message {
			font-size: 1rem;
			margin-bottom: var(--spacing-6);
		}

		.separator {
			margin: var(--spacing-8) 0;
			gap: var(--spacing-3);
		}
		
		.insight-section {
			margin-bottom: var(--spacing-8);
		}

		.insight-card {
			padding: var(--spacing-6);
		}

		.insight-card h3 {
			font-size: 1.125rem;
			margin-bottom: var(--spacing-3);
		}

		.insight-card p {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-5);
		}

		.cta-buttons {
			flex-direction: column;
			gap: var(--spacing-3);
		}

		.cta-buttons :global(.btn) {
			width: 100%;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-4);
		}

		.feature {
			padding: var(--spacing-4);
		}

		.feature h4 {
			font-size: 1rem;
		}

		.feature p {
			font-size: 0.8125rem;
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

		.thank-you-content {
			padding: var(--spacing-4);
			border-radius: 16px;
		}

		h1 {
			font-size: clamp(1.25rem, 6vw, 1.5rem);
			margin-bottom: var(--spacing-2);
			line-height: 1.2;
		}

		.thank-you-message {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-4);
		}

		.separator {
			margin: var(--spacing-6) 0;
			gap: var(--spacing-2);
		}

		.dot {
			width: 5px;
			height: 5px;
		}

		.insight-section {
			margin-bottom: var(--spacing-6);
		}

		.insight-card {
			padding: var(--spacing-4);
		}

		.insight-card h3 {
			font-size: 1rem;
			margin-bottom: var(--spacing-2);
		}

		.insight-card p {
			font-size: 0.875rem;
			margin-bottom: var(--spacing-4);
		}

		.cta-buttons {
			gap: var(--spacing-2);
		}

		.features-grid {
			gap: var(--spacing-3);
		}

		.feature {
			padding: var(--spacing-3);
		}

		.feature-icon {
			font-size: 1.5rem;
			margin-bottom: var(--spacing-2);
		}

		.feature h4 {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-2);
		}

		.feature p {
			font-size: 0.75rem;
		}
	}

	/* iPhone SE and very small screens */
	@media (max-width: 375px) and (max-height: 667px) {
		.section {
			padding: var(--spacing-2);
			padding-top: var(--spacing-3);
		}

		.thank-you-content {
			padding: var(--spacing-3);
		}

		h1 {
			font-size: 1.25rem;
			margin-bottom: var(--spacing-2);
		}

		.thank-you-message {
			font-size: 0.875rem;
			margin-bottom: var(--spacing-3);
		}

		.insight-section {
			margin-bottom: var(--spacing-4);
		}

		.insight-card {
			padding: var(--spacing-3);
		}

		.features-grid {
			gap: var(--spacing-2);
		}

		.feature {
			padding: var(--spacing-2);
		}
	}
</style> 