<script lang="ts">
	import { modal } from '../stores/modal.js';
	import { Input, TextArea, Select, Button } from '../index.js';

	let formData = {
		name: '',
		email: '',
		message: '',
		priority: ''
	};

	const priorityOptions = [
		{ value: 'low', label: 'Low' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'high', label: 'High' }
	];

	function handleSubmit() {
		// Simulate form submission
		console.log('Form submitted:', formData);
		modal.success('Success!', 'Your message has been sent successfully.');
	}

	function handleCancel() {
		// Reset form and close modal
		formData = { name: '', email: '', message: '', priority: '' };
		modal.close();
	}
</script>

<div class="demo-form">
	<div class="form-group">
		<Input
			id="name"
			label="Name"
			bind:value={formData.name}
			placeholder="Enter your name"
			required
		/>
	</div>

	<div class="form-group">
		<Input
			id="email"
			label="Email"
			type="email"
			bind:value={formData.email}
			placeholder="Enter your email"
			required
		/>
	</div>

	<div class="form-group">
		<Select
			id="priority"
			label="Priority"
			bind:value={formData.priority}
			options={priorityOptions}
			placeholder="Select priority"
		/>
	</div>

	<div class="form-group">
		<TextArea
			id="message"
			label="Message"
			bind:value={formData.message}
			placeholder="Enter your message"
			required
		/>
	</div>

	<div class="form-actions inline-group">
		<Button variant="outline" onclick={handleCancel}>Cancel</Button>
		<Button variant="primary" onclick={handleSubmit}>Send Message</Button>
	</div>
</div>

<style>
	.demo-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-actions {
		justify-content: flex-end;
		margin-top: var(--spacing-4);
		padding-top: var(--spacing-4);
		border-top: 1px solid var(--color-border-primary);
	}

	@media (max-width: 768px) {
		.form-actions {
			flex-direction: column;
		}
	}
</style>
