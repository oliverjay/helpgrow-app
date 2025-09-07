<script lang="ts">
	import '../app.css';
	import { Modal } from '$lib/components';
	import { profile } from '$lib/stores/profile.svelte';
	import { trackRoute } from '$lib/analytics';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	// Initialize and sync the user profile store
	$effect(() => {
		profile.user = user;
	});

	// Track route changes
	$effect(() => {
		if ($page.route.id) {
			trackRoute($page.route.id);
		}
	});

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event: string, newSession: any) => {
			if (event === 'SIGNED_OUT' || newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

{@render children()}

<Modal />


