import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		try {
			// Check if supabase client exists
			if (locals.supabase) {
				// Sign out the user
				const { error } = await locals.supabase.auth.signOut()
				
				if (error) {
					console.error('Server logout error:', error)
				}
			}
			
			// Clear all auth-related cookies manually as backup
			// Get all cookies and clear any that look like Supabase auth cookies
			const allCookies = cookies.getAll();
			allCookies.forEach(cookie => {
				if (cookie.name.includes('sb-') || 
					cookie.name.includes('supabase') || 
					cookie.name.includes('auth')) {
					cookies.delete(cookie.name, { path: '/' });
				}
			});
			
		} catch (error) {
			console.error('Server logout error:', error)
		}
		
		// Always redirect to homepage, even if logout had issues
		redirect(303, '/')
	}
} 