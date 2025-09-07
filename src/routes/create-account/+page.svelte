<script lang="ts">
	import { Button, Head, Input, AvatarSelector } from '$lib/components';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let { user, supabase, profile, suggestedStep } = $derived(data);

	let currentStep = $state(suggestedStep || 1);
	const totalSteps = 4; // Reduced from 5 to 4 steps
	let isAdvancing = $state(false);

	let errors = $state({
		name: '',
		phone: '',
		dob: '',
		avatar: ''
	});
	
	// Form data state (reactive)
	let formData = $state({
		name: '',
		phone: '',
		dob: '',
		avatar_id: 1
	});

	// Check if user is authenticated (required for profile completion)
	let isAuthenticated = $derived(!!user);

	// Check if current step is valid and complete
	let canAdvance = $derived(() => {
		switch (currentStep) {
			case 1:
				// Step 1: Must have name
				return formData.name.trim().length > 0;
			case 2:
				// Step 2: Must have phone
				return formData.phone.trim().length > 0;
			case 3:
				// Step 3: Must have date of birth
				return formData.dob.trim().length > 0;
			case 4:
				// Step 4: Must have avatar selected
				return formData.avatar_id >= 1 && formData.avatar_id <= 25;
			default:
				return false;
		}
	});

	function validateCurrentStep(): boolean {
		// Clear previous errors
		errors = {
			name: '',
			phone: '',
			dob: '',
			avatar: ''
		};

		let isValid = true;

		switch (currentStep) {
			case 1:
				if (!formData.name.trim()) {
					errors.name = 'Full name is required';
					isValid = false;
				}
				break;
			case 2:
				if (!formData.phone.trim()) {
					errors.phone = 'Phone number is required';
					isValid = false;
				}
				break;
			case 3:
				if (!formData.dob.trim()) {
					errors.dob = 'Date of birth is required';
					isValid = false;
				}
				break;
			case 4:
				if (!formData.avatar_id || formData.avatar_id < 1 || formData.avatar_id > 25) {
					errors.avatar = 'Please select an avatar';
					isValid = false;
				}
				break;
		}

		return isValid;
	}

	async function handleCta() {
		if (isAdvancing) return;

		// Validate current step
		if (!validateCurrentStep()) {
			return;
		}

		isAdvancing = true;

		// Save profile data for all steps
		if (isAuthenticated) {
			await saveProfileData();
		}

		if (currentStep < totalSteps) {
			currentStep += 1;
			setTimeout(() => (isAdvancing = false), 200);
			return;
		}
		
		// Final step - complete account creation and mark profile as completed
		if (isAuthenticated) {
			// Validate all fields are filled before marking complete
			if (formData.name && formData.phone && formData.dob && formData.avatar_id) {
				console.log('All required fields filled, marking profile as complete');
				await saveProfileData(true); // Mark profile setup as completed
			} else {
				console.error('Cannot complete profile - missing required fields:', {
					name: !!formData.name,
					phone: !!formData.phone,
					dob: !!formData.dob,
					avatar_id: !!formData.avatar_id
				});
				await saveProfileData(false); // Save what we have but don't mark complete
			}
		}
		goto('/dashboard');
	}

	async function saveProfileData(markCompleted = false) {
		if (!user?.id) {
			console.error('No user ID available for profile save');
			return;
		}

		try {
			const profileData = {
				id: user.id,
				full_name: formData.name || null,
				phone: formData.phone || null,
				dob: formData.dob || null,
				avatar_id: formData.avatar_id || 1,
				profile_complete: markCompleted || undefined // Only set when marking as complete
			};

			// For final completion, save all fields
			// For intermediate steps, only save non-empty fields
			const updateData = markCompleted 
				? profileData // Save everything on final step
				: Object.fromEntries(
					Object.entries(profileData).filter(([key, value]) => {
						if (key === 'id') return true; // Always include id
						return value !== null && value !== '' && value !== undefined;
					})
				);

			console.log('Saving profile data (markCompleted:', markCompleted, '):', updateData);

			const { error } = await supabase
				.from('users')
				.upsert(updateData, { 
					onConflict: 'id',
					ignoreDuplicates: false 
				});

			if (error) {
				console.error('Profile save error:', error);
			} else {
				console.log('Profile saved successfully');
				if (markCompleted) {
					console.log('✓ Profile marked as complete with all fields filled');
				}
			}
		} catch (error) {
			console.error('Profile save error:', error);
		}
	}

	// Auto-populate form data with existing profile information
	$effect(() => {
		// Populate form with existing profile data
		if (profile) {
			if (profile.full_name && !formData.name) {
				formData.name = profile.full_name;
			}
			if (profile.phone && !formData.phone) {
				formData.phone = profile.phone;
			}
			if (profile.dob && !formData.dob) {
				formData.dob = profile.dob;
			}
			if (profile.avatar_id && !formData.avatar_id) {
				formData.avatar_id = profile.avatar_id;
			}
		}
	});

	$effect(() => {
		if (currentStep < 1) currentStep = 1;
		if (currentStep > totalSteps) currentStep = totalSteps;
	});
</script>

<Head title="Complete Profile" description="Complete your profile in a few quick steps" />

<section class="section">
	<div class="container">
		<div class="content">
			<h1>Complete your profile</h1>
			<p>Step {currentStep} of {totalSteps}</p>
			
			<div class="progress-indicator">
				{#each Array(totalSteps) as _, index}
					<div class="progress-dot" class:active={index + 1 <= currentStep}></div>
				{/each}
			</div>

			{#key currentStep}
				{#if currentStep === 1}
					<div class="step">
						<Input 
							id="name" 
							label="Full Name" 
							placeholder="Ada Lovelace" 
							bind:value={formData.name}
							error={!!errors.name}
							errorMessage={errors.name}
							required 
						/>
					</div>
				{:else if currentStep === 2}
					<div class="step">
						<Input 
							id="phone" 
							label="Phone Number" 
							type="tel" 
							placeholder="+1 (555) 123-4567" 
							bind:value={formData.phone}
							error={!!errors.phone}
							errorMessage={errors.phone}
							required
						/>
					</div>
				{:else if currentStep === 3}
					<div class="step">
						<Input 
							id="dob" 
							label="Date of Birth" 
							type="date" 
							bind:value={formData.dob}
							error={!!errors.dob}
							errorMessage={errors.dob}
							required
						/>
					</div>
				{:else if currentStep === 4}
					<div class="step">
						<AvatarSelector 
							bind:value={formData.avatar_id}
							error={!!errors.avatar}
							errorMessage={errors.avatar}
						/>
					</div>
				{/if}
			{/key}

			<div class="cta">
				<Button 
					variant="primary" 
					size="lg" 
					onclick={handleCta} 
					disabled={isAdvancing || !canAdvance() || !isAuthenticated}
				>
					{currentStep === totalSteps ? 'Complete Profile' : 'Continue'}
				</Button>
			</div>

			{#if !isAuthenticated}
				<div class="auth-required">
					<p>Please <a href="/login">sign in</a> to complete your profile.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	:global(html), :global(body) {
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		margin: 0;
		padding: 0;
	}

	.section {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: var(--spacing-6);
		position: relative;
	}

	/* Ensure proper scrolling on very short screens */
	@media (max-height: 800px) {
		.section {
			align-items: flex-start;
			padding-top: var(--spacing-8);
			padding-bottom: var(--spacing-8);
		}
	}

	@media (max-height: 700px) {
		.section {
			padding-top: var(--spacing-6);
			padding-bottom: var(--spacing-6);
		}
	}

	@media (max-height: 600px) {
		.section {
			padding-top: var(--spacing-4);
			padding-bottom: var(--spacing-4);
		}
		
		.container {
			padding: var(--spacing-8);
		}
	}

	@media (max-height: 500px) {
		.section {
			padding-top: var(--spacing-3);
			padding-bottom: var(--spacing-3);
		}
		
		.container {
			padding: var(--spacing-6);
		}
	}

	.section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
		pointer-events: none;
	}

	.container {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		box-shadow: 
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04),
			0 0 0 1px rgba(255, 255, 255, 0.2);
		padding: var(--spacing-10);
		width: 100%;
		max-width: 500px;
		position: relative;
		z-index: 1;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.content {
		text-align: center;
		color: #0f172a;
	}

	.content h1 {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-weight: 700;
		margin-bottom: var(--spacing-2);
		color: #0f172a;
		letter-spacing: -0.02em;
	}

	.content p {
		color: #64748b;
		margin-bottom: var(--spacing-6);
		font-size: clamp(1rem, 2.5vw, 1.125rem);
		font-weight: 500;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		display: inline-block;
	}

	.progress-indicator {
		display: flex;
		justify-content: center;
		gap: var(--spacing-2);
		margin-bottom: var(--spacing-8);
	}

	.progress-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(148, 163, 184, 0.3);
		border: 2px solid rgba(148, 163, 184, 0.3);
		transition: all 0.3s ease;
	}

	.progress-dot.active {
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		border-color: transparent;
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.step {
		margin: var(--spacing-8) 0;
		padding: var(--spacing-6);
		background: rgba(248, 250, 252, 0.6);
		border-radius: 16px;
		border: 1px solid rgba(226, 232, 240, 0.8);
	}

	.cta {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-8);
	}

	.auth-required {
		margin-top: var(--spacing-6);
		padding: var(--spacing-4);
		background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
		border-radius: 12px;
		border: 1px solid rgba(251, 146, 60, 0.3);
	}

	.auth-required p {
		color: #92400e;
		font-size: 0.875rem;
		font-weight: 600;
		margin: 0;
	}

	.auth-required a {
		color: #ea580c;
		text-decoration: none;
		font-weight: 700;
	}

	.auth-required a:hover {
		text-decoration: underline;
	}

	/* Responsive design */
	@media (max-width: 480px) {
		.container {
			padding: var(--spacing-6);
			margin: var(--spacing-4);
		}

		.content h1 {
			font-size: 1.5rem;
		}

		.content p {
			font-size: 1rem;
		}

		.step {
			padding: var(--spacing-4);
		}
	}


</style>
