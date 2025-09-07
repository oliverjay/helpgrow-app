import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/private/supabase.server';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { code } = params;
	
	if (!code) {
		throw error(404, 'Survey not found');
	}

	try {
		// Validate that it's a valid UUID format
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		if (!uuidRegex.test(code)) {
			throw error(404, 'Invalid survey link');
		}

		// Get the inviting user's info using admin client to bypass RLS
		const { data: userProfile, error: profileError } = await supabaseAdmin
			.from('users')
			.select('id, full_name')
			.eq('id', code)
			.single();

		if (profileError || !userProfile) {
			console.error('Error fetching user profile for survey:', profileError);
			throw error(404, 'Survey not found - invalid user');
		}

		// Check if current user is already authenticated
		const { session, user } = await locals.safeGetSession();
		
		return {
			inviteCode: code,
			inviterProfile: {
				fullName: userProfile.full_name || 'Someone'
			},
			currentUser: user,
			isAuthenticated: !!session
		};

	} catch (err) {
		console.error('Error loading survey:', err);
		// Re-throw known errors
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to load survey');
	}
}; 