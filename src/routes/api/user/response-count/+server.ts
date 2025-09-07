import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/private/supabase.server';

export const GET: RequestHandler = async ({ locals, url }) => {
	try {
		const { session, user } = await locals.safeGetSession();
		
		if (!session || !user) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get the response count for this user
		const { data, error } = await supabaseAdmin
			.rpc('get_user_survey_insights', { 
				user_uuid: user.id,
				min_responses: 1 // Keep at 1 for testing, but UI encourages 3
			});

		if (error) {
			console.error('Error fetching user survey insights:', error);
			return json({ error: 'Failed to fetch response count' }, { status: 500 });
		}

		const insights = data?.[0] || {
			total_responses: 0,
			can_view_results: false,
			response_sessions: []
		};

		return json({
			success: true,
			responseCount: insights.total_responses,
			canViewResults: insights.can_view_results,
			sessionIds: insights.response_sessions
		});

	} catch (error) {
		console.error('Error in response count endpoint:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}; 