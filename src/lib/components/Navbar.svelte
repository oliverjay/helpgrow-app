<script lang="ts">
	import { page } from '$app/stores';
	import { Button, DarkModeToggle, ProfileDropdown } from '$lib/components';
	import { Logo } from '$lib/icons';
	import { APP_NAME } from '$lib/constants/appConfig.js';

	let { className = '' } = $props();

	// Mobile menu state
	let mobileMenuOpen = $state(false);

	// Auth state
	let user = $derived($page.data.user);
	let isAuthenticated = $derived(!!user);

	// Navigation items - simplified
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/style-guide', label: 'Style Guide' }
	];

	// Close mobile menu when clicking outside
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	// Handle mobile menu toggle
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Check if current route is active
	function isActiveRoute(href: string, currentPath: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<nav class={`navbar ${className}`}>
	<div class="navbar-container">
		<!-- Logo and brand -->
		<div class="navbar-brand">
			<a href="/" class="brand-link">
				<Logo width={120} height={36} className="brand-logo" />
			</a>
		</div>


		<!-- Desktop actions -->
		<div class="navbar-actions">
			{#if isAuthenticated}
				<ProfileDropdown />
			{:else}
				<Button href="/login" variant="ghost" size="sm">Login</Button>
			{/if}
		</div>



	</div>

</nav>

<style>
	.navbar {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--color-border);
		transition: all 0.3s ease;
	}

	:global(.dark) .navbar {
		background: rgba(17, 24, 39, 0.9);
		border-bottom-color: var(--color-border-dark);
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 3rem;
		min-height: 3rem;
	}

	/* Brand */
	.navbar-brand {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		height: 100%;
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-text);
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		transition: color 0.2s ease;
		height: 100%;
	}

	.brand-link:hover {
		color: var(--color-primary);
	}

	.brand-logo {
		transition: transform 0.2s ease;
		display: block;
		vertical-align: middle;
	}

	.brand-link:hover .brand-logo {
		transform: scale(1.05);
	}

	.brand-name {
		white-space: nowrap;
	}

	/* Desktop navigation */
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-link {
		text-decoration: none;
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-sm);
		padding: 0.5rem 0;
		position: relative;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-primary);
		border-radius: 1px;
	}

	/* Desktop actions */
	.desktop-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	/* Mobile menu button */
	.mobile-menu-btn {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		gap: 0.2rem;
	}

	.hamburger-line {
		width: 1.25rem;
		height: 1.5px;
		background: var(--color-text);
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.hamburger-line.open:nth-child(1) {
		transform: rotate(45deg) translate(0.375rem, 0.375rem);
	}

	.hamburger-line.open:nth-child(2) {
		opacity: 0;
	}

	.hamburger-line.open:nth-child(3) {
		transform: rotate(-45deg) translate(0.375rem, -0.375rem);
	}

	/* Mobile menu */
	.mobile-menu {
		position: fixed;
		top: 3rem;
		right: 0;
		width: 100%;
		max-width: 20rem;
		height: calc(100vh - 3rem);
		background: var(--color-background);
		border-left: 1px solid var(--color-border);
		transform: translateX(100%);
		transition: transform 0.3s ease;
		z-index: 40;
		animation: slideIn 0.3s ease forwards;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-menu-content {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		height: 100%;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.mobile-nav-link {
		text-decoration: none;
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-base);
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-border);
		transition: color 0.2s ease;
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: var(--color-primary);
	}

	.mobile-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: auto;
	}

	.mobile-menu-backdrop {
		position: fixed;
		top: 3rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 30;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.desktop-nav,
		.desktop-actions {
			display: none;
		}

		.mobile-menu-btn {
			display: flex;
		}

		.navbar-container {
			padding: 0 1rem;
		}

		.brand-name {
			font-size: var(--font-size-base);
		}
	}

	@media (max-width: 640px) {
		.mobile-menu {
			max-width: 100%;
			border-left: none;
		}

		.brand-name {
			display: none;
		}
	}
</style>
