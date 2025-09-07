import { supabaseAdmin } from '$lib/private/supabase.server';

// Types
interface NotificationData {
	userId: string;
	userName: string;
	userEmail: string;
	responseCount: number;
	milestoneNumber: 1 | 2 | 3;
	dashboardUrl: string;
}

interface NotificationProvider {
	sendEmail(data: NotificationData): Promise<{ success: boolean; messageId?: string; error?: string }>;
	sendSMS?(data: NotificationData, phoneNumber: string): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

// Email templates
const getEmailTemplate = (data: NotificationData) => {
	const templates = {
		1: {
			subject: "🎉 Your first personality insight is here!",
			html: `
				<div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', system-ui, sans-serif;">
					<div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
						<h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🎉 Exciting news, ${data.userName}!</h1>
						<p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 18px;">Someone just shared their thoughts about you!</p>
					</div>
					
					<div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
						<div style="text-align: center; margin-bottom: 32px;">
							<div style="background: #F0FDF4; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
								🧠
							</div>
							<h2 style="color: #1F2937; margin: 0 0 12px 0; font-size: 24px;">Your First Response is In!</h2>
							<p style="color: #6B7280; margin: 0; font-size: 16px; line-height: 1.6;">
								This is just the beginning of your personality discovery journey. Each response reveals new insights about how others see you.
							</p>
						</div>
						
						<div style="background: #F8FAFC; padding: 24px; border-radius: 8px; margin-bottom: 32px; border-left: 4px solid #10B981;">
							<p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6;">
								<strong>What's next?</strong> Share your survey link with more friends, family, and colleagues to unlock deeper insights. The more responses you get, the more accurate your personality profile becomes!
							</p>
						</div>
						
						<div style="text-align: center;">
							<a href="${data.dashboardUrl}" style="background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; margin-bottom: 16px;">
								View Your Insights
							</a>
							<p style="color: #9CA3AF; font-size: 14px; margin: 0;">
								Or copy this link: ${data.dashboardUrl}
							</p>
						</div>
					</div>
					
					<div style="text-align: center; margin-top: 32px; padding: 20px; color: #6B7280; font-size: 14px;">
						<p>Keep growing with HelpGrow 🌱</p>
						<p><a href="https://helpgrow.app" style="color: #10B981;">helpgrow.app</a></p>
					</div>
				</div>
			`
		},
		2: {
			subject: "🚀 Two responses in! Your personality is taking shape",
			html: `
				<div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', system-ui, sans-serif;">
					<div style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
						<h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">🚀 Great momentum, ${data.userName}!</h1>
						<p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 18px;">Your second response just arrived!</p>
					</div>
					
					<div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
						<div style="text-align: center; margin-bottom: 32px;">
							<div style="background: #EFF6FF; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
								📊
							</div>
							<h2 style="color: #1F2937; margin: 0 0 12px 0; font-size: 24px;">Patterns Are Emerging!</h2>
							<p style="color: #6B7280; margin: 0; font-size: 16px; line-height: 1.6;">
								With ${data.responseCount} responses, you're starting to see consistent themes in how others perceive you. Your personality profile is becoming more defined!
							</p>
						</div>
						
						<div style="background: #FEF3C7; padding: 24px; border-radius: 8px; margin-bottom: 32px; border-left: 4px solid #F59E0B;">
							<p style="color: #92400E; margin: 0; font-size: 16px; line-height: 1.6;">
								<strong>💡 Pro Tip:</strong> Get one more response to unlock the full power of your personality insights! Three perspectives give you a comprehensive view of your strengths and growth areas.
							</p>
						</div>
						
						<div style="text-align: center;">
							<a href="${data.dashboardUrl}" style="background: #3B82F6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; margin-bottom: 16px;">
								Explore Your Results
							</a>
							<p style="color: #9CA3AF; font-size: 14px; margin: 0;">
								Or copy this link: ${data.dashboardUrl}
							</p>
						</div>
					</div>
					
					<div style="text-align: center; margin-top: 32px; padding: 20px; color: #6B7280; font-size: 14px;">
						<p>You're on a roll! 🔥</p>
						<p><a href="https://helpgrow.app" style="color: #3B82F6;">helpgrow.app</a></p>
					</div>
				</div>
			`
		},
		3: {
			subject: "✨ Complete! Your full personality profile is ready",
			html: `
				<div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', system-ui, sans-serif;">
					<div style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
						<h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">✨ Congratulations, ${data.userName}!</h1>
						<p style="color: rgba(255,255,255,0.9); margin: 16px 0 0 0; font-size: 18px;">Your complete personality profile is ready!</p>
					</div>
					
					<div style="background: white; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
						<div style="text-align: center; margin-bottom: 32px;">
							<div style="background: #F5F3FF; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
								🏆
							</div>
							<h2 style="color: #1F2937; margin: 0 0 12px 0; font-size: 24px;">Your Journey is Complete!</h2>
							<p style="color: #6B7280; margin: 0; font-size: 16px; line-height: 1.6;">
								With ${data.responseCount} responses, you now have a comprehensive view of your personality across all 6 core categories. Discover your strengths, growth areas, and unique qualities!
							</p>
						</div>
						
						<div style="background: #F0F9FF; padding: 24px; border-radius: 8px; margin-bottom: 32px; border-left: 4px solid #0EA5E9;">
							<p style="color: #0C4A6E; margin: 0; font-size: 16px; line-height: 1.6;">
								<strong>🎯 Your Complete Profile Includes:</strong><br>
								• Detailed analysis across 6 personality categories<br>
								• Actionable insights for personal growth<br>
								• Strengths to leverage and areas to develop<br>
								• How others truly see you
							</p>
						</div>
						
						<div style="text-align: center;">
							<a href="${data.dashboardUrl}" style="background: #8B5CF6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; margin-bottom: 16px; font-size: 16px;">
								View Your Complete Profile
							</a>
							<p style="color: #9CA3AF; font-size: 14px; margin: 0;">
								Or copy this link: ${data.dashboardUrl}
							</p>
						</div>
					</div>
					
					<div style="text-align: center; margin-top: 32px; padding: 20px; color: #6B7280; font-size: 14px;">
						<p>Thank you for trusting HelpGrow with your journey! 🙏</p>
						<p><a href="https://helpgrow.app" style="color: #8B5CF6;">helpgrow.app</a></p>
					</div>
				</div>
			`
		}
	};
	
	return templates[data.milestoneNumber];
};

// SMS templates
const getSMSTemplate = (data: NotificationData) => {
	const templates = {
		1: `🎉 ${data.userName}, your first personality insight just arrived! Someone shared their thoughts about you. View your results: ${data.dashboardUrl}`,
		2: `🚀 Great news ${data.userName}! Your 2nd response is in and patterns are emerging in your personality profile. Check it out: ${data.dashboardUrl}`,
		3: `✨ Congratulations ${data.userName}! Your complete personality profile with ${data.responseCount} responses is ready. Discover your full insights: ${data.dashboardUrl}`
	};
	
	return templates[data.milestoneNumber];
};

// Resend Email Provider
class ResendProvider implements NotificationProvider {
	private apiKey: string;
	
	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}
	
	async sendEmail(data: NotificationData) {
		console.log('📧 Attempting to send email via Resend:', {
			to: data.userEmail,
			milestone: data.milestoneNumber,
			apiKey: this.apiKey ? `${this.apiKey.substring(0, 8)}...` : 'Missing'
		});
		
		const template = getEmailTemplate(data);
		
		try {
			const response = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${this.apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: 'HelpGrow <notifications@helpgrow.app>',
					to: [data.userEmail],
					subject: template.subject,
					html: template.html,
					tags: [
						{ name: 'category', value: 'milestone' },
						{ name: 'milestone', value: data.milestoneNumber.toString() }
					]
				}),
			});
			
			if (!response.ok) {
				const errorData = await response.json();
				console.error('❌ Resend API error:', {
					status: response.status,
					statusText: response.statusText,
					errorData
				});
				throw new Error(`Resend API error: ${errorData.message}`);
			}
			
			const result = await response.json();
			console.log('✅ Email sent successfully:', { messageId: result.id });
			return { success: true, messageId: result.id };
		} catch (error) {
			console.error('Resend email error:', error);
			return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
		}
	}
}

// Twilio SMS Provider
class TwilioProvider {
	private accountSid: string;
	private authToken: string;
	private fromNumber: string;
	
	constructor(accountSid: string, authToken: string, fromNumber: string) {
		this.accountSid = accountSid;
		this.authToken = authToken;
		this.fromNumber = fromNumber;
	}
	
	async sendSMS(data: NotificationData, phoneNumber: string) {
		const message = getSMSTemplate(data);
		
		try {
			const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, {
				method: 'POST',
				headers: {
					'Authorization': `Basic ${btoa(`${this.accountSid}:${this.authToken}`)}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					From: this.fromNumber,
					To: phoneNumber,
					Body: message,
				}),
			});
			
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Twilio API error: ${errorData.message}`);
			}
			
			const result = await response.json();
			return { success: true, messageId: result.sid };
		} catch (error) {
			console.error('Twilio SMS error:', error);
			return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
		}
	}
}

// Main Notification Service
export class NotificationService {
	private emailProvider: NotificationProvider;
	private smsProvider?: TwilioProvider;
	
	constructor(
		resendApiKey: string,
		twilioConfig?: { accountSid: string; authToken: string; fromNumber: string }
	) {
		this.emailProvider = new ResendProvider(resendApiKey);
		
		if (twilioConfig) {
			this.smsProvider = new TwilioProvider(
				twilioConfig.accountSid,
				twilioConfig.authToken,
				twilioConfig.fromNumber
			);
		}
	}
	
	async sendMilestoneNotification(data: NotificationData, channels: ('email' | 'sms')[] = ['email'], phoneNumber?: string) {
		const results: { channel: string; success: boolean; messageId?: string; error?: string }[] = [];
		
		// Send email notification
		if (channels.includes('email')) {
			const emailResult = await this.emailProvider.sendEmail(data);
			results.push({ channel: 'email', ...emailResult });
		}
		
		// Send SMS notification
		if (channels.includes('sms') && this.smsProvider && phoneNumber) {
			const smsResult = await this.smsProvider.sendSMS(data, phoneNumber);
			results.push({ channel: 'sms', ...smsResult });
		}
		
		return results;
	}
	
	async logNotificationAttempt(
		userId: string,
		milestoneNumber: 1 | 2 | 3,
		responseCount: number,
		channel: 'email' | 'sms',
		metadata: Record<string, any> = {}
	) {
		try {
			const { data, error } = await supabaseAdmin.rpc('log_milestone_notification', {
				user_uuid: userId,
				milestone_number: milestoneNumber,
				response_count: responseCount,
				notification_channel: channel,
				notification_metadata: metadata
			});
			
			if (error) throw error;
			return data;
		} catch (error) {
			console.error('Error logging notification:', error);
			return null;
		}
	}
	
	async updateNotificationStatus(
		notificationId: string,
		status: 'sent' | 'failed' | 'delivered',
		deliveredAt?: Date
	) {
		try {
			const { error } = await supabaseAdmin.rpc('update_notification_status', {
				notification_id: notificationId,
				new_status: status,
				delivered_timestamp: deliveredAt?.toISOString()
			});
			
			if (error) throw error;
			return true;
		} catch (error) {
			console.error('Error updating notification status:', error);
			return false;
		}
	}
}

// Helper function to check if milestone notification should be sent
export async function shouldSendMilestoneNotification(userId: string, milestoneNumber: 1 | 2 | 3): Promise<boolean> {
	try {
		const { data, error } = await supabaseAdmin.rpc('should_send_milestone_notification', {
			user_uuid: userId,
			milestone_number: milestoneNumber
		});
		
		if (error) throw error;
		return data || false;
	} catch (error) {
		console.error('Error checking milestone notification status:', error);
		return false;
	}
}

// Helper function to get user notification preferences
export async function getUserNotificationPreferences(userId: string) {
	try {
		const { data, error } = await supabaseAdmin
			.from('users')
			.select('notification_preferences, phone')
			.eq('id', userId)
			.single();
		
		if (error) throw error;
		return data;
	} catch (error) {
		console.error('Error fetching user notification preferences:', error);
		return null;
	}
} 