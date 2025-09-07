<script lang="ts">
	import { onMount } from 'svelte';
	import {
		DarkModeToggle,
		Button,
		StyleGuideTypography,
		StyleGuideColors,
		StyleGuideButtons,
		StyleGuideForms,
		StyleGuideModals,
		StyleGuideSpacing,
		StyleGuideLogos,
		StyleGuideFavicons,
		StyleGuideOgImages
	} from '$lib/components';

	let activeSection = 'typography';
	let observer: IntersectionObserver;

	const sections = [
		{ id: 'typography', label: 'Typography' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'buttons', label: 'Buttons' },
		{ id: 'forms', label: 'Forms' },
		{ id: 'modals', label: 'Modals' },
		{ id: 'spacing', label: 'Spacing' },
		{ id: 'logos', label: 'Logos' },
		{ id: 'favicons', label: 'Favicons' },
		{ id: 'og-image', label: 'OG Image' }
	];

	function setActiveSection(sectionId: string) {
		activeSection = sectionId;

		// Update URL hash
		if (window.location.hash !== `#${sectionId}`) {
			window.location.hash = sectionId;
		}

		// Scroll to section with proper offset
		const element = document.getElementById(sectionId);
		if (element) {
			const yOffset = -20; // Small offset for better visual positioning
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}

	function handleHashChange() {
		const hash = window.location.hash.slice(1);
		if (hash && sections.find((s) => s.id === hash)) {
			activeSection = hash;
		}
	}

	function initializeIntersectionObserver() {
		// Create observer to track visible sections
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						activeSection = sectionId;

						// Update URL hash without scrolling
						if (window.location.hash !== `#${sectionId}`) {
							history.replaceState(null, '', `#${sectionId}`);
						}
					}
				});
			},
			{
				// Trigger when section is 20% from top and 60% from bottom
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0
			}
		);

		// Observe all sections
		sections.forEach((section) => {
			const element = document.getElementById(section.id);
			if (element) {
				observer.observe(element);
			}
		});
	}

	onMount(() => {
		// Handle initial page load with hash
		const initialHash = window.location.hash.slice(1);
		if (initialHash && sections.find((s) => s.id === initialHash)) {
			activeSection = initialHash;
			// Scroll to section after a brief delay to ensure DOM is ready
			setTimeout(() => {
				setActiveSection(initialHash);
			}, 100);
		}

		// Initialize intersection observer for scroll tracking
		initializeIntersectionObserver();

		// Listen for hash changes (back/forward navigation)
		window.addEventListener('hashchange', handleHashChange);

		// Cleanup function
		return () => {
			if (observer) {
				observer.disconnect();
			}
			window.removeEventListener('hashchange', handleHashChange);
		};
	});
</script>

<div class="style-guide">
	<div class="dark-mode-toggle-container">
		<DarkModeToggle />
	</div>

	<div class="sidebar">
		<div class="sidebar-header">
			<h3>Style Guide</h3>
			<Button href="/" variant="outline" size="md">← Back to Home</Button>
		</div>

		<nav class="sidebar-nav">
			{#each sections as section}
				<button
					class="nav-item {activeSection === section.id ? 'active' : ''}"
					onclick={() => setActiveSection(section.id)}
				>
					{section.label}
				</button>
			{/each}
		</nav>
	</div>

	<div class="main-content">
		<header class="header">
			<h1>Visual Design System</h1>
			<p>Complete design system for SvelteKit Boilerplate</p>
		</header>

		<div class="content-section">
			<StyleGuideTypography />
			<StyleGuideColors />
			<StyleGuideButtons />
			<StyleGuideForms />
			<StyleGuideModals />
			<StyleGuideSpacing />
			<StyleGuideLogos />
			<StyleGuideFavicons />
			<StyleGuideOgImages />
		</div>
	</div>
</div>

<style>
	.style-guide {
		display: flex;
		min-height: 100vh;
		background-color: var(--color-bg-primary);
		position: relative;
	}

	.dark-mode-toggle-container {
		position: fixed;
		top: var(--spacing-6);
		right: var(--spacing-6);
		z-index: 1000;
	}

	.sidebar {
		width: 280px;
		background-color: var(--color-bg-secondary);
		border-right: 1px solid var(--color-border-primary);
		padding: var(--spacing-6);
		position: fixed;
		height: 100vh;
		overflow-y: auto;
		z-index: 100;
	}

	.sidebar-header {
		margin-bottom: var(--spacing-8);
		padding-bottom: var(--spacing-6);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.sidebar-header h3 {
		margin-bottom: var(--spacing-4);
		color: var(--color-text-primary);
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}

	.nav-item {
		display: block;
		padding: var(--spacing-3) var(--spacing-4);
		color: var(--color-text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		border: none;
		background: none;
		cursor: pointer;
		text-align: left;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.nav-item:hover {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}

	.nav-item.active {
		background-color: var(--color-primary);
		color: var(--color-white);
	}

	.main-content {
		flex: 1;
		margin-left: 280px;
		padding: var(--spacing-8);
	}

	.header {
		text-align: center;
		margin-bottom: var(--spacing-12);
		padding-bottom: var(--spacing-8);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.header p {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.dark-mode-toggle-container {
			top: var(--spacing-4);
			right: var(--spacing-4);
		}

		.sidebar {
			transform: translateX(-100%);
			transition: transform var(--transition-base);
		}

		.main-content {
			margin-left: 0;
			padding: var(--spacing-4);
		}
	}
</style>
