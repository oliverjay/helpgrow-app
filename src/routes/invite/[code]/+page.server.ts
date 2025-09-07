import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/private/supabase.server';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	const { code } = params;
	
	console.log('Invite route hit with code:', code);
	
	if (!code) {
		console.log('No code provided');
		throw error(404, 'Invite code not found');
	}

	try {
		// For our simplified approach, the code is actually a user UUID
		// Validate that it's a valid UUID format
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		if (!uuidRegex.test(code)) {
			console.log('Invalid UUID format:', code);
			throw error(404, 'Invalid invite link');
		}

		console.log('Attempting to fetch user profile for UUID:', code);
		
		// Get the inviting user's info using admin client to bypass RLS
		const { data: userProfile, error: profileError } = await supabaseAdmin
			.from('users')
			.select('id, full_name, avatar_id')
			.eq('id', code)
			.single();

		console.log('Database query result:', { userProfile, profileError });

		if (profileError || !userProfile) {
			console.error('Error fetching user profile:', profileError);
			throw error(404, 'Invalid invite link - user not found');
		}

		// Check if current user is already authenticated
		const { session, user } = await locals.safeGetSession();
		
		console.log('User profile found:', userProfile.full_name);
		
		return {
			invite: {
				code: code,
				inviterId: userProfile.id,
				createdAt: new Date().toISOString(),
				usedCount: 0
			},
			inviterProfile: {
				fullName: userProfile.full_name || 'Someone',
				avatar_id: userProfile.avatar_id
			},
			currentUser: user,
			isAuthenticated: !!session
		};

	} catch (err) {
		console.error('Error processing invite:', err);
		// Re-throw known errors
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to process invite link');
	}
}; 