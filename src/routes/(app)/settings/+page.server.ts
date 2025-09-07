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
		.from('users')
		.select('full_name, email, phone, notification_preferences')
		.eq('id', user.id)
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
			milestone_notifications: formData.get('milestone_notifications') === 'on'
		};
		
		const { error } = await locals.supabase
			.from('users')
			.update({ 
				notification_preferences: notificationPreferences
			})
			.eq('id', user.id);
		
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
		
		// Get current notification preferences
		const { data: currentProfile } = await locals.supabase
			.from('users')
			.select('notification_preferences')
			.eq('id', user.id)
			.single();
		
		const currentPreferences = currentProfile?.notification_preferences || {
			email_notifications: true,
			sms_notifications: false,
			milestone_notifications: true
		};
		
		// Auto-enable SMS notifications if phone number is provided and SMS is currently disabled
		const updatedPreferences = {
			...currentPreferences,
			sms_notifications: phone && phone.trim() !== '' ? true : currentPreferences.sms_notifications
		};
		
		const { error } = await locals.supabase
			.from('users')
			.update({ 
				phone,
				notification_preferences: updatedPreferences
			})
			.eq('id', user.id);
		
		if (error) {
			console.error('Error updating phone:', error);
			return { success: false, error: 'Failed to update phone number' };
		}
		
		return { success: true };
	},
	
	updateProfile: async ({ request, locals }) => {
		const { session, user } = await locals.safeGetSession();
		
		if (!session || !user) {
			return { success: false, error: 'Not authenticated' };
		}
		
		const formData = await request.formData();
		const full_name = formData.get('full_name') as string;
		
		const { error } = await locals.supabase
			.from('users')
			.update({ full_name })
			.eq('id', user.id);
		
		if (error) {
			console.error('Error updating profile:', error);
			return { success: false, error: 'Failed to update profile' };
		}
		
		return { success: true };
	}
}; 