<script lang="ts">
	import Card from '../Card.svelte';
</script>

<section id="typography" class="section">
	<h2>Typography</h2>

	<div class="card-stack">
		<Card title="Headings" description="Semantic headings with consistent hierarchy">
			<div class="headings-container">
				<div class="heading-example">
					<h1>Heading 1</h1>
					<span class="heading-info">48px • Semibold</span>
				</div>
				<div class="heading-example">
					<h2>Heading 2</h2>
					<span class="heading-info">36px • Semibold</span>
				</div>
				<div class="heading-example">
					<h3>Heading 3</h3>
					<span class="heading-info">24px • Semibold</span>
				</div>
				<div class="heading-example">
					<h4>Heading 4</h4>
					<span class="heading-info">20px • Semibold</span>
				</div>
				<div class="heading-example">
					<h5>Heading 5</h5>
					<span class="heading-info">18px • Semibold</span>
				</div>
				<div class="heading-example">
					<h6>Heading 6</h6>
					<span class="heading-info">16px • Semibold</span>
				</div>
			</div>
		</Card>

		<Card title="Body Text" description="Readable text styles for content">
			<div class="body-text-container">
				<div class="body-example">
					<p class="body-large">
						This is large body text. Perfect for introductory paragraphs or important content that
						needs more emphasis.
					</p>
					<span class="body-info">18px • Regular</span>
				</div>
				<div class="body-example">
					<p class="body-base">
						This is base body text. The standard text size for most content, designed for optimal
						readability across all devices.
					</p>
					<span class="body-info">16px • Regular</span>
				</div>
				<div class="body-example">
					<p class="body-small">
						This is small body text. Used for secondary information, captions, or supplementary
						content.
					</p>
					<span class="body-info">14px • Regular</span>
				</div>
				<div class="body-example">
					<p><strong>This is bold text</strong> and <em>this is italic text</em>.</p>
					<span class="body-info">Text formatting</span>
				</div>
				<div class="body-example">
					<p><a href="/">This is a link</a> with hover effects.</p>
					<span class="body-info">Interactive text</span>
				</div>
			</div>
		</Card>

		<Card title="Font Families" description="Primary typefaces used throughout the system">
			<div class="font-family-container">
				<div class="font-example">
					<p class="font-sample heading-font">The quick brown fox jumps over the lazy dog</p>
					<div class="font-details">
						<span class="font-name">Inter</span>
						<span class="font-usage">Headings & UI</span>
					</div>
				</div>
				<div class="font-example">
					<p class="font-sample body-font">The quick brown fox jumps over the lazy dog</p>
					<div class="font-details">
						<span class="font-name">Inter</span>
						<span class="font-usage">Body text</span>
					</div>
				</div>
				<div class="font-example">
					<p class="font-sample mono-font">The quick brown fox jumps over the lazy dog</p>
					<div class="font-details">
						<span class="font-name">Fira Code</span>
						<span class="font-usage">Code & monospace</span>
					</div>
				</div>
			</div>
		</Card>

		<Card title="Font Sizes" description="Consistent scale for all text elements">
			<div class="font-size-container">
				<div class="size-example">
					<p class="size-sample" style="font-size: var(--font-size-xs);">Extra Small</p>
					<div class="size-details">
						<span class="size-token">--font-size-xs</span>
						<span class="size-value">12px</span>
					</div>
				</div>
				<div class="size-example">
					<p class="size-sample" style="font-size: var(--font-size-sm);">Small</p>
					<div class="size-details">
						<span class="size-token">--font-size-sm</span>
						<span class="size-value">14px</span>
					</div>
				</div>
				<div class="size-example">
					<p class="size-sample" style="font-size: var(--font-size-base);">Base</p>
					<div class="size-details">
						<span class="size-token">--font-size-base</span>
						<span class="size-value">16px</span>
					</div>
				</div>
				<div class="size-example">
					<p class="size-sample" style="font-size: var(--font-size-lg);">Large</p>
					<div class="size-details">
						<span class="size-token">--font-size-lg</span>
						<span class="size-value">18px</span>
					</div>
				</div>
				<div class="size-example">
					<p class="size-sample" style="font-size: var(--font-size-xl);">Extra Large</p>
					<div class="size-details">
						<span class="size-token">--font-size-xl</span>
						<span class="size-value">20px</span>
					</div>
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

	/* Headings Container */
	.headings-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	.heading-example {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: var(--spacing-4);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.heading-example:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.heading-example h1,
	.heading-example h2,
	.heading-example h3,
	.heading-example h4,
	.heading-example h5,
	.heading-example h6 {
		margin: 0;
		flex: 1;
	}

	.heading-info {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		font-family: var(--font-mono);
		font-weight: var(--font-weight-medium);
		margin-left: var(--spacing-4);
	}

	/* Body Text Container */
	.body-text-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	.body-example {
		padding: var(--spacing-4);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.body-example:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.body-example p {
		margin: 0 0 var(--spacing-2) 0;
		line-height: 1.6;
	}

	.body-large {
		font-size: var(--font-size-lg);
	}

	.body-base {
		font-size: var(--font-size-base);
	}

	.body-small {
		font-size: var(--font-size-sm);
	}

	.body-info {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		font-family: var(--font-mono);
		font-weight: var(--font-weight-medium);
	}

	/* Font Family Container */
	.font-family-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	.font-example {
		padding: var(--spacing-6);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
	}

	.font-example:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.font-sample {
		font-size: var(--font-size-lg);
		margin: 0 0 var(--spacing-4) 0;
		color: var(--color-text-primary);
		line-height: 1.4;
	}

	.font-sample.heading-font {
		font-family: var(--font-heading);
	}

	.font-sample.body-font {
		font-family: var(--font-body);
	}

	.font-sample.mono-font {
		font-family: var(--font-mono);
	}

	.font-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.font-name {
		font-size: var(--font-size-base);
		color: var(--color-text-primary);
		font-weight: var(--font-weight-semibold);
	}

	.font-usage {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		font-family: var(--font-mono);
	}

	/* Font Size Container */
	.font-size-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-4);
	}

	.size-example {
		padding: var(--spacing-4);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-fast);
		text-align: center;
	}

	.size-example:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.size-sample {
		margin: 0 0 var(--spacing-3) 0;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
	}

	.size-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.size-token {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	.size-value {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.heading-example {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-2);
		}

		.heading-info {
			margin-left: 0;
		}

		.font-details {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-1);
		}

		.font-size-container {
			grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		}
	}
</style>
