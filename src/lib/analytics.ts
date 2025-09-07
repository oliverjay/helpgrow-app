// Plausible Analytics utility functions

declare global {
	interface Window {
		plausible: (event: string, options?: { props?: Record<string, string | number> }) => void;
	}
}

/**
 * Track a custom event with Plausible Analytics
 */
export function trackEvent(event: string, props?: Record<string, string | number>) {
	if (typeof window !== 'undefined' && window.plausible) {
		window.plausible(event, props ? { props } : undefined);
	}
}

/**
 * Track route changes
 */
export function trackRoute(route: string) {
	trackEvent('Route View', { route });
}

/**
 * Track sharing actions
 */
export function trackShare(action: 'copy_url' | 'share_link' | 'invite_email', context?: string) {
	const eventNames = {
		copy_url: 'Share URL Copied',
		share_link: 'Share Link Pressed',
		invite_email: 'Invite by Email'
	};
	
	trackEvent(eventNames[action], context ? { context } : undefined);
}

/**
 * Track survey invite landing
 */
export function trackSurveyLanding(surveyCode: string) {
	trackEvent('Survey Invite Landing', { survey_code: surveyCode });
}

/**
 * Track survey step progression
 */
export function trackSurveyStep(step: number, totalSteps: number, surveyCode: string) {
	trackEvent('Survey Step', { 
		step, 
		total_steps: totalSteps, 
		survey_code: surveyCode,
		progress: Math.round((step / totalSteps) * 100)
	});
}

/**
 * Track survey completion CTA
 */
export function trackSurveyCTA(action: string, surveyCode: string) {
	trackEvent('Survey Completion CTA', { 
		action, 
		survey_code: surveyCode 
	});
} 