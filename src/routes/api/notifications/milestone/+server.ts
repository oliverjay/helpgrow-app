import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/private/supabase.server';
import { 
	NotificationService, 
	shouldSendMilestoneNotification, 
	getUserNotificationPreferences 
} from '$lib/services/notifications';
import { env } from '$env/dynamic/private';

// Initialize notification service
const notificationService = new NotificationService(
	env.RESEND_API_KEY || '',
	env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_PHONE_NUMBER
		? {
				accountSid: env.TWILIO_ACCOUNT_SID,
				authToken: env.TWILIO_AUTH_TOKEN,
				fromNumber: env.TWILIO_PHONE_NUMBER
		  }
		: undefined
);

export const POST: RequestHandler = async ({ request }) => {
	console.log('🔔 Milestone notification API called');
	
	try {
		const { userId, responseCount } = await request.json();
		console.log('📨 Request data:', { userId, responseCount });
		
		if (!userId || typeof responseCount !== 'number') {
			console.log('❌ Invalid request data:', { userId, responseCount });
			return json({ error: 'Invalid request data' }, { status: 400 });
		}

		console.log(`Processing milestone notification for user ${userId} with ${responseCount} responses`);

		// Get user details
		const { data: userProfile, error: userError } = await supabaseAdmin
			.from('users')
			.select('full_name, email, notification_preferences, phone')
			.eq('id', userId)
			.single();

		if (userError || !userProfile) {
			console.error('❌ Error fetching user profile:', userError);
			console.log('👤 User profile data:', userProfile);
			return json({ error: 'User not found' }, { status: 404 });
		}
		
		console.log('✅ User profile loaded:', {
			full_name: userProfile.full_name,
			email: userProfile.email,
			notification_preferences: userProfile.notification_preferences,
			phone: userProfile.phone ? '***' + userProfile.phone.slice(-4) : 'none'
		});

		// Determine which milestone notifications to send
		const milestones: Array<1 | 2 | 3> = [];
		if (responseCount >= 1) milestones.push(1);
		if (responseCount >= 2) milestones.push(2);
		if (responseCount >= 3) milestones.push(3);
		
		console.log('🎯 Checking milestones:', { responseCount, milestones });

		const results: Array<{
			milestone: number;
			sent: boolean;
			channels: string[];
			error?: string;
		}> = [];

		for (const milestone of milestones) {
			console.log(`🔍 Processing milestone ${milestone}...`);
			
			// Check if we should send this milestone notification
			const shouldSend = await shouldSendMilestoneNotification(userId, milestone);
			console.log(`📋 Should send milestone ${milestone}:`, shouldSend);
			
			if (!shouldSend) {
				console.log(`⏭️ Milestone ${milestone} notification already sent for user ${userId}`);
				continue;
			}

			// Get notification preferences
			const preferences = userProfile.notification_preferences || {};
			
			// Skip if milestone notifications are disabled
			if (preferences.milestone_notifications === false) {
				console.log(`Milestone notifications disabled for user ${userId}`);
				continue;
			}

			// Determine channels to use
			const channels: ('email' | 'sms')[] = [];
			
			if (preferences.email_notifications !== false) {
				channels.push('email');
			}
			
			if (preferences.sms_notifications === true && userProfile.phone) {
				channels.push('sms');
			}

			if (channels.length === 0) {
				console.log(`No notification channels enabled for user ${userId}`);
				continue;
			}

			// Prepare notification data
			const notificationData = {
				userId,
				userName: userProfile.full_name || 'there',
				userEmail: userProfile.email,
				responseCount,
				milestoneNumber: milestone,
				dashboardUrl: `https://helpgrow.app/dashboard`
			};

			try {
				// Log notification attempt
				const logPromises = channels.map(channel => 
					notificationService.logNotificationAttempt(
						userId,
						milestone,
						responseCount,
						channel,
						{ userAgent: request.headers.get('user-agent') || '' }
					)
				);

				const notificationIds = await Promise.all(logPromises);

				// Send notifications
				const sendResults = await notificationService.sendMilestoneNotification(
					notificationData,
					channels,
					userProfile.phone || undefined
				);

				// Update notification statuses
				for (let i = 0; i < sendResults.length; i++) {
					const result = sendResults[i];
					const notificationId = notificationIds[i];
					
					if (notificationId) {
						await notificationService.updateNotificationStatus(
							notificationId,
							result.success ? 'sent' : 'failed'
						);
					}
				}

				const successfulChannels = sendResults
					.filter(r => r.success)
					.map(r => r.channel);

				results.push({
					milestone,
					sent: successfulChannels.length > 0,
					channels: successfulChannels,
					error: sendResults.some(r => !r.success) 
						? sendResults.find(r => !r.success)?.error 
						: undefined
				});

				console.log(`Milestone ${milestone} notification sent to user ${userId} via ${successfulChannels.join(', ')}`);

			} catch (error) {
				console.error(`Error sending milestone ${milestone} notification:`, error);
				results.push({
					milestone,
					sent: false,
					channels: [],
					error: error instanceof Error ? error.message : 'Unknown error'
				});
			}
		}

		return json({
			success: true,
			userId,
			responseCount,
			results
		});

	} catch (error) {
		console.error('Error processing milestone notification:', error);
		return json(
			{ 
				error: 'Failed to process milestone notification',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
}; 