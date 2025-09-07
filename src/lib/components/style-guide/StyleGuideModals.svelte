<script lang="ts">
	import { Button } from '$lib/components';
	import ModalDemoForm from '$lib/components/ModalDemoForm.svelte';
	import { modal } from '$lib';

	function showBasicModal() {
		modal.open({
			title: 'Welcome to Modal Demo',
			content:
				'This is a basic modal with simple text content. You can close it by clicking the X, pressing Escape, or clicking outside.',
			size: 'md'
		});
	}

	function showConfirmModal() {
		modal.confirm(
			'Delete Item',
			'Are you sure you want to delete this item? This action cannot be undone.',
			() => {
				modal.success('Deleted!', 'The item has been successfully deleted.');
			},
			() => {
				console.log('Cancelled deletion');
			}
		);
	}

	function showFormModal() {
		modal.open({
			title: 'Contact Form',
			component: ModalDemoForm as any,
			size: 'lg'
		});
	}

	function showCustomModal() {
		modal.open({
			title: 'Custom Action Modal',
			content: 'This modal has custom actions and cannot be closed by clicking outside.',
			size: 'sm',
			variant: 'warning',
			closeOnBackdrop: false,
			customActions: [
				{
					label: 'Maybe Later',
					action: () => modal.close(),
					variant: 'outline'
				},
				{
					label: 'Yes, Continue',
					action: () => {
						modal.close();
						modal.success('Great!', 'You chose to continue. Well done!');
					},
					variant: 'primary'
				}
			]
		});
	}

	function showSuccessModal() {
		modal.success(
			'Operation Successful',
			'Your action was completed successfully. This is a success notification modal.'
		);
	}

	function showErrorModal() {
		modal.open({
			title: 'Something went wrong',
			content: 'An error occurred while processing your request. Please try again later.',
			size: 'sm',
			variant: 'danger',
			customActions: [
				{
					label: 'OK',
					action: () => modal.close(),
					variant: 'primary'
				}
			]
		});
	}

	function showWarningModal() {
		modal.open({
			title: 'Warning',
			content: 'This action may have consequences. Please review before proceeding.',
			size: 'sm',
			variant: 'warning',
			customActions: [
				{
					label: 'Got it',
					action: () => modal.close(),
					variant: 'primary'
				}
			]
		});
	}

	function showInfoModal() {
		modal.open({
			title: 'Information',
			content: 'This is an informational modal with some helpful details about the system.',
			size: 'sm',
			variant: 'default',
			customActions: [
				{
					label: 'Close',
					action: () => modal.close(),
					variant: 'primary'
				}
			]
		});
	}

	function showLargeModal() {
		modal.open({
			title: 'Large Modal Example',
			content: `
				<div>
					<p>This is a large modal that demonstrates how content can be displayed in a more spacious format.</p>
					<br>
					<p>Large modals are perfect for:</p>
					<ul>
						<li>Complex forms with multiple sections</li>
						<li>Detailed information displays</li>
						<li>Image galleries or media content</li>
						<li>Multi-step workflows</li>
					</ul>
					<br>
					<p>The modal automatically adjusts its size based on the content and maintains proper spacing and typography throughout.</p>
				</div>
			`,
			size: 'xl'
		});
	}

	function showSmallModal() {
		modal.open({
			title: 'Quick Note',
			content: 'Small modals are perfect for brief messages or simple confirmations.',
			size: 'sm'
		});
	}
</script>

<section id="modals" class="style-section">
	<div class="section-header">
		<h2>Modals</h2>
		<p>Interactive modal dialogs for user engagement and feedback collection.</p>
	</div>

	<div class="demo-group">
		<h3>Basic Modal Types</h3>
		<p>Standard modal dialogs with different content and interaction patterns.</p>

		<div class="modal-grid">
			<div class="modal-demo">
				<h4>Basic Modal</h4>
				<p>Simple content modal with standard close options.</p>
				<Button variant="secondary" onclick={showBasicModal}>Open Basic Modal</Button>
			</div>

			<div class="modal-demo">
				<h4>Confirmation Dialog</h4>
				<p>Confirm or cancel important actions with callbacks.</p>
				<Button variant="secondary" onclick={showConfirmModal}>Show Confirm Dialog</Button>
			</div>

			<div class="modal-demo">
				<h4>Form Modal</h4>
				<p>Interactive forms within modal dialogs.</p>
				<Button variant="secondary" onclick={showFormModal}>Open Form Modal</Button>
			</div>

			<div class="modal-demo">
				<h4>Custom Actions</h4>
				<p>Custom action buttons with backdrop disable.</p>
				<Button variant="secondary" onclick={showCustomModal}>Show Custom Actions</Button>
			</div>
		</div>
	</div>

	<div class="demo-group">
		<h3>Notification Modals</h3>
		<p>Pre-styled modals for different types of notifications and feedback.</p>

		<div class="modal-grid">
			<div class="modal-demo">
				<h4>Success Modal</h4>
				<p>Positive feedback and successful operations.</p>
				<Button variant="success" onclick={showSuccessModal}>Show Success</Button>
			</div>

			<div class="modal-demo">
				<h4>Error Modal</h4>
				<p>Error messages and failure notifications.</p>
				<Button variant="destructive" onclick={showErrorModal}>Show Error</Button>
			</div>

			<div class="modal-demo">
				<h4>Warning Modal</h4>
				<p>Cautionary messages and important alerts.</p>
				<Button variant="warning" onclick={showWarningModal}>Show Warning</Button>
			</div>

			<div class="modal-demo">
				<h4>Info Modal</h4>
				<p>Informational content and helpful tips.</p>
				<Button variant="outline" onclick={showInfoModal}>Show Info</Button>
			</div>
		</div>
	</div>

	<div class="demo-group">
		<h3>Modal Sizes</h3>
		<p>Different modal sizes to accommodate various content types and use cases.</p>

		<div class="modal-grid">
			<div class="modal-demo">
				<h4>Small Modal</h4>
				<p>Compact size for brief messages.</p>
				<Button variant="outline" size="sm" onclick={showSmallModal}>Small Modal</Button>
			</div>

			<div class="modal-demo">
				<h4>Medium Modal</h4>
				<p>Standard size for most content.</p>
				<Button variant="outline" onclick={showBasicModal}>Medium Modal</Button>
			</div>

			<div class="modal-demo">
				<h4>Large Modal</h4>
				<p>Spacious layout for detailed content.</p>
				<Button variant="outline" onclick={showLargeModal}>Large Modal</Button>
			</div>
		</div>
	</div>
</section>

<style>
	.style-section {
		margin-bottom: var(--spacing-16);
		scroll-margin-top: var(--spacing-4);
	}

	.section-header {
		margin-bottom: var(--spacing-8);
		padding-bottom: var(--spacing-6);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.section-header h2 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-3);
		color: var(--color-text-primary);
	}

	.section-header p {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.demo-group {
		margin-bottom: var(--spacing-12);
	}

	.demo-group h3 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--spacing-3);
		color: var(--color-text-primary);
	}

	.demo-group > p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-6);
		line-height: var(--line-height-relaxed);
	}

	.modal-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-6);
	}

	.modal-demo {
		padding: var(--spacing-6);
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.modal-demo h4 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--spacing-2);
		color: var(--color-text-primary);
	}

	.modal-demo p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-4);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.modal-grid {
			grid-template-columns: 1fr;
		}

		.modal-demo {
			padding: var(--spacing-4);
		}
	}
</style>
