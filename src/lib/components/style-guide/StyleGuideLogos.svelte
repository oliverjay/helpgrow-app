<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { Logo } from '$lib/icons';
</script>

<section id="logos" class="section">
	<h2>Logos & Brand Assets</h2>
	<div class="card-stack">
		<Card title="Logo Guidelines">
			<div class="logo-grid">
				<div class="logo-placeholder">
					<div class="logo-box">
						<Logo size={60} />
					</div>
					<p>Primary Logo</p>
				</div>
				<div class="logo-placeholder">
					<div class="logo-box light">
						<Logo size={60} />
					</div>
					<p>Light Background</p>
				</div>
				<div class="logo-placeholder">
					<div class="logo-box dark">
						<Logo size={60} />
					</div>
					<p>Dark Background</p>
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

	.logo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-6);
	}

	.logo-placeholder {
		text-align: center;
	}

	.logo-box {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-6);
		border-radius: var(--radius-lg);
		margin-bottom: var(--spacing-3);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
	}

	.logo-box.light {
		background-color: var(--color-white);
	}

	.logo-box.dark {
		background-color: var(--color-gray-900);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.logo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
