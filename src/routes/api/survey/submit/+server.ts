import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SurveySubmission } from '$lib/data/surveyQuestions';
import { supabaseAdmin } from '$lib/private/supabase.server';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const submission: SurveySubmission = await request.json();
		
		// Validate the submission
		if (!submission.inviteCode || !submission.responses || submission.responses.length === 0) {
			return json({ error: 'Invalid submission data' }, { status: 400 });
		}

		console.log('Survey submission received:', {
			inviteCode: submission.inviteCode,
			responseCount: submission.responses.length,
			completedAt: submission.completedAt
		});

		// Generate a unique session ID for this survey submission
		const responseSessionId = crypto.randomUUID();
		
		// Get respondent ID if they're logged in
		const { session } = await locals.safeGetSession();
		const respondentId = session?.user?.id || null;

		// Prepare database records
		const surveyRecords = submission.responses.map(response => {
			let answerType: string;
			let answerText: string | null = null;
			let answerNumber: number | null = null;
			let answerBoolean: boolean | null = null;

			// Determine answer type and store in appropriate column
			if (typeof response.answer === 'string') {
				answerType = 'text';
				answerText = response.answer;
			} else if (typeof response.answer === 'number') {
				answerType = 'number';
				answerNumber = response.answer;
			} else if (typeof response.answer === 'boolean') {
				answerType = 'boolean';
				answerBoolean = response.answer;
			} else {
				answerType = 'text';
				answerText = String(response.answer);
			}

			return {
				invite_code: submission.inviteCode,
				respondent_id: respondentId,
				question_id: response.questionId,
				answer_type: answerType,
				answer_text: answerText,
				answer_number: answerNumber,
				answer_boolean: answerBoolean,
				response_session_id: responseSessionId
			};
		});

		// Insert all responses into the database
		const { error: insertError } = await supabaseAdmin
			.from('survey_responses')
			.insert(surveyRecords);

		if (insertError) {
			console.error('Database error storing survey responses:', insertError);
			return json({ error: 'Failed to store survey responses' }, { status: 500 });
		}

		console.log(`Successfully stored ${surveyRecords.length} survey responses with session ID: ${responseSessionId}`);

		// Trigger milestone notifications asynchronously
		try {
			console.log('🔔 Attempting to trigger milestone notifications...');
			
			// Get current response count for the user
			const { data: responseData, error: countError } = await supabaseAdmin
				.rpc('get_user_response_count_with_details', { 
					user_uuid: submission.inviteCode 
				});

			console.log('📊 Response count data:', { responseData, countError });

			if (!countError && responseData?.[0]) {
				const responseCount = responseData[0].total_responses;
				console.log(`📈 User ${submission.inviteCode} now has ${responseCount} responses`);
				
				// Trigger milestone notification using absolute URL
				console.log('📮 Triggering milestone notification...');
				
				const baseUrl = 'https://helpgrow.app';
				const notificationUrl = `${baseUrl}/api/notifications/milestone`;
				console.log('📮 Calling notification API:', notificationUrl);
				
				fetch(notificationUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						userId: submission.inviteCode,
						responseCount
					})
				}).then(async (response) => {
					const result = await response.json();
					console.log('✅ Milestone notification response:', result);
				}).catch(error => {
					console.error('❌ Failed to trigger milestone notification:', error);
				});
			} else {
				console.log('⚠️ No response count data or error occurred:', { countError, responseData });
			}
		} catch (error) {
			console.error('❌ Error triggering milestone notification:', error);
			// Don't fail the survey submission if notification fails
		}

		return json({ 
			success: true, 
			message: 'Survey submitted successfully',
			responseId: responseSessionId
		});

	} catch (error) {
		console.error('Error submitting survey:', error);
		return json({ error: 'Failed to submit survey' }, { status: 500 });
	}
}; 