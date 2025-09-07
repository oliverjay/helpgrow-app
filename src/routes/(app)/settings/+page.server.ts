import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();
	
	// Require authentication
	if (!session || !user) {
		throw redirect(302, '/login');
	}
	
	// Get user profile and notification preferences
	const { data: profile, error } = await locals.supabase
		.from('user_profiles')
		.select('full_name, email, phone, notification_preferences')
		.eq('user_id', user.id)
		.single();
	
	if (error) {
		console.error('Error fetching user profile:', error);
	}
	
	return {
		session,
		user,
		profile: profile || null
	};
};

export const actions: Actions = {
	updateNotifications: async ({ request, locals }) => {
		const { session, user } = await locals.safeGetSession();
		
		if (!session || !user) {
			return { success: false, error: 'Not authenticated' };
		}
		
		const formData = await request.formData();
		
		const notificationPreferences = {
			email_notifications: formData.get('email_notifications') === 'on',
			sms_notifications: formData.get('sms_notifications') === 'on',
			milestone_notifications: formData.get('milestone_notifications') === 'on',
			weekly_digest: formData.get('weekly_digest') === 'on'
		};
		
		const { error } = await locals.supabase
			.from('user_profiles')
			.update({ 
				notification_preferences: notificationPreferences
			})
			.eq('user_id', user.id);
		
		if (error) {
			console.error('Error updating notification preferences:', error);
			return { success: false, error: 'Failed to update preferences' };
		}
		
		return { success: true };
	},
	
	updatePhone: async ({ request, locals }) => {
		const { session, user } = await locals.safeGetSession();
		
		if (!session || !user) {
			return { success: false, error: 'Not authenticated' };
		}
		
		const formData = await request.formData();
		const phone = formData.get('phone') as string;
		
		const { error } = await locals.supabase
			.from('user_profiles')
			.update({ phone })
			.eq('user_id', user.id);
		
		if (error) {
			console.error('Error updating phone:', error);
			return { success: false, error: 'Failed to update phone number' };
		}
		
		return { success: true };
	}
}; 