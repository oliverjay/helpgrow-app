<script lang="ts">
	import { Button, Card, Input, Toggle, Head } from '$lib/components';
	import { IconSettings } from '$lib/icons';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { data, form } = $props();
	let { profile } = $derived(data);

	// Get current notification preferences with defaults
	let preferences = $derived(profile?.notification_preferences || {
		email_notifications: true,
		sms_notifications: false,
		milestone_notifications: true
	});

	let isUpdatingNotifications = $state(false);
	let isUpdatingPhone = $state(false);
	let isUpdatingProfile = $state(false);
	let showSuccess = $state(false);
	let phoneNumber = $state(profile?.phone || '');
	let fullName = $state(profile?.full_name || '');

	// Update form values when profile data changes
	$effect(() => {
		if (profile) {
			phoneNumber = profile.phone || '';
			fullName = profile.full_name || '';
			console.log('Profile data loaded:', {
				profile,
				phoneNumber,
				fullName
			});
		}
	});

	// Auto-toggle SMS notifications when phone number is provided/removed
	$effect(() => {
		if (phoneNumber && phoneNumber.trim() !== '' && !preferences.sms_notifications) {
			// Auto-enable SMS notifications when phone number is added
			// This will be saved when the user updates their phone number
		}
	});

	// Show success message temporarily
	$effect(() => {
		if (form?.success) {
			showSuccess = true;
			setTimeout(() => {
				showSuccess = false;
			}, 3000);
		}
	});
</script>

<Head 
	title="Settings - HelpGrow" 
	description="Manage your notification preferences and account settings"
/>

<div class="settings-container">
	<div class="settings-header">
		<div class="header-content">
			<IconSettings width={32} height={32} />
			<div>
				<h1>Settings</h1>
				<p>Manage your notification preferences and account details</p>
			</div>
		</div>
	</div>

	{#if showSuccess}
		<div class="success-banner">
			<span>✅ Settings updated successfully!</span>
		</div>
	{/if}

	{#if form?.error}
		<div class="error-banner">
			<span>❌ {form.error}</span>
		</div>
	{/if}

	<div class="settings-grid">
		<!-- Notification Preferences -->
		<Card>
			<div class="card-header">
				<h2>📧 Notification Preferences</h2>
				<p>Choose how you'd like to be notified about your survey responses</p>
			</div>

			<form 
				method="POST" 
				action="?/updateNotifications"
				use:enhance={() => {
					isUpdatingNotifications = true;
					return async ({ update }) => {
						await update();
						isUpdatingNotifications = false;
					};
				}}
			>
				<div class="preferences-grid">
					<div class="preference-item">
						<div class="preference-info">
							<h3>🎉 Milestone Notifications</h3>
							<p>Get notified when you receive your 1st, 2nd, and 3rd survey responses</p>
						</div>
						<Toggle 
							name="milestone_notifications" 
							checked={preferences.milestone_notifications}
						/>
					</div>

					<div class="preference-item">
						<div class="preference-info">
							<h3>📨 Email Notifications</h3>
							<p>Receive notifications via email</p>
						</div>
						<Toggle 
							name="email_notifications" 
							checked={preferences.email_notifications}
						/>
					</div>

					<div class="preference-item">
						<div class="preference-info">
							<h3>📱 SMS Notifications</h3>
							<p>Receive notifications via text message (requires phone number)</p>
						</div>
						<Toggle 
							name="sms_notifications" 
							checked={preferences.sms_notifications}
						/>
					</div>


				</div>

				<div class="card-actions">
					<Button 
						type="submit" 
						variant="primary"
						disabled={isUpdatingNotifications}
					>
						{isUpdatingNotifications ? 'Saving...' : 'Save Notification Preferences'}
					</Button>
				</div>
			</form>
		</Card>

		<!-- Phone Number -->
		<Card>
			<div class="card-header">
				<h2>📱 Phone Number</h2>
				<p>Add your phone number to receive SMS notifications</p>
			</div>

			<form 
				method="POST" 
				action="?/updatePhone"
				use:enhance={() => {
					isUpdatingPhone = true;
					return async ({ update }) => {
						await update();
						isUpdatingPhone = false;
					};
				}}
			>
				<div class="phone-section">
					<Input
						name="phone"
						type="tel"
						placeholder="+1 (555) 123-4567"
						bind:value={phoneNumber}
						label="Phone Number"
						required={false}
					/>
					<p class="phone-note">
						📞 SMS notifications will only work if you provide a valid phone number and enable SMS notifications above.
					</p>
				</div>

				<div class="card-actions">
					<Button 
						type="submit" 
						variant="secondary"
						disabled={isUpdatingPhone}
					>
						{isUpdatingPhone ? 'Updating...' : 'Update Phone Number'}
					</Button>
				</div>
			</form>
		</Card>

		<!-- Account Info -->
		<Card>
			<div class="card-header">
				<h2>👤 Account Information</h2>
				<p>Your basic account details</p>
			</div>

			<form 
				method="POST" 
				action="?/updateProfile"
				use:enhance={() => {
					isUpdatingProfile = true;
					return async ({ update }) => {
						await update();
						isUpdatingProfile = false;
					};
				}}
			>
				<div class="profile-section">
					<Input
						name="full_name"
						type="text"
						placeholder="Enter your full name"
						bind:value={fullName}
						label="Full Name"
						required={false}
					/>
					
					<div class="info-item">
						<label>Email</label>
						<span>{profile?.email || data.user?.email || 'Not available'}</span>
					</div>
				</div>

				<div class="card-actions">
					<Button 
						type="submit" 
						variant="secondary"
						disabled={isUpdatingProfile}
					>
						{isUpdatingProfile ? 'Updating...' : 'Update Profile'}
					</Button>
				</div>
			</form>
		</Card>
	</div>
</div>

<style>
	.settings-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: 100vh;
	}

	.settings-header {
		margin-bottom: 2rem;
		margin-top: 3rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.header-content h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.header-content p {
		margin: 0.25rem 0 0 0;
		color: var(--text-secondary);
	}

	.success-banner, .error-banner {
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	.success-banner {
		background: linear-gradient(135deg, #ecfdf5, #d1fae5);
		color: #065f46;
		border: 1px solid #a7f3d0;
	}

	.error-banner {
		background: linear-gradient(135deg, #fef2f2, #fecaca);
		color: #991b1b;
		border: 1px solid #fca5a5;
	}

	.settings-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.card-header {
		margin-bottom: 1.5rem;
	}

	.card-header h2 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.card-header p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.preferences-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.preference-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		background: var(--bg-secondary);
	}

	.preference-info h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.preference-info p {
		margin: 0;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.phone-section, .profile-section {
		margin-bottom: 2rem;
	}

	.phone-note {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-style: italic;
	}

	.account-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		background: var(--bg-secondary);
	}

	.info-item label {
		font-weight: 500;
		color: var(--text-primary);
	}

	.info-item span {
		color: var(--text-secondary);
	}

	.card-actions {
		display: flex;
		justify-content: flex-start;
	}

	@media (max-width: 768px) {
		.settings-container {
			padding: 1rem;
		}

		.header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.preference-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.info-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style> 