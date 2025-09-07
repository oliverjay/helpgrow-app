<script lang="ts">
	import Card from '../Card.svelte';
</script>

<section id="colors" class="section">
	<h2>Colors</h2>

	<div class="card-stack">
		<Card title="Primary Colors">
			<div class="color-grid">
				<div class="color-card" style="background-color: var(--color-primary-darker);">
					<span>Primary Darker</span>
				</div>
				<div class="color-card" style="background-color: var(--color-primary-dark);">
					<span>Primary Dark</span>
				</div>
				<div class="color-card" style="background-color: var(--color-primary);">
					<span>Primary</span>
				</div>
				<div class="color-card" style="background-color: var(--color-primary-light);">
					<span>Primary Light</span>
				</div>
				<div class="color-card" style="background-color: var(--color-primary-lighter);">
					<span>Primary Lighter</span>
				</div>
			</div>
		</Card>

		<Card title="Secondary Colors">
			<div class="color-grid">
				<div class="color-card" style="background-color: var(--color-secondary-darker);">
					<span>Secondary Darker</span>
				</div>
				<div class="color-card" style="background-color: var(--color-secondary-dark);">
					<span>Secondary Dark</span>
				</div>
				<div class="color-card" style="background-color: var(--color-secondary);">
					<span>Secondary</span>
				</div>
				<div class="color-card" style="background-color: var(--color-secondary-light);">
					<span>Secondary Light</span>
				</div>
				<div class="color-card" style="background-color: var(--color-secondary-lighter);">
					<span>Secondary Lighter</span>
				</div>
			</div>
		</Card>

		<Card title="Accent & Status Colors">
			<div class="color-grid">
				<div class="color-card" style="background-color: var(--color-accent);">
					<span>Accent</span>
				</div>
				<div class="color-card" style="background-color: var(--color-success);">
					<span>Success</span>
				</div>
				<div class="color-card" style="background-color: var(--color-warning);">
					<span>Warning</span>
				</div>
				<div class="color-card" style="background-color: var(--color-error);">
					<span>Error</span>
				</div>
			</div>
		</Card>

		<Card title="Neutral Colors">
			<div class="color-grid">
				<div class="color-card" style="background-color: var(--color-gray-900);">
					<span>Gray 900</span>
				</div>
				<div class="color-card" style="background-color: var(--color-gray-700);">
					<span>Gray 700</span>
				</div>
				<div class="color-card" style="background-color: var(--color-gray-500);">
					<span>Gray 500</span>
				</div>
				<div class="color-card" style="background-color: var(--color-gray-300);">
					<span>Gray 300</span>
				</div>
				<div class="color-card" style="background-color: var(--color-gray-100);">
					<span>Gray 100</span>
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

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: var(--spacing-4);
	}

	.color-card {
		padding: var(--spacing-4);
		border-radius: var(--radius-md);
		text-align: center;
		color: var(--color-text-inverse);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		min-height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.color-grid {
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		}
	}
</style>
