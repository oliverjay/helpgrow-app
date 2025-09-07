<script lang="ts">
	import Card from '../Card.svelte';
</script>

<section id="favicons" class="section">
	<h2>Favicons</h2>

	<div class="card-stack">
		<Card
			title="Essential Favicon Sizes"
			description="These are the essential favicon sizes needed for modern web applications."
		>
			<div class="favicon-grid">
				<div class="favicon-item">
					<div class="favicon-preview" style="width: 16px; height: 16px;">
						<img src="/favicons/favicon-16x16.png" alt="16x16 favicon" width="16" height="16" />
					</div>
					<p>16x16 (Browser tabs)</p>
					<code>favicon-16x16.png</code>
				</div>
				<div class="favicon-item">
					<div class="favicon-preview" style="width: 32px; height: 32px;">
						<img src="/favicons/favicon-32x32.png" alt="32x32 favicon" width="32" height="32" />
					</div>
					<p>32x32 (Desktop browsers)</p>
					<code>favicon-32x32.png</code>
				</div>
				<div class="favicon-item">
					<div class="favicon-preview apple-touch" style="width: 60px; height: 60px;">
						<img
							src="/favicons/apple-touch-icon.png"
							alt="Apple touch icon"
							width="60"
							height="60"
						/>
					</div>
					<p>180x180 (Apple Touch)</p>
					<code>apple-touch-icon.png</code>
				</div>
				<div class="favicon-item">
					<div class="favicon-preview" style="width: 48px; height: 48px;">
						<img
							src="/favicons/android-chrome-192x192.png"
							alt="Android Chrome icon"
							width="48"
							height="48"
						/>
					</div>
					<p>192x192 (Android Chrome)</p>
					<code>android-chrome-192x192.png</code>
				</div>
				<div class="favicon-item">
					<div class="favicon-preview" style="width: 56px; height: 56px;">
						<img src="/favicons/android-chrome-512x512.png" alt="PWA icon" width="56" height="56" />
					</div>
					<p>512x512 (PWA)</p>
					<code>android-chrome-512x512.png</code>
				</div>
				<div class="favicon-item">
					<div class="favicon-preview" style="width: 32px; height: 32px;">
						<img src="/favicons/favicon-svg.svg" alt="SVG favicon" width="32" height="32" />
					</div>
					<p>SVG (Scalable)</p>
					<code>favicon-svg.svg</code>
				</div>
			</div>
		</Card>

		<!-- <Card
			title="Implementation"
			description="All favicons are located in /static/favicons/ and referenced in app.html."
		>
			<div class="implementation-note">
				<h4>Files Required:</h4>
				<ul>
					<li><code>favicon-16x16.png</code> - Browser tabs</li>
					<li><code>favicon-32x32.png</code> - Desktop browsers</li>
					<li><code>apple-touch-icon.png</code> - iOS homescreen (180x180)</li>
					<li><code>android-chrome-192x192.png</code> - Android Chrome</li>
					<li><code>android-chrome-512x512.png</code> - PWA splash screen</li>
					<li><code>favicon-svg.svg</code> - Modern browsers (scalable)</li>
				</ul>
			</div>
		</Card> -->
	</div>
</section>

<style>
	.section {
		margin-bottom: var(--spacing-16);
		scroll-margin-top: var(--spacing-8);
	}

	.favicon-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-6);
	}

	.favicon-item {
		text-align: center;
		padding: var(--spacing-4);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
		background-color: var(--color-bg-primary);
	}

	.favicon-preview {
		margin: 0 auto var(--spacing-3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.favicon-preview.apple-touch {
		border-radius: var(--radius-xl);
	}

	.favicon-item p {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: 0;
	}

	code {
		background-color: var(--color-bg-secondary);
		padding: var(--spacing-1) var(--spacing-2);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-text-primary);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.favicon-grid {
			justify-content: center;
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
