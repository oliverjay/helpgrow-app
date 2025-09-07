<script lang="ts">
	import Card from '../Card.svelte';
	import { Button } from '$lib/components';
	import { IconLightningBolt } from '$lib/icons';
</script>

<section id="buttons" class="section">
	<h2>Buttons</h2>
	<p class="section-intro">
		Our button component provides consistent, accessible, and flexible interactive elements. All
		variants support icons, different sizes, and can function as both buttons and links.
	</p>

	<div class="card-stack">
		<Card
			title="Button Variants"
			description="Choose the right visual style based on action hierarchy and context"
		>
			<div class="variants-grid">
				<div class="variant-section">
					<h4>Primary Actions</h4>
					<p class="variant-description">Use for the main action on a page or section</p>
					<div class="button-examples">
						<div class="button-example">
							<Button variant="primary">Save Changes</Button>
							<div class="button-info">
								<span class="button-label">Primary</span>
								<code class="button-code">variant="primary"</code>
							</div>
						</div>
					</div>
				</div>

				<div class="variant-section">
					<h4>Secondary Actions</h4>
					<p class="variant-description">Use for important but not primary actions</p>
					<div class="button-examples">
						<div class="button-example">
							<Button variant="secondary">Export Data</Button>
							<div class="button-info">
								<span class="button-label">Secondary</span>
								<code class="button-code">variant="secondary"</code>
							</div>
						</div>
						<div class="button-example">
							<Button variant="outline">Learn More</Button>
							<div class="button-info">
								<span class="button-label">Outline</span>
								<code class="button-code">variant="outline"</code>
							</div>
						</div>
					</div>
				</div>

				<div class="variant-section">
					<h4>Subtle Actions</h4>
					<p class="variant-description">Use for minimal visual weight or tertiary actions</p>
					<div class="button-examples">
						<div class="button-example">
							<Button variant="ghost">View Details</Button>
							<div class="button-info">
								<span class="button-label">Ghost</span>
								<code class="button-code">variant="ghost"</code>
							</div>
						</div>
					</div>
				</div>

				<div class="variant-section">
					<h4>Destructive Actions</h4>
					<p class="variant-description">
						Use for actions that delete, remove, or cause irreversible changes
					</p>
					<div class="button-examples">
						<div class="button-example">
							<Button variant="destructive">Delete Account</Button>
							<div class="button-info">
								<span class="button-label">Destructive</span>
								<code class="button-code">variant="destructive"</code>
							</div>
						</div>
						<div class="button-example">
							<Button variant="destructive" alternate>Cancel</Button>
							<div class="button-info">
								<span class="button-label">Destructive Alt</span>
								<code class="button-code">variant="destructive" alternate</code>
							</div>
						</div>
					</div>
				</div>

				<div class="variant-section">
					<h4>States</h4>
					<p class="variant-description">
						Buttons automatically handle disabled and loading states
					</p>
					<div class="button-examples">
						<div class="button-example">
							<Button variant="primary" disabled>Disabled</Button>
							<div class="button-info">
								<span class="button-label">Disabled</span>
								<code class="button-code">disabled</code>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<Card
			title="Button Sizes"
			description="Choose the appropriate size based on context and visual hierarchy"
		>
			<div class="size-guide">
				<div class="size-section">
					<div class="button-examples size-examples">
						<div class="button-example">
							<Button size="sm">Small</Button>
							<div class="button-info">
								<span class="button-label">Small (32px)</span>
								<code class="button-code">size="sm"</code>
								<p class="use-case">Compact spaces, secondary actions, table rows</p>
							</div>
						</div>
						<div class="button-example">
							<Button size="md">Medium</Button>
							<div class="button-info">
								<span class="button-label">Medium (40px)</span>
								<code class="button-code">size="md" (default)</code>
								<p class="use-case">Standard size for most interfaces</p>
							</div>
						</div>
						<div class="button-example">
							<Button size="lg">Large</Button>
							<div class="button-info">
								<span class="button-label">Large (48px)</span>
								<code class="button-code">size="lg"</code>
								<p class="use-case">Hero sections, call-to-action buttons</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<Card
			title="Buttons with Icons"
			description="Add visual context and improve recognition with icons"
		>
			<div class="icon-guide">
				<p class="feature-description">
					Icons help users quickly identify button actions. Use meaningful icons that relate to the
					button's purpose. Import any icon component and pass it to the <code>icon</code> prop.
				</p>
				<div class="icon-button-grid">
					<div class="icon-button-row">
						<h4>Left Icon Position</h4>
						<p class="icon-description">
							Most common placement. Icon appears before text, good for actions and navigation.
						</p>
						<div class="button-examples">
							<div class="button-example">
								<Button variant="primary" icon={IconLightningBolt} iconPosition="left"
									>Quick Start</Button
								>
								<div class="button-info">
									<code class="button-code">icon={'{IconLightningBolt}'} iconPosition="left"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="outline" icon={IconLightningBolt} iconPosition="left"
									>Learn More</Button
								>
								<div class="button-info">
									<code class="button-code">variant="outline" icon={'{IconLightningBolt}'}</code>
								</div>
							</div>
						</div>
					</div>

					<div class="icon-button-row">
						<h4>Right Icon Position</h4>
						<p class="icon-description">
							Use for arrows, external links, or to indicate direction/outcome.
						</p>
						<div class="button-examples">
							<div class="button-example">
								<Button variant="primary" icon={IconLightningBolt} iconPosition="right"
									>Continue</Button
								>
								<div class="button-info">
									<code class="button-code">iconPosition="right"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="ghost" icon={IconLightningBolt} iconPosition="right"
									>Next Step</Button
								>
								<div class="button-info">
									<code class="button-code">variant="ghost" iconPosition="right"</code>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<Card
			title="Icon-Only Buttons"
			description="Space-efficient buttons for toolbars and compact interfaces"
		>
			<div class="icon-only-guide">
				<p class="feature-description">
					Icon-only buttons save space while maintaining clear actions. Always ensure icons are
					recognizable and consider adding tooltips for accessibility. Use <code>iconOnly</code> prop
					to create square buttons with proper aspect ratios.
				</p>
				<div class="icon-only-section">
					<div class="icon-only-variants">
						<h4>Variants</h4>
						<p class="icon-description">All button variants work with icon-only mode</p>
						<div class="button-examples">
							<div class="button-example">
								<Button variant="primary" iconOnly icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">Primary</span>
									<code class="button-code">iconOnly variant="primary"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="outline" iconOnly icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">Outline</span>
									<code class="button-code">iconOnly variant="outline"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="ghost" iconOnly icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">Ghost</span>
									<code class="button-code">iconOnly variant="ghost"</code>
								</div>
							</div>
						</div>
					</div>

					<div class="icon-only-sizes">
						<h4>Sizes</h4>
						<p class="icon-description">
							Icon-only buttons maintain square aspect ratios across all sizes
						</p>
						<div class="button-examples">
							<div class="button-example">
								<Button variant="primary" iconOnly size="sm" icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">32×32px</span>
									<code class="button-code">size="sm"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="primary" iconOnly size="md" icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">40×40px</span>
									<code class="button-code">size="md"</code>
								</div>
							</div>
							<div class="button-example">
								<Button variant="primary" iconOnly size="lg" icon={IconLightningBolt} />
								<div class="button-info">
									<span class="button-label">48×48px</span>
									<code class="button-code">size="lg"</code>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<Card title="Button Links" description="Buttons that navigate to other pages or sections">
			<div class="link-guide">
				<p class="feature-description">
					When you provide an <code>href</code> prop, the button renders as an accessible link while
					maintaining button styling. Perfect for navigation that should look like a button.
				</p>
				<div class="button-examples">
					<div class="button-example">
						<Button href="/dashboard" variant="primary">Go to Dashboard</Button>
						<div class="button-info">
							<span class="button-label">Primary Link</span>
							<code class="button-code">href="/dashboard" variant="primary"</code>
						</div>
					</div>
					<div class="button-example">
						<Button href="/docs" variant="outline">View Documentation</Button>
						<div class="button-info">
							<span class="button-label">Outline Link</span>
							<code class="button-code">href="/docs" variant="outline"</code>
						</div>
					</div>
					<div class="button-example">
						<Button href="/dashboard" variant="ghost">Dashboard</Button>
						<div class="button-info">
							<span class="button-label">Ghost Link</span>
							<code class="button-code">href="/dashboard" variant="ghost"</code>
						</div>
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

	.section-intro {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-8);
		line-height: 1.6;
	}

	.card-stack h4 {
		color: var(--color-text-primary);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	/* Feature descriptions */
	.feature-description {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-6);
		line-height: 1.6;
		display: none;
	}

	.feature-description code {
		background: var(--color-bg-secondary);
		padding: 0.125rem 0.25rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.875em;
	}

	/* Variant sections */
	.variants-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-12);
	}

	.variant-section {
		display: flex;
		flex-direction: column;
	}

	.variant-description,
	.icon-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-4);
		line-height: 1.5;
	}

	/* Button examples */
	.button-examples {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--spacing-6);
		align-items: start;
	}

	.size-examples {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	.button-example {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		transition: all var(--transition-fast);
	}

	.button-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2);
		text-align: center;
	}

	.button-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
		font-weight: var(--font-weight-semibold);
	}

	.button-code {
		background: var(--color-bg-secondary);
		color: var(--color-text-secondary);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-normal);
		border: 1px solid var(--color-border);
	}

	.use-case {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		line-height: 1.4;
		margin-top: var(--spacing-1);
	}

	/* Icon Button Layout */
	.icon-button-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}

	.icon-button-row {
		display: flex;
		flex-direction: column;
	}

	.icon-button-row .button-examples {
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
	}

	/* Icon-Only Section */
	.icon-only-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-8);
	}

	.icon-only-variants .button-examples,
	.icon-only-sizes .button-examples {
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	}

	/* Guides */
	.size-guide,
	.link-guide,
	.icon-guide,
	.icon-only-guide {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-6);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.button-examples {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: var(--spacing-4);
		}

		.size-examples {
			grid-template-columns: 1fr;
		}

		.icon-button-row .button-examples {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}

		.icon-only-section {
			grid-template-columns: 1fr;
			gap: var(--spacing-6);
		}

		.button-example {
			padding: var(--spacing-4);
		}

		.variants-grid {
			gap: var(--spacing-8);
		}
	}

	@media (max-width: 640px) {
		.button-examples {
			grid-template-columns: 1fr;
		}

		.icon-button-row .button-examples,
		.icon-only-variants .button-examples,
		.icon-only-sizes .button-examples {
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		}
	}
</style>
