<script lang="ts">
	import Card from '../Card.svelte';
</script>

<section id="spacing" class="section">
	<h2>Spacing & Layout</h2>

	<div class="card-stack">
		<Card
			title="Spacing System"
			description="Our spacing system follows a consistent scale using rem units for accessibility and scalability."
		>
			<div class="spacing-showcase">
				<div class="spacing-scale">
					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-0); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-0</div>
							<div class="spacing-value">0</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-px); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-px</div>
							<div class="spacing-value">1px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-1); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-1</div>
							<div class="spacing-value">4px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-2); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-2</div>
							<div class="spacing-value">8px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-3); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-3</div>
							<div class="spacing-value">12px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-4); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-4</div>
							<div class="spacing-value">16px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-5); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-5</div>
							<div class="spacing-value">20px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-6); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-6</div>
							<div class="spacing-value">24px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-8); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-8</div>
							<div class="spacing-value">32px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-10); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-10</div>
							<div class="spacing-value">40px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-12); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-12</div>
							<div class="spacing-value">48px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-16); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-16</div>
							<div class="spacing-value">64px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-20); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-20</div>
							<div class="spacing-value">80px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-24); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-24</div>
							<div class="spacing-value">96px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-32); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-32</div>
							<div class="spacing-value">128px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-40); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-40</div>
							<div class="spacing-value">160px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-48); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-48</div>
							<div class="spacing-value">192px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-56); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-56</div>
							<div class="spacing-value">224px</div>
						</div>
					</div>

					<div class="spacing-item">
						<div class="spacing-visual">
							<div
								class="spacing-box-inner"
								style="width: var(--spacing-64); height: var(--spacing-4);"
							></div>
						</div>
						<div class="spacing-details">
							<div class="spacing-token">--spacing-64</div>
							<div class="spacing-value">256px</div>
						</div>
					</div>
				</div>
			</div>
		</Card>

		<Card
			title="Border Radius"
			description="Consistent border radius values for creating cohesive UI elements."
		>
			<div class="radius-showcase">
				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-none);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-none</div>
						<div class="radius-value">0</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-sm);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-sm</div>
						<div class="radius-value">2px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-base);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-base</div>
						<div class="radius-value">4px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-md);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-md</div>
						<div class="radius-value">6px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-lg);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-lg</div>
						<div class="radius-value">8px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-xl);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-xl</div>
						<div class="radius-value">12px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-2xl);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-2xl</div>
						<div class="radius-value">16px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-3xl);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-3xl</div>
						<div class="radius-value">24px</div>
					</div>
				</div>

				<div class="radius-item">
					<div class="radius-visual" style="border-radius: var(--radius-full);"></div>
					<div class="radius-details">
						<div class="radius-token">--radius-full</div>
						<div class="radius-value">9999px</div>
					</div>
				</div>
			</div>
		</Card>

		<Card
			title="Shadows"
			description="Elevation system using box shadows to create depth and hierarchy."
		>
			<div class="shadow-showcase">
				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-sm);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-sm</div>
						<div class="shadow-description">Small shadow for subtle elevation</div>
					</div>
				</div>

				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-base);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-base</div>
						<div class="shadow-description">Base shadow for cards and panels</div>
					</div>
				</div>

				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-md);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-md</div>
						<div class="shadow-description">Medium shadow for hover states</div>
					</div>
				</div>

				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-lg);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-lg</div>
						<div class="shadow-description">Large shadow for dropdowns</div>
					</div>
				</div>

				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-xl);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-xl</div>
						<div class="shadow-description">Extra large shadow for modals</div>
					</div>
				</div>

				<div class="shadow-item">
					<div class="shadow-visual" style="box-shadow: var(--shadow-2xl);"></div>
					<div class="shadow-details">
						<div class="shadow-token">--shadow-2xl</div>
						<div class="shadow-description">Maximum shadow for overlays</div>
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

	.spacing-showcase {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-6);
	}

	.spacing-scale {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-4);
	}

	.spacing-item {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.spacing-item:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.spacing-visual {
		flex-shrink: 1;
		width: 100%;
		height: var(--spacing-4);
		background-color: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: var(--spacing-1);
		overflow: hidden;
	}

	.spacing-box-inner {
		background-color: var(--color-primary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-base);
	}

	.spacing-details {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: var(--spacing-1);
	}

	.spacing-token {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.spacing-value {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	/* Border Radius Showcase */
	.radius-showcase {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: var(--spacing-4);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-6);
	}

	.radius-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.radius-item:hover {
		border-color: var(--color-border-secondary);
		box-shadow: var(--shadow-sm);
	}

	.radius-visual {
		width: 64px;
		height: 64px;
		background-color: var(--color-secondary);
		border: 2px solid var(--color-secondary-dark);
		transition: all var(--transition-base);
	}

	.radius-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-1);
	}

	.radius-token {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.radius-value {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	/* Shadow Showcase */
	.shadow-showcase {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-6);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-8);
	}

	.shadow-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-6);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
	}

	.shadow-visual {
		width: 80px;
		height: 80px;
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
	}

	.shadow-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2);
		text-align: center;
	}

	.shadow-token {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.shadow-description {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		line-height: 1.4;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.spacing-scale {
			grid-template-columns: 1fr;
		}

		.radius-showcase {
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}

		.shadow-showcase {
			grid-template-columns: 1fr;
		}
	}
</style>
