<script lang="ts">
	import Card from '../Card.svelte';
</script>

<section id="og-image" class="section">
	<h2>Open Graph Images</h2>

	<div class="card-stack">
		<Card title="Social Media Previews">
			<div class="og-previews">
				<div class="og-preview-item">
					<h4>General (Facebook, LinkedIn, Slack, etc.)</h4>
					<code>static/open-graph/og-image-general.png</code>
					<div class="og-preview">
						<img
							src="/open-graph/og-image-general.png"
							alt="General OG preview"
							class="og-image-display"
						/>
					</div>
					<p class="og-description">1200x630 - Works for most platforms</p>
				</div>

				<div class="og-preview-item">
					<h4>Twitter/X</h4>
					<code>static/open-graph/og-twitter.png</code>
					<div class="og-preview">
						<img
							src="/open-graph/og-image-general.png"
							alt="Twitter OG Preview"
							class="og-image-display"
						/>
					</div>
					<p class="og-description">1200x600 - Optimized for Twitter</p>
				</div>
			</div>
		</Card>
	</div>
</section>

<style>
	.section {
		margin-bottom: var(--spacing-16);
		scroll-margin-top: var(--spacing-8);
	}

	.og-previews {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--spacing-8);
		margin-bottom: var(--spacing-8);
	}

	.og-preview-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.og-preview-item h4 {
		margin: 0;
		color: var(--color-text-primary);
		font-size: var(--font-size-lg);
	}

	.og-preview {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background-color: var(--color-bg-secondary);
		transition: all var(--transition-fast);
	}

	.og-preview:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-md);
	}

	.og-image-display {
		width: 100%;
		height: auto;
		display: block;
		transition: transform var(--transition-fast);
	}

	.og-image-display:hover {
		transform: scale(1.02);
	}

	.og-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: 0;
		text-align: center;
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
		.og-previews {
			grid-template-columns: 1fr;
		}
	}
</style>
