<script lang="ts">
	import { page } from '$app/stores';
	import { APP_NAME, APP_URL, APP_DESCRIPTION, TWITTER_HANDLE } from '$lib/constants/appConfig.js';

	let {
		title,
		description = APP_DESCRIPTION,
		image = `${APP_URL}/open-graph/og-image-general.webp`,
		imageAlt = APP_NAME,
		url = $page.url.href,
		type = 'website',
		siteName = APP_NAME,
		twitterCard = 'summary_large_image',
		twitterSite = TWITTER_HANDLE,
		noindex = false,
		nofollow = false,
		canonical = url
	}: {
		title: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		url?: string;
		type?: 'website' | 'article' | 'product';
		siteName?: string;
		twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
		twitterSite?: string;
		noindex?: boolean;
		nofollow?: boolean;
		canonical?: string;
	} = $props();

	// Construct full title
	const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;

	// Robots meta content
	const robotsContent = [noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(
		', '
	);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content={twitterCard} />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
	<meta property="twitter:image:alt" content={imageAlt} />
	{#if twitterSite}
		<meta property="twitter:site" content={twitterSite} />
	{/if}

	<!-- Additional SEO -->
	<meta name="theme-color" content="#ffffff" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
