import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	
	// Handle OAuth code flow (Google sign-in, etc.)
	if (code) {
		try {
			// Exchange the code for a session
			const { error: exchangeError } = await locals.supabase.auth.exchangeCodeForSession(code);
			
			if (!exchangeError) {
				return await handleAuthenticatedUser(locals);
			} else {
				console.error('Session exchange error:', exchangeError);
			}
		} catch (error) {
			console.error('Auth callback error:', error);
		}
		
		// If OAuth code flow failed, redirect to login with error
		throw redirect(303, '/login?error=auth_failed');
	}
	
	// For magic links (tokens in URL hash), let the client handle it
	// Return data so the client component can access supabase
	return {};
};

async function handleAuthenticatedUser(locals: any) {
	// Get the current user to check their profile completion
	const { data: { user }, error: userError } = await locals.supabase.auth.getUser();
	
	if (!userError && user) {
		try {
				// Check if user profile is marked as complete
	const { data: profile, error: profileError } = await locals.supabase
		.from('users')
		.select('profile_complete')
		.eq('id', user.id)
		.single();
	
	// If profile query failed, continue with account creation
	if (profileError) {
		console.error('Profile query error:', profileError);
		throw redirect(303, '/create-account');
	}
	
	// Check if profile is marked as complete
	if (profile && profile.profile_complete) {
		// Profile setup completed, go to dashboard
		throw redirect(303, '/dashboard');
	}
	
	// Profile creation incomplete, continue with account creation flow
	throw redirect(303, '/create-account');
		} catch (profileError) {
			console.error('Profile check error:', profileError);
			// Fallback to create-account if profile check fails
			throw redirect(303, '/create-account');
		}
	}
	
	// If no valid user, redirect to create account
	throw redirect(303, '/create-account');
} 