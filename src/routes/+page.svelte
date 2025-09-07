<script lang="ts">
	import { Button, Head } from '$lib/components';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';

	let heroVisible = $state(false);
	let featuresVisible = $state(false);
	let testimonialsVisible = $state(false);

	onMount(() => {
		setTimeout(() => heroVisible = true, 100);
		setTimeout(() => featuresVisible = true, 300);
		setTimeout(() => testimonialsVisible = true, 500);
	});
</script>

<Head
	title="HelpGrow - Discover Your True Impact"
	description="See yourself through the eyes of others. Get anonymous personality insights from friends, family, and colleagues to unlock your potential and improve relationships with HelpGrow."
/>

<Navbar />

<!-- Hero Section -->
<section class="hero" class:visible={heroVisible}>
	<div class="hero-background">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
	</div>
	
	<div class="container">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-icon">✨</span>
				<span>Trusted by 10,000+ people worldwide</span>
			</div>
			
			<h1 class="hero-title">
				See Yourself Through 
				<span class="gradient-text">Others' Eyes</span>
			</h1>
			
			<p class="hero-description">
				Unlock powerful personality insights through anonymous feedback from people who know you best. 
				Discover your hidden strengths, blind spots, and how to make a stronger impact.
			</p>
			
			<div class="hero-actions">
				<Button href="/login?mode=signup" variant="primary" size="xl">
					Start Your Journey
				</Button>
			</div>
			
			<div class="hero-stats">
				<div class="stat-item">
					<div class="stat-number">27</div>
					<div class="stat-label">Personality Dimensions</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">6</div>
					<div class="stat-label">Core Categories</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">95%</div>
					<div class="stat-label">Find It Helpful</div>
				</div>
			</div>
		</div>
		
		<div class="hero-visual">
			<div class="insight-cards">
				<div class="insight-card card-1">
					<div class="card-icon">🧠</div>
					<div class="card-title">Cognitive Style</div>
					<div class="card-trait">Quick Decision Maker</div>
					<div class="card-score">4.2/5</div>
				</div>
				<div class="insight-card card-2">
					<div class="card-icon">🤝</div>
					<div class="card-title">Social Dynamics</div>
					<div class="card-trait">Natural Collaborator</div>
					<div class="card-score">4.7/5</div>
				</div>
				<div class="insight-card card-3">
					<div class="card-icon">⚡</div>
					<div class="card-title">Work & Achievement</div>
					<div class="card-trait">High Achiever</div>
					<div class="card-score">4.5/5</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="features" class:visible={featuresVisible}>
	<div class="container">
		<div class="section-header">
			<h2>How It Works</h2>
			<p>Three simple steps to unlock profound insights about yourself</p>
		</div>
		
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<div class="icon-background">
						<span>🔗</span>
					</div>
				</div>
				<h3>Share Your Unique Link</h3>
				<p>Send a personalized survey link to friends, family, colleagues, and anyone who knows you well.</p>
				<div class="feature-detail">
					<span class="detail-badge">Anonymous & Safe</span>
				</div>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<div class="icon-background">
						<span>📊</span>
					</div>
				</div>
				<h3>They Answer 27 Questions</h3>
				<p>A comprehensive personality assessment covering 6 core areas of your character and behavior.</p>
				<div class="feature-detail">
					<span class="detail-badge">5 Minutes to Complete</span>
				</div>
			</div>
			
			<div class="feature-card">
				<div class="feature-icon">
					<div class="icon-background">
						<span>🎯</span>
					</div>
				</div>
				<h3>Get Detailed Insights</h3>
				<p>Receive a beautiful, comprehensive report with strengths, growth areas, and actionable advice.</p>
				<div class="feature-detail">
					<span class="detail-badge">Instant Results</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Categories Preview -->
<section class="categories">
	<div class="container">
		<div class="section-header">
			<h2>6 Personality Categories</h2>
			<p>Comprehensive insights across all aspects of your personality</p>
		</div>
		
		<div class="categories-grid">
			<div class="category-preview">
				<div class="category-icon">🧠</div>
				<h3>Cognitive Style</h3>
				<p>How you think, make decisions, and solve problems</p>
				<ul class="category-traits">
					<li>Decision-making speed</li>
					<li>Risk tolerance</li>
					<li>Learning preferences</li>
				</ul>
			</div>
			
			<div class="category-preview">
				<div class="category-icon">🤝</div>
				<h3>Social Dynamics</h3>
				<p>Your interaction style and emotional intelligence</p>
				<ul class="category-traits">
					<li>Communication style</li>
					<li>Social energy</li>
					<li>Conflict resolution</li>
				</ul>
			</div>
			
			<div class="category-preview">
				<div class="category-icon">⚡</div>
				<h3>Work & Achievement</h3>
				<p>Your approach to goals, quality, and performance</p>
				<ul class="category-traits">
					<li>Initiative taking</li>
					<li>Perfectionism</li>
					<li>Stress response</li>
				</ul>
			</div>
			
			<div class="category-preview">
				<div class="category-icon">🎭</div>
				<h3>Personality Traits</h3>
				<p>Core characteristics and behavioral patterns</p>
				<ul class="category-traits">
					<li>Reliability</li>
					<li>Optimism</li>
					<li>Adaptability</li>
				</ul>
			</div>
			
			<div class="category-preview">
				<div class="category-icon">🎯</div>
				<h3>Values & Motivation</h3>
				<p>What drives you and shapes your priorities</p>
				<ul class="category-traits">
					<li>Core values</li>
					<li>Work-life balance</li>
					<li>Independence</li>
				</ul>
			</div>
			
			<div class="category-preview">
				<div class="category-icon">🌟</div>
				<h3>Unique Strengths</h3>
				<p>Your superpowers and distinctive qualities</p>
				<ul class="category-traits">
					<li>Creative vs analytical</li>
					<li>Leadership style</li>
					<li>Energy sources</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials -->
<section class="testimonials" class:visible={testimonialsVisible}>
	<div class="container">
		<div class="section-header">
			<h2>What People Discover</h2>
			<p>Real insights from real people</p>
		</div>
		
		<div class="testimonials-grid">
			<div class="testimonial-card">
				<div class="testimonial-content">
					<div class="quote-icon">"</div>
					<p>I discovered communication blind spots that were holding me back at work. The insights helped me become a better leader and teammate.</p>
				</div>
				<div class="testimonial-author">
					<img src="/avatars/7.webp" alt="Sarah Chen" class="author-avatar" />
					<div class="author-info">
						<div class="author-name">Sarah Chen</div>
						<div class="author-title">Self-Discovery Enthusiast</div>
					</div>
				</div>
			</div>
			
			<div class="testimonial-card">
				<div class="testimonial-content">
					<div class="quote-icon">"</div>
					<p>The anonymous feedback revealed strengths I didn't know I had. It boosted my confidence and helped me understand my impact on others.</p>
				</div>
				<div class="testimonial-author">
					<img src="/avatars/13.webp" alt="Marcus Johnson" class="author-avatar" />
					<div class="author-info">
						<div class="author-name">Marcus Johnson</div>
						<div class="author-title">Personal Growth Advocate</div>
					</div>
				</div>
			</div>
			
			<div class="testimonial-card">
				<div class="testimonial-content">
					<div class="quote-icon">"</div>
					<p>The 6-category breakdown was incredibly detailed. I learned about my personality in ways that traditional assessments never captured.</p>
				</div>
				<div class="testimonial-author">
					<img src="/avatars/22.webp" alt="Alex Rivera" class="author-avatar" />
					<div class="author-info">
						<div class="author-name">Alex Rivera</div>
						<div class="author-title">Personality Insights Explorer</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="cta-section">
	<div class="cta-background">
		<div class="cta-gradient"></div>
	</div>
	<div class="container">
		<div class="cta-content">
							<h2>Ready to Discover<br/>Your True Impact?</h2>
			<p>Join thousands who improved their relationships with us.</p>
			<div class="cta-actions">
				<Button href="/login?mode=signup" variant="primary" size="xl">
					Get Started Free
				</Button>
				<div class="cta-note">
					<span>✓ No credit card required</span>
					<span>✓ Results in minutes</span>
					<span>✓ Completely anonymous</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<h3>HelpGrow</h3>
				<p>Discover yourself through others' eyes</p>
			</div>
			<div class="footer-links">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2024 HelpGrow. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	/* Global Styles */
	:global(body) {
		overflow-x: hidden;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-6);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-16);
	}

	.section-header h2 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 600;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		letter-spacing: -0.02em;
	}

	.section-header p {
		font-size: clamp(1rem, 3vw, 1.25rem);
		color: #64748b;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
		font-weight: 400;
	}

	/* Hero Section */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease-out;
	}

	.hero.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		opacity: 0.03;
		animation: float 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: #10b981;
		top: -300px;
		right: -300px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: #22c55e;
		bottom: -200px;
		left: -200px;
		animation-delay: 10s;
	}

	.orb-3 {
		width: 300px;
		height: 300px;
		background: #06b6d4;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: 5s;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px) scale(1); }
		50% { transform: translateY(-30px) scale(1.05); }
	}

	.hero .container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-16);
		align-items: center;
		padding-top: var(--spacing-20);
		padding-bottom: var(--spacing-20);
	}

	.hero-content {
		z-index: 1;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-4);
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 50px;
		font-size: 0.875rem;
		color: #374151;
		font-weight: 500;
		margin-bottom: var(--spacing-8);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.badge-icon {
		font-size: 1rem;
	}

	.hero-title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 700;
		line-height: 1.2;
		color: #0f172a;
		margin-bottom: var(--spacing-6);
		letter-spacing: -0.02em;
		max-width: 600px;
	}

	.gradient-text {
		background: linear-gradient(135deg, #047857 0%, #10b981 50%, #22c55e 100%);
		background-size: 100% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 800;
		display: inline-block;
	}

	.hero-description {
		font-size: clamp(1rem, 3vw, 1.25rem);
		line-height: 1.7;
		color: #64748b;
		margin-bottom: var(--spacing-10);
		max-width: 500px;
		font-weight: 400;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-6);
		margin-bottom: var(--spacing-12);
	}

	.demo-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		background: none;
		border: none;
		color: #374151;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: var(--spacing-3);
		border-radius: 12px;
	}

	.demo-button:hover {
		color: #1e40af;
		background: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.play-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		font-size: 0.875rem;
	}

	.hero-stats {
		display: flex;
		gap: var(--spacing-8);
	}

	.stat-item {
		text-align: left;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-1);
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #64748b;
		font-weight: 500;
	}

	/* Hero Visual */
	.hero-visual {
		position: relative;
		z-index: 1;
	}



	.insight-cards {
		position: relative;
		height: 400px;
	}

	.insight-card {
		position: absolute;
		width: 200px;
		padding: var(--spacing-6);
		background: white;
		border: 1px solid #f1f5f9;
		border-radius: 16px;
		animation: cardFloat 6s ease-in-out infinite;
	}

	.card-1 {
		top: 0;
		left: 0;
		animation-delay: 0s;
		border-left: 3px solid #10b981;
	}

	.card-2 {
		top: 100px;
		right: 0;
		animation-delay: 2s;
		border-left: 3px solid #22c55e;
	}

	.card-3 {
		bottom: 0;
		left: 50px;
		animation-delay: 4s;
		border-left: 3px solid #06b6d4;
	}

	@keyframes cardFloat {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-8px); }
	}

	.card-icon {
		font-size: 1.5rem;
		margin-bottom: var(--spacing-3);
	}

	.card-title {
		font-size: 0.75rem;
		font-weight: 600;
		color: #64748b;
		margin-bottom: var(--spacing-2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.card-trait {
		font-size: 0.875rem;
		font-weight: 600;
		color: #0f172a;
		margin-bottom: var(--spacing-2);
		line-height: 1.4;
	}

	.card-score {
		font-size: 1.25rem;
		font-weight: 700;
		color: #10b981;
		letter-spacing: -0.02em;
	}



	/* Features Section */
	.features {
		padding: var(--spacing-20) 0;
		background: white;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease-out;
	}

	.features.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-10);
	}

	.feature-card {
		text-align: center;
		padding: var(--spacing-10);
		background: #fafafa;
		border-radius: 20px;
		transition: all 0.3s ease;
		position: relative;
		border: 1px solid #f1f5f9;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		background: white;
		border-color: #e2e8f0;
	}

	.feature-icon {
		margin-bottom: var(--spacing-8);
	}

	.icon-background {
		width: 80px;
		height: 80px;
		margin: 0 auto;
		background: #10b981;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	.feature-card:nth-child(2) .icon-background {
		background: #22c55e;
	}

	.feature-card:nth-child(3) .icon-background {
		background: #06b6d4;
	}

	.feature-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		letter-spacing: -0.01em;
	}

	.feature-card p {
		font-size: 1rem;
		line-height: 1.6;
		color: #64748b;
		margin-bottom: var(--spacing-6);
		font-weight: 400;
	}

	.detail-badge {
		display: inline-block;
		padding: var(--spacing-2) var(--spacing-4);
		background: #f1f5f9;
		color: #475569;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 50px;
		border: 1px solid #e2e8f0;
	}

	/* Categories Section */
	.categories {
		padding: var(--spacing-20) 0;
		background: #fafafa;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-8);
	}

	.category-preview {
		padding: var(--spacing-8);
		background: white;
		border-radius: 16px;
		border: 1px solid #f1f5f9;
		transition: all 0.3s ease;
	}

	.category-preview:hover {
		transform: translateY(-2px);
		border-color: #e2e8f0;
	}

	.category-icon {
		font-size: 2rem;
		margin-bottom: var(--spacing-4);
	}

	.category-preview h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #0f172a;
		margin-bottom: var(--spacing-2);
		letter-spacing: -0.01em;
	}

	.category-preview p {
		font-size: 0.875rem;
		color: #64748b;
		margin-bottom: var(--spacing-4);
		line-height: 1.5;
		font-weight: 400;
	}

	.category-traits {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.category-traits li {
		font-size: 0.8125rem;
		color: #64748b;
		padding: var(--spacing-1) 0;
		position: relative;
		padding-left: var(--spacing-4);
		font-weight: 500;
	}

	.category-traits li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: #10b981;
		font-weight: bold;
	}

	/* Testimonials Section */
	.testimonials {
		padding: var(--spacing-20) 0;
		background: white;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease-out;
	}

	.testimonials.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--spacing-10);
	}

	.testimonial-card {
		padding: var(--spacing-8);
		background: #fafafa;
		border-radius: 20px;
		border: 1px solid #f1f5f9;
		transition: all 0.3s ease;
	}

	.testimonial-card:hover {
		transform: translateY(-2px);
		background: white;
		border-color: #e2e8f0;
	}

	.testimonial-content {
		margin-bottom: var(--spacing-6);
		position: relative;
	}

	.quote-icon {
		font-size: 3rem;
		color: #10b981;
		opacity: 0.1;
		position: absolute;
		top: -10px;
		left: -5px;
	}

	.testimonial-content p {
		font-size: 1rem;
		line-height: 1.7;
		color: #374151;
		font-style: normal;
		margin-left: var(--spacing-6);
		font-weight: 400;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.author-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.author-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: #0f172a;
		margin-bottom: var(--spacing-1);
		letter-spacing: -0.01em;
	}

	.author-title {
		font-size: 0.8125rem;
		color: #64748b;
		font-weight: 500;
	}

	/* CTA Section */
	.cta-section {
		position: relative;
		padding: var(--spacing-20) 0;
		background: #0f172a;
		overflow: hidden;
	}

	.cta-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}

	.cta-gradient {
		width: 100%;
		height: 100%;
		background: #0f172a;
		opacity: 1;
	}

	.cta-content {
		text-align: center;
		color: white !important;
		position: relative;
		z-index: 1;
	}

	.cta-content *,
	.cta-content h1, .cta-content h2, .cta-content h3, .cta-content h4, .cta-content h5, .cta-content h6,
	.cta-content p,
	.cta-content span,
	.cta-content div {
		color: white !important;
	}

	.cta-content h2 {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 700;
		margin-bottom: var(--spacing-6);
		letter-spacing: -0.02em;
		line-height: 1.3;
	}

	.cta-content p {
		font-size: clamp(1rem, 3vw, 1.25rem);
		margin-bottom: var(--spacing-10);
		opacity: 0.8;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		font-weight: 400;
		line-height: 1.6;
	}

	.cta-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-8);
	}

	.cta-note {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-6);
		justify-content: center;
		font-size: 0.875rem;
		opacity: 0.7;
		font-weight: 500;
	}

	.cta-note span {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}

	/* Footer */
	.footer {
		background: #1e293b;
		color: white !important;
		padding: var(--spacing-16) 0 var(--spacing-8);
	}

	.footer *,
	.footer h1, .footer h2, .footer h3, .footer h4, .footer h5, .footer h6,
	.footer p,
	.footer a,
	.footer span,
	.footer div {
		color: white !important;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-10);
	}

	.footer-brand h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: var(--spacing-2);
		letter-spacing: -0.01em;
	}

	.footer-brand p {
		color: rgba(255, 255, 255, 0.95) !important;
		font-weight: 400;
	}

	.footer-links {
		display: flex;
		gap: var(--spacing-8);
	}

	.footer-links a {
		color: rgba(255, 255, 255, 0.95) !important;
		text-decoration: none;
		transition: color 0.2s;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.footer-links a:hover {
		color: white !important;
	}

	.footer-bottom {
		text-align: center;
		padding-top: var(--spacing-8);
		border-top: 1px solid rgba(255, 255, 255, 0.3);
	}

	.footer-bottom p {
		color: rgba(255, 255, 255, 0.9) !important;
		font-size: 0.8125rem;
		font-weight: 400;
	}

	/* Responsive Design - Centered layout for all screens ≤1024px */
	@media (max-width: 1024px) {
		.hero .container {
			grid-template-columns: 1fr;
			gap: var(--spacing-12);
			text-align: center;
			justify-items: center;
			padding-top: var(--spacing-16);
			padding-bottom: var(--spacing-16);
		}

		/* Hide hero visual completely on all tablet and mobile */
		.hero-visual {
			display: none;
		}

		/* Add spacing above hero title for all tablet/mobile */
		.hero-content {
			padding-top: var(--spacing-16);
		}

		.hero-stats {
			justify-content: center;
		}

		.stat-item {
			text-align: center;
		}

		.hero-actions {
			justify-content: center;
		}

		.orb-1, .orb-2, .orb-3 {
			display: none; /* Hide floating orbs on tablet */
		}

		.features-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-6);
		}

		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-6);
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 var(--spacing-6);
			max-width: 100%;
		}

		/* Prevent horizontal scroll */
		body {
			overflow-x: hidden;
		}



		/* Hero Section Mobile */
		.hero {
			padding: var(--spacing-12) 0;
		}

		.hero .container {
			padding-top: var(--spacing-12);
			padding-bottom: var(--spacing-12);
			gap: var(--spacing-10);
		}

		.hero-badge {
			font-size: 0.8125rem;
			padding: var(--spacing-2) var(--spacing-3);
		}

		.hero-title {
			font-size: clamp(2rem, 8vw, 2.75rem);
			line-height: 1.1;
			margin-bottom: var(--spacing-5);
		}

		.hero-description {
			font-size: 1rem;
			margin-bottom: var(--spacing-8);
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
			gap: var(--spacing-4);
		}

		.hero-stats {
			flex-direction: row;
			gap: var(--spacing-6);
			justify-content: center;
			margin-top: var(--spacing-8);
		}

		.stat-number {
			font-size: 1.5rem;
		}

		.stat-label {
			font-size: 0.8125rem;
		}

		/* Insight Cards Mobile */
		.insight-cards {
			height: 280px;
			margin: 0 auto;
			max-width: 300px;
		}

		.insight-card {
			width: 140px;
			padding: var(--spacing-3);
		}

		.card-icon {
			font-size: 1.25rem;
		}

		.card-title {
			font-size: 0.75rem;
			margin-bottom: var(--spacing-2);
		}

		.card-trait {
			font-size: 0.6875rem;
		}

		.card-score {
			font-size: 1rem;
		}

		/* Section Headers */
		.section-header h2 {
			font-size: clamp(1.75rem, 6vw, 2.25rem);
		}

		.section-header p {
			font-size: 0.9375rem;
		}

		/* Features Grid Mobile */
		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-6);
		}

		.feature-card {
			padding: var(--spacing-6);
			margin: 0 var(--spacing-2);
		}

		.feature-card h3 {
			font-size: 1.125rem;
		}

		.feature-card p {
			font-size: 0.9375rem;
		}

		.icon-background {
			width: 64px;
			height: 64px;
			font-size: 1.75rem;
		}

		/* Categories Grid Mobile */
		.categories-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-6);
		}

		.category-preview {
			padding: var(--spacing-6);
		}

		.category-icon {
			font-size: 2rem;
		}

		.category-preview h3 {
			font-size: 1.125rem;
		}

		.category-preview p {
			font-size: 0.9375rem;
		}

		.category-traits li {
			font-size: 0.875rem;
		}

		/* Testimonials Mobile */
		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-6);
		}

		.testimonial-card {
			padding: var(--spacing-6);
		}

		.testimonial-content p {
			font-size: 0.9375rem;
			margin-left: var(--spacing-4);
		}

		/* CTA Section Mobile */
		.cta-section {
			padding: var(--spacing-16) 0;
		}

		.cta-content h2 {
			font-size: clamp(1.75rem, 7vw, 2.5rem);
			margin-bottom: var(--spacing-4);
		}

		.cta-content p {
			font-size: 1rem;
			margin-bottom: var(--spacing-8);
		}

		.cta-note {
			flex-direction: column;
			gap: var(--spacing-3);
			font-size: 0.8125rem;
		}

		/* Footer Mobile */
		.footer {
			padding: var(--spacing-12) 0 var(--spacing-6);
		}

		.footer-content {
			flex-direction: column;
			gap: var(--spacing-6);
			text-align: center;
		}

		.footer-links {
			gap: var(--spacing-6);
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--spacing-4);
		}

		/* Hero Mobile Small */
		.hero {
			padding: var(--spacing-10) 0;
		}

		.hero .container {
			gap: var(--spacing-8);
			padding-top: var(--spacing-10);
			padding-bottom: var(--spacing-10);
		}

		.hero-badge {
			font-size: 0.75rem;
			padding: var(--spacing-1) var(--spacing-3);
			margin-bottom: var(--spacing-6);
		}

		.hero-title {
			font-size: clamp(1.75rem, 9vw, 2.25rem);
			margin-bottom: var(--spacing-4);
		}

		.hero-description {
			font-size: 0.9375rem;
			margin-bottom: var(--spacing-6);
		}

		.hero-actions {
			gap: var(--spacing-3);
		}

		.hero-actions :global(.btn) {
			min-height: 48px;
			padding: var(--spacing-3) var(--spacing-6);
			font-size: 1rem;
		}

		.demo-button {
			min-height: 48px;
			padding: var(--spacing-3);
		}

		.hero-stats {
			flex-direction: column;
			gap: var(--spacing-4);
			margin-top: var(--spacing-6);
		}

		.stat-item {
			text-align: center;
		}

		.stat-number {
			font-size: 1.25rem;
		}

		/* Insight Cards Small Mobile */
		.insight-cards {
			height: 220px;
			max-width: 280px;
		}

		.insight-card {
			width: 120px;
			padding: var(--spacing-2);
		}

		.card-icon {
			font-size: 1rem;
			margin-bottom: var(--spacing-1);
		}

		.card-title {
			font-size: 0.6875rem;
			margin-bottom: var(--spacing-1);
		}

		.card-trait {
			font-size: 0.625rem;
			margin-bottom: var(--spacing-1);
		}

		.card-score {
			font-size: 0.875rem;
		}

		/* Sections Mobile Small */
		.features, .categories, .testimonials {
			padding: var(--spacing-12) 0;
		}

		.cta-section {
			padding: var(--spacing-12) 0;
		}

		.section-header {
			margin-bottom: var(--spacing-8);
		}

		.section-header h2 {
			font-size: clamp(1.5rem, 7vw, 2rem);
			margin-bottom: var(--spacing-3);
		}

		.section-header p {
			font-size: 0.875rem;
		}

		/* Feature Cards Small Mobile */
		.feature-card {
			padding: var(--spacing-5);
		}

		.feature-icon .icon-background {
			width: 48px;
			height: 48px;
		}

		.feature-icon span {
			font-size: 1.25rem;
		}

		.feature-card h3 {
			font-size: 1rem;
			margin-bottom: var(--spacing-3);
		}

		.feature-card p {
			font-size: 0.875rem;
			margin-bottom: var(--spacing-3);
		}

		.detail-badge {
			font-size: 0.75rem;
			padding: var(--spacing-1) var(--spacing-2);
		}

		/* Category Cards Small Mobile */
		.category-preview {
			padding: var(--spacing-5);
		}

		.category-icon {
			font-size: 1.75rem;
			margin-bottom: var(--spacing-3);
		}

		.category-preview h3 {
			font-size: 1rem;
			margin-bottom: var(--spacing-3);
		}

		.category-preview p {
			font-size: 0.875rem;
			margin-bottom: var(--spacing-4);
		}

		.category-traits {
			gap: var(--spacing-2);
		}

		.category-traits li {
			font-size: 0.8125rem;
		}

		/* Testimonials Small Mobile */
		.testimonial-card {
			padding: var(--spacing-5);
		}

		.testimonial-content p {
			font-size: 0.875rem;
			margin-left: var(--spacing-3);
		}

		.quote-icon {
			font-size: 2.5rem;
		}

		.author-avatar {
			width: 40px;
			height: 40px;
			font-size: 0.75rem;
		}

		.author-name {
			font-size: 0.8125rem;
		}

		.author-title {
			font-size: 0.75rem;
		}

		/* Footer Small Mobile */
		.footer {
			padding: var(--spacing-10) 0 var(--spacing-5);
		}

		.footer-brand h3 {
			font-size: 1.125rem;
		}

		.footer-brand p {
			font-size: 0.875rem;
		}

		.footer-links {
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--spacing-4);
		}

		.footer-links a {
			font-size: 0.8125rem;
		}

		.footer-bottom p {
			font-size: 0.75rem;
		}
	}
</style>
