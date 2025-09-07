import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();
	
	// Require authentication for profile completion
	if (!session || !user) {
		throw redirect(302, '/login');
	}
	
	let profile = null;
	let suggestedStep = 1;
	
	// Check user's profile completion
	const { data, error } = await locals.supabase
		.from('users')
		.select('full_name, phone, dob, avatar_id, profile_complete')
		.eq('id', user.id)
		.single();
	
	profile = data;
	
	// If profile is marked as complete, redirect to dashboard
	if (profile && profile.profile_complete) {
		throw redirect(302, '/dashboard');
	}
	
	// Determine suggested step based on what's missing (4 steps now)
	if (profile) {
		if (!profile.full_name) {
			suggestedStep = 1; // Step 1: Name
		} else if (!profile.phone) {
			suggestedStep = 2; // Step 2: Phone
		} else if (!profile.dob) {
			suggestedStep = 3; // Step 3: Date of Birth
		} else if (!profile.avatar_id) {
			suggestedStep = 4; // Step 4: Avatar
		} else {
			// All fields exist but profile_complete is false - go to final step
			suggestedStep = 4;
		}
	} else {
		// User is authenticated but no profile exists, start at step 1
		suggestedStep = 1;
	}
	
	return {
		session,
		user,
		profile,
		suggestedStep
	};
}; 