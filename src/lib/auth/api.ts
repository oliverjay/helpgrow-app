import { supabase } from '$lib/private/supabase.js';
import type { LoginData, SignupData } from './schemas.ts';

export const auth = {
	async signUp(data: SignupData) {
		return await supabase.auth.signUp({
			email: data.email,
			password: data.password
		});
	},

	async signIn(data: LoginData) {
		return await supabase.auth.signInWithPassword(data);
	},

	async signOut() {
		try {
			const result = await supabase.auth.signOut();
			return result;
		} catch (error) {
			console.error('Auth API: SignOut error:', error);
			throw error;
		}
	},

	async resetPassword(email: string) {
		return await supabase.auth.resetPasswordForEmail(email);
	},

	async getSession() {
		return await supabase.auth.getSession();
	},

	async getUser() {
		return await supabase.auth.getUser();
	},

	async signInWithProvider(provider: 'google' | 'github' | 'discord') {
		// Use custom domain for OAuth redirects
		const baseUrl = window.location.hostname === 'localhost' 
			? window.location.origin 
			: 'https://helpgrow.app';
			
		return await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${baseUrl}/auth/callback`
			}
		});
	},

	async signInWithOtp(email: string, options?: { shouldCreateUser?: boolean }) {
		// Use custom domain for email redirects
		const baseUrl = window.location.hostname === 'localhost' 
			? window.location.origin 
			: 'https://helpgrow.app';
			
		return await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${baseUrl}/auth/callback`,
				...options
			}
		});
	},

	onAuthStateChange(callback: (user: unknown) => void) {
		return supabase.auth.onAuthStateChange((_event, session) => {
			callback(session?.user ?? null);
		});
	}
};
