<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import Dropdown from './Dropdown.svelte';
	import Button from './Button.svelte';
	import { IconDashboard, IconLogout, IconSettings } from '$lib/icons';
	import { modal } from '$lib/stores/modal';

	let { className = '' } = $props();

	// Get user data and supabase client from page data
	let user = $derived($page.data.user);
	let supabase = $derived($page.data.supabase);
	let isOpen = $state(false);
	
	// User profile state
	let userProfile = $state<{full_name?: string, avatar_id?: number} | null>(null);

	// Get user display info
	let userDisplayName = $derived(
		userProfile?.full_name ||
			user?.user_metadata?.full_name ||
			user?.user_metadata?.name ||
			user?.email?.split('@')[0] ||
			'User'
	);

	// Get avatar - prioritize custom avatar, fallback to OAuth avatar
	let userAvatar = $derived.by(() => {
		const customAvatar = userProfile?.avatar_id ? `/avatars/${userProfile.avatar_id}.webp` : null;
		const oauthAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
		const finalAvatar = customAvatar || oauthAvatar;
		
		console.log('ProfileDropdown: Avatar calculation:', {
			userProfile,
			avatar_id: userProfile?.avatar_id,
			customAvatar,
			oauthAvatar,
			finalAvatar
		});
		
		return finalAvatar;
	});

	// Generate avatar initials if no image
	let avatarInitials = $derived(
		userDisplayName
			.split(' ')
			.map((name: string) => name[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);

	// Fetch user profile data
	$effect(() => {
		if (user?.id && supabase) {
			(async () => {
				try {
					// Try to get profile with avatar_id, fallback to gender if needed
					let { data, error } = await supabase
						.from('users')
						.select('full_name, avatar_id')
						.eq('id', user.id)
						.single();
					
					// If avatar_id column doesn't exist, try with gender field
					if (error && error.message?.includes('column')) {
						const { data: fallbackData } = await supabase
							.from('users')
							.select('full_name, gender')
							.eq('id', user.id)
							.single();
						
						// Convert to expected format
						data = fallbackData ? {
							...fallbackData,
							avatar_id: fallbackData.gender ? 1 : undefined
						} : null;
					}
					
									userProfile = data;
				console.log('ProfileDropdown: Loaded user profile:', data);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
			})();
		}
	});

	// Refresh profile data when dropdown opens
	$effect(() => {
		if (isOpen && user?.id && supabase && !userProfile) {
			// Refresh profile data when dropdown opens if not already loaded
			(async () => {
				try {
					let { data, error } = await supabase
						.from('users')
						.select('full_name, avatar_id')
						.eq('id', user.id)
						.single();
					
					if (error && error.message?.includes('column')) {
						const { data: fallbackData } = await supabase
							.from('users')
							.select('full_name, gender')
							.eq('id', user.id)
							.single();
						
						data = fallbackData ? {
							...fallbackData,
							avatar_id: fallbackData.gender ? 1 : undefined
						} : null;
					}
					
					if (data) {
						userProfile = data;
						console.log('ProfileDropdown: Refreshed profile on dropdown open:', data);
					}
				} catch (error) {
					console.error('Error refreshing profile on dropdown open:', error);
				}
			})();
		}
	});

	// Close dropdown when navigating
	function closeDropdown() {
		isOpen = false;
	}

	// Handle logout confirmation
	function handleLogout() {
		closeDropdown();
		modal.confirm(
			'Confirm Logout',
			'Are you sure you want to log out? You will need to sign in again to access your account.',
			async () => {
				// Perform logout using the same supabase client as the layout
				try {
					const { error } = await supabase.auth.signOut();
					if (error) {
						console.error('Logout error:', error);
					}
					
					// Clear all local storage and session storage as backup
					localStorage.clear();
					sessionStorage.clear();
					
					// Invalidate all data to force refresh
					await invalidateAll();
					
					// Force a hard redirect to ensure session is cleared
					window.location.href = '/';
				} catch (error) {
					console.error('Logout failed:', error);
					// Clear storage even if auth fails
					localStorage.clear();
					sessionStorage.clear();
					// Fallback: try server-side logout
					window.location.href = '/logout';
				}
			}
		);
	}
</script>

<Dropdown bind:isOpen position="bottom-right" {className}>
	{#snippet trigger()}
		<button class="profile-trigger" aria-label="Open user menu">
			<div class="avatar">
				{#if userAvatar}
					<img src={userAvatar} alt={userDisplayName} class="avatar-image" />
				{:else}
					<span class="avatar-initials">{avatarInitials}</span>
				{/if}
			</div>
			<!-- <span class="username">{userDisplayName}</span> -->
			<svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	{/snippet}

	{#snippet children()}
		<!-- User info header -->
		<div class="profile-header">
			<div class="avatar-large">
				{#if userAvatar}
					<img src={userAvatar} alt={userDisplayName} class="avatar-image" />
				{:else}
					<span class="avatar-initials">{avatarInitials}</span>
				{/if}
			</div>
			<div class="user-info">
				<div class="user-name">{userDisplayName}</div>
				<div class="user-email">{user?.email}</div>
			</div>
		</div>

		<div class="dropdown-separator"></div>

		<!-- Menu items -->
		<div class="dropdown-button">
			<Button
				href="/dashboard"
				variant="ghost"
				size="sm"
				icon={IconDashboard}
				iconPosition="left"
				onclick={closeDropdown}
				width="100%"
			>
				Dashboard
			</Button>
		</div>

		<div class="dropdown-button">
			<Button
				href="/settings"
				variant="ghost"
				size="sm"
				icon={IconSettings}
				iconPosition="left"
				onclick={closeDropdown}
				width="100%"
			>
				Settings
			</Button>
		</div>

		<div class="dropdown-separator"></div>

		<!-- Logout button -->
		<div class="dropdown-button">
			<Button
				variant="destructive"
				alternate={true}
				size="sm"
				icon={IconLogout}
				iconPosition="left"
				width="100%"
				onclick={handleLogout}
			>
				Logout
			</Button>
		</div>
	{/snippet}
</Dropdown>

<style>
	.profile-trigger {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2);
		background: none;
		border: none;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		color: var(--color-text);
	}

	.profile-trigger:hover {
		background: var(--color-bg-secondary);
	}

	/* Avatar */
	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		overflow: hidden;
		background: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar-large {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		overflow: hidden;
		background: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-initials {
		color: white;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
	}

	.avatar-large .avatar-initials {
		font-size: var(--font-size-base);
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		transition: transform var(--transition-fast);
		color: var(--color-text-secondary);
	}

	.profile-trigger:hover .chevron {
		transform: rotate(180deg);
	}

	/* Profile header */
	.profile-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3) var(--spacing-2);
	}

	.user-info {
		flex: 1;
		min-width: 0;
	}

	.user-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
	}

	.user-email {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	/* Dropdown button wrapper */
	.dropdown-button {
		display: contents;
	}

	/* Override button styles within dropdown */
	.dropdown-button :global(.btn) {
		justify-content: flex-start;
		padding: var(--spacing-3) var(--spacing-4);
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-medium);
		text-align: left;
	}

	.dropdown-button :global(.btn:hover) {
		background: var(--color-bg-secondary);
		transform: none;
	}

	.dropdown-button :global(.btn-destructive:hover) {
		background: var(--color-error);
		color: var(--color-white);
	}
</style>
