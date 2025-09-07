<script lang="ts">
	import { Head, Survey } from '$lib/components';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	const inviterName = data.inviterProfile?.fullName || 'Someone';
	// Capitalize the first letter of each word in the name
	const capitalizedInviterName = inviterName.split(' ')
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');

	function handleSurveyCompleted() {
		// Redirect to thank you page
		goto(`/survey/${data.inviteCode}/thank-you`);
	}
</script>

<Head 
	title="Anonymous Survey about {capitalizedInviterName}"
	description="Help {capitalizedInviterName} understand how others see them by taking this quick anonymous survey."
/>

<Survey 
	inviteCode={data.inviteCode}
	inviterName={capitalizedInviterName}
	on:completed={handleSurveyCompleted}
/> 