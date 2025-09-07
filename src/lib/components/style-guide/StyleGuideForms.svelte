<script lang="ts">
	import Card from '../Card.svelte';
	import { Input, Select, TextArea, InputGroup, Checkbox, Radio, Toggle } from '$lib/components';
	import { IconSearch, IconLightningBolt } from '$lib/icons';

	// Sample data for selects
	const selectOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	// State for interactive examples
	let checkboxStates = {
		simple1: false,
		simple2: true,
		card1: false,
		card2: true,
		toggle1: false,
		toggle2: true
	};

	let radioGroup = 'option1';
	let radioCardGroup = 'card1';
	let radioToggleGroup = 'toggle1';

	let toggleStates = {
		simple1: false,
		simple2: true,
		card1: false,
		card2: true
	};
</script>

<section id="forms" class="section">
	<h2>Form Elements</h2>

	<div class="card-stack">
		<Card title="Input Components">
			<div class="form-grid">
				<div class="form-group">
					<Input id="basic-input" label="Basic Input" placeholder="Enter text here" />
				</div>

				<div class="form-group">
					<Input id="email-input" label="Email Input" type="email" placeholder="Enter email" />
				</div>

				<div class="form-group">
					<Input
						id="search-input"
						label="Search Input"
						type="search"
						placeholder="Search..."
						leftIcon={IconSearch}
					/>
				</div>

				<div class="form-group">
					<Input
						id="help-input"
						label="Input with Help"
						placeholder="Enter value"
						helpIcon={true}
					/>
				</div>

				<div class="form-group">
					<Input
						id="error-input"
						label="Error State"
						placeholder="Enter value"
						error={true}
						errorMessage="This field is required"
						required={true}
					/>
				</div>

				<div class="form-group">
					<Input
						id="disabled-input"
						label="Disabled Input"
						placeholder="Disabled"
						disabled={true}
					/>
				</div>
			</div>
		</Card>

		<Card title="Select Components">
			<div class="form-grid">
				<div class="form-group">
					<Select
						id="basic-select"
						label="Basic Select"
						placeholder="Choose option..."
						options={selectOptions}
					/>
				</div>

				<div class="form-group">
					<Select
						id="select-help"
						label="Select with Help"
						placeholder="Choose option..."
						helpIcon={true}
						options={selectOptions}
					/>
				</div>

				<div class="form-group">
					<Select
						id="select-error"
						label="Select with Error"
						placeholder="Choose option..."
						error={true}
						errorMessage="Please select an option"
						options={selectOptions}
						required={true}
					/>
				</div>
			</div>
		</Card>

		<Card title="TextArea Components">
			<div class="form-grid">
				<div class="form-group">
					<TextArea
						id="basic-textarea"
						label="Basic TextArea"
						placeholder="Enter your message..."
					/>
				</div>

				<div class="form-group">
					<TextArea
						id="textarea-help"
						label="TextArea with Help"
						placeholder="Enter description..."
						helpIcon={true}
						helperText="Maximum 500 characters"
					/>
				</div>

				<div class="form-group">
					<TextArea
						id="textarea-error"
						label="TextArea with Error"
						placeholder="Enter text..."
						error={true}
						errorMessage="Message is too short"
						required={true}
					/>
				</div>
			</div>
		</Card>

		<Card title="Input Groups">
			<div class="form-grid">
				<div class="form-group">
					<label for="currency-input">Currency Input</label>
					<InputGroup>
						<select class="input-group-select">
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
							<option value="GBP">GBP</option>
						</select>
						<input class="input-group-input" type="text" placeholder="0.00" />
					</InputGroup>
				</div>

				<div class="form-group">
					<label for="url-input">URL Input</label>
					<InputGroup>
						<span class="input-group-prefix">https://</span>
						<input class="input-group-input" type="text" placeholder="www.example.com" />
					</InputGroup>
				</div>

				<div class="form-group">
					<label for="email-subscribe">Email Subscribe</label>
					<InputGroup>
						<input class="input-group-input" type="email" placeholder="Enter email" />
						<button class="input-group-button">Subscribe</button>
					</InputGroup>
				</div>
			</div>
		</Card>

		<Card title="Input Sizes">
			<div class="form-grid">
				<div class="form-group">
					<Input size="sm" label="Small Size" placeholder="Small input" />
				</div>

				<div class="form-group">
					<Input size="md" label="Medium Size (Default)" placeholder="Medium input" />
				</div>

				<div class="form-group">
					<Input size="lg" label="Large Size" placeholder="Large input" />
				</div>
			</div>
		</Card>

		<Card title="Checkboxes">
			<div class="form-grid">
				<div class="form-group">
					<h4>Simple Checkboxes</h4>
					<div class="inline-group">
						<Checkbox
							id="checkbox-simple-1"
							label="Checkbox"
							bind:checked={checkboxStates.simple1}
						/>
						<Checkbox
							id="checkbox-simple-2"
							label="Checkbox"
							bind:checked={checkboxStates.simple2}
						/>
					</div>
				</div>

				<div class="form-group">
					<h4>Card Checkboxes</h4>
					<div class="card-stack">
						<Checkbox
							id="checkbox-card-1"
							label="Checkbox"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							variant="card"
							icon={IconLightningBolt}
							bind:checked={checkboxStates.card1}
						/>
						<Checkbox
							id="checkbox-card-2"
							label="Checkbox"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							variant="card"
							icon={IconLightningBolt}
							bind:checked={checkboxStates.card2}
						/>
					</div>
				</div>

				<div class="form-group">
					<h4>Toggle Checkboxes</h4>
					<div class="inline-group">
						<Checkbox
							id="checkbox-toggle-1"
							label="Option one"
							variant="toggle"
							bind:checked={checkboxStates.toggle1}
						/>
						<Checkbox
							id="checkbox-toggle-2"
							label="Option one"
							variant="toggle"
							bind:checked={checkboxStates.toggle2}
						/>
					</div>
				</div>
			</div>
		</Card>

		<Card title="Radio Buttons">
			<div class="form-grid">
				<div class="form-group">
					<h4>Simple Radio Buttons</h4>
					<div class="inline-group">
						<Radio
							id="radio-simple-1"
							label="Radio"
							value="option1"
							name="radioGroup"
							bind:group={radioGroup}
						/>
						<Radio
							id="radio-simple-2"
							label="Radio"
							value="option2"
							name="radioGroup"
							bind:group={radioGroup}
						/>
					</div>
				</div>

				<div class="form-group">
					<h4>Card Radio Buttons</h4>
					<div class="card-stack">
						<Radio
							id="radio-card-1"
							label="Radio button"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							variant="card"
							icon={IconLightningBolt}
							value="card1"
							name="radioCardGroup"
							bind:group={radioCardGroup}
						/>
						<Radio
							id="radio-card-2"
							label="Radio button"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							variant="card"
							icon={IconLightningBolt}
							value="card2"
							name="radioCardGroup"
							bind:group={radioCardGroup}
						/>
					</div>
				</div>

				<div class="form-group">
					<h4>Toggle Radio Buttons</h4>
					<div class="inline-group">
						<Radio
							id="radio-toggle-1"
							label="Website design"
							variant="toggle"
							value="toggle1"
							name="radioToggleGroup"
							bind:group={radioToggleGroup}
						/>
						<Radio
							id="radio-toggle-2"
							label="Website design"
							variant="toggle"
							value="toggle2"
							name="radioToggleGroup"
							bind:group={radioToggleGroup}
						/>
					</div>
				</div>
			</div>
		</Card>

		<Card title="Toggle Switches">
			<div class="form-grid">
				<div class="form-group">
					<h4>Simple Toggles</h4>
					<div class="inline-group">
						<Toggle id="toggle-simple-1" label="Option one" bind:checked={toggleStates.simple1} />
						<Toggle id="toggle-simple-2" label="Option one" bind:checked={toggleStates.simple2} />
					</div>
				</div>

				<div class="form-group">
					<h4>Card Toggles</h4>
					<div class="card-stack">
						<Toggle
							id="toggle-card-1"
							label="Toggle checkbox"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim."
							variant="card"
							bind:checked={toggleStates.card1}
						/>
						<Toggle
							id="toggle-card-2"
							label="Toggle checkbox"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim."
							variant="card"
							bind:checked={toggleStates.card2}
						/>
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

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-6);
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
