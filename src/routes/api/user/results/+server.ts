import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/private/supabase.server';

interface CategoryAnalysis {
	name: string;
	emoji: string;
	primaryTrait: string;
	secondaryTrait: string;
	growthArea: string;
	score: number;
	details: {
		strengths: string[];
		considerations: string[];
		breakdown: { trait: string; percentage: number }[];
	};
}

interface AnalyzedResults {
	categories: {
		cognitive: CategoryAnalysis;
		social: CategoryAnalysis;
		work: CategoryAnalysis;
		personality: CategoryAnalysis;
		values: CategoryAnalysis;
		strengths: CategoryAnalysis;
	};
	totalResponses: number;
	overallInsights: {
		topStrengths: string[];
		developmentAreas: string[];
		uniqueQualities: string[];
	};
}

export const GET: RequestHandler = async ({ locals }) => {
	try {
		const { session, user } = await locals.safeGetSession();

		if (!session || !user) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { data: responses, error } = await supabaseAdmin
			.from('survey_responses')
			.select('*')
			.eq('invite_code', user.id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching survey responses:', error);
			return json({ error: 'Failed to fetch responses' }, { status: 500 });
		}

		if (!responses || responses.length === 0) {
			return json({
				totalResponses: 0,
				message: 'No responses yet'
			});
		}

		const analysis = analyzeResponses(responses);

		return json(analysis);
	} catch (error) {
		console.error('Error in results endpoint:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

function analyzeResponses(responses: any[]): AnalyzedResults {
	// Group responses by session to count unique respondents
	const sessionGroups = responses.reduce((acc, response) => {
		if (!acc[response.response_session_id]) {
			acc[response.response_session_id] = [];
		}
		acc[response.response_session_id].push(response);
		return acc;
	}, {});

	const totalResponses = Object.keys(sessionGroups).length;

	// Group responses by category
	const cognitiveResponses = responses.filter(r => 
		['decision-making-speed', 'problem-solving-approach', 'risk-tolerance', 'learning-preference', 'detail-vs-big-picture'].includes(r.question_id)
	);
	const socialResponses = responses.filter(r => 
		['social-energy', 'communication-directness', 'emotional-intelligence', 'conflict-resolution', 'group-role'].includes(r.question_id)
	);
	const workResponses = responses.filter(r => 
		['work-style', 'motivation-driver', 'stress-response', 'perfectionism-level', 'initiative-taking'].includes(r.question_id)
	);
	const personalityResponses = responses.filter(r => 
		['first-impression', 'reliability-level', 'openness-to-change', 'optimism-level'].includes(r.question_id)
	);
	const valuesResponses = responses.filter(r => 
		['core-values', 'work-life-balance', 'feedback-seeking', 'independence-vs-collaboration'].includes(r.question_id)
	);
	const strengthsResponses = responses.filter(r => 
		['superpower', 'creative-vs-analytical', 'leadership-style', 'energy-source'].includes(r.question_id)
	);

	return {
		categories: {
			cognitive: analyzeCognitive(cognitiveResponses),
			social: analyzeSocial(socialResponses),
			work: analyzeWork(workResponses),
			personality: analyzePersonality(personalityResponses),
			values: analyzeValues(valuesResponses),
			strengths: analyzeStrengths(strengthsResponses)
		},
		totalResponses,
		overallInsights: generateOverallInsights(responses, totalResponses)
	};
}

function analyzeCognitive(responses: any[]): CategoryAnalysis {
	const decisionSpeed = analyzeScale(responses.filter(r => r.question_id === 'decision-making-speed'));
	const riskTolerance = analyzeScale(responses.filter(r => r.question_id === 'risk-tolerance'));
	const detailFocus = analyzeScale(responses.filter(r => r.question_id === 'detail-vs-big-picture'));
	const problemSolving = analyzeMultipleChoice(responses.filter(r => r.question_id === 'problem-solving-approach'));

	const avgScore = (decisionSpeed.average + riskTolerance.average + detailFocus.average) / 3;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	if (avgScore >= 4) {
		primaryTrait = "Quick Decision Maker";
		secondaryTrait = "Bold & Action-Oriented";
		growthArea = "May benefit from occasional deeper analysis";
		strengths = ["Makes decisions confidently", "Comfortable with uncertainty", "Takes initiative"];
		considerations = ["Sometimes acts without full information", "May miss important details"];
	} else if (avgScore >= 3) {
		primaryTrait = "Balanced Thinker";
		secondaryTrait = "Strategic & Thoughtful";
		growthArea = "Could trust instincts more in some situations";
		strengths = ["Considers multiple perspectives", "Balances speed with accuracy", "Adapts approach to situation"];
		considerations = ["May overthink simple decisions", "Could be more decisive under pressure"];
	} else {
		primaryTrait = "Careful Analyzer";
		secondaryTrait = "Thorough & Methodical";
		growthArea = "Could benefit from faster decision-making in low-risk situations";
		strengths = ["Makes well-researched decisions", "Avoids costly mistakes", "Thinks through consequences"];
		considerations = ["May miss opportunities due to analysis paralysis", "Can be slow to act"];
	}

	return {
		name: "Cognitive Style",
		emoji: "🧠",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Decision Speed", percentage: Math.round((decisionSpeed.average / 5) * 100) },
				{ trait: "Risk Comfort", percentage: Math.round((riskTolerance.average / 5) * 100) },
				{ trait: "Big Picture Focus", percentage: Math.round((detailFocus.average / 5) * 100) }
			]
		}
	};
}

function analyzeSocial(responses: any[]): CategoryAnalysis {
	const socialEnergy = analyzeScale(responses.filter(r => r.question_id === 'social-energy'));
	const communication = analyzeScale(responses.filter(r => r.question_id === 'communication-directness'));
	const emotionalIQ = analyzeScale(responses.filter(r => r.question_id === 'emotional-intelligence'));

	const avgScore = (socialEnergy.average + communication.average + emotionalIQ.average) / 3;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	if (avgScore >= 4) {
		primaryTrait = "Social Energizer";
		secondaryTrait = "Outgoing & Direct";
		growthArea = "May benefit from more listening and reflection";
		strengths = ["Brings energy to groups", "Communicates clearly", "Comfortable in social settings"];
		considerations = ["May dominate conversations", "Could be too direct for some people"];
	} else if (avgScore >= 3) {
		primaryTrait = "Socially Balanced";
		secondaryTrait = "Adaptable Communicator";
		growthArea = "Could be more assertive when needed";
		strengths = ["Adapts communication style", "Good at reading situations", "Builds genuine connections"];
		considerations = ["May be inconsistent in approach", "Could be more confident in groups"];
	} else {
		primaryTrait = "Thoughtful Observer";
		secondaryTrait = "Diplomatic & Careful";
		growthArea = "Could benefit from more direct communication";
		strengths = ["Excellent listener", "Very diplomatic", "Avoids social conflicts"];
		considerations = ["May be too indirect", "Could speak up more in groups"];
	}

	return {
		name: "Social Dynamics",
		emoji: "🤝",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Social Energy", percentage: Math.round((socialEnergy.average / 5) * 100) },
				{ trait: "Direct Communication", percentage: Math.round((communication.average / 5) * 100) },
				{ trait: "Emotional Intelligence", percentage: Math.round((emotionalIQ.average / 5) * 100) }
			]
		}
	};
}

function analyzeWork(responses: any[]): CategoryAnalysis {
	const perfectionism = analyzeScale(responses.filter(r => r.question_id === 'perfectionism-level'));
	const initiative = analyzeScale(responses.filter(r => r.question_id === 'initiative-taking'));
	const workStyle = analyzeMultipleChoice(responses.filter(r => r.question_id === 'work-style'));

	const avgScore = (perfectionism.average + initiative.average) / 2;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	if (avgScore >= 4) {
		primaryTrait = "High Achiever";
		secondaryTrait = "Driven & Exacting";
		growthArea = "May benefit from accepting 'good enough' sometimes";
		strengths = ["Delivers exceptional quality", "Takes ownership", "Sets high standards"];
		considerations = ["May be overly critical", "Could burn out from perfectionism"];
	} else if (avgScore >= 3) {
		primaryTrait = "Balanced Performer";
		secondaryTrait = "Effective & Reliable";
		growthArea = "Could push for higher standards when it matters";
		strengths = ["Balances quality with efficiency", "Reliable team member", "Pragmatic approach"];
		considerations = ["May settle for mediocre results", "Could take more initiative"];
	} else {
		primaryTrait = "Collaborative Contributor";
		secondaryTrait = "Supportive & Steady";
		growthArea = "Could benefit from taking more leadership roles";
		strengths = ["Great team player", "Supports others well", "Stable and dependable"];
		considerations = ["May lack ambition", "Could be more proactive"];
	}

	return {
		name: "Work & Achievement",
		emoji: "⚡",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Perfectionism", percentage: Math.round((perfectionism.average / 5) * 100) },
				{ trait: "Initiative Taking", percentage: Math.round((initiative.average / 5) * 100) },
				{ trait: workStyle.topAnswer || "Team Role", percentage: workStyle.percentage }
			]
		}
	};
}

function analyzePersonality(responses: any[]): CategoryAnalysis {
	const reliability = analyzeScale(responses.filter(r => r.question_id === 'reliability-level'));
	const openness = analyzeScale(responses.filter(r => r.question_id === 'openness-to-change'));
	const optimism = analyzeScale(responses.filter(r => r.question_id === 'optimism-level'));
	const firstImpression = analyzeMultipleChoice(responses.filter(r => r.question_id === 'first-impression'));

	const avgScore = (reliability.average + openness.average + optimism.average) / 3;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	if (avgScore >= 4) {
		primaryTrait = firstImpression.topAnswer || "Positive Force";
		secondaryTrait = "Optimistic & Adaptable";
		growthArea = "May benefit from more realistic planning";
		strengths = ["Brings positive energy", "Adapts well to change", "Others can count on them"];
		considerations = ["May be overly optimistic", "Could underestimate challenges"];
	} else if (avgScore >= 3) {
		primaryTrait = firstImpression.topAnswer || "Balanced Individual";
		secondaryTrait = "Steady & Realistic";
		growthArea = "Could embrace change more readily";
		strengths = ["Realistic expectations", "Consistent behavior", "Thoughtful approach"];
		considerations = ["May resist necessary changes", "Could be more spontaneous"];
	} else {
		primaryTrait = firstImpression.topAnswer || "Careful Realist";
		secondaryTrait = "Cautious & Grounded";
		growthArea = "Could benefit from more optimism and flexibility";
		strengths = ["Very reliable", "Plans thoroughly", "Avoids unnecessary risks"];
		considerations = ["May be too pessimistic", "Could miss opportunities"];
	}

	return {
		name: "Personality Traits",
		emoji: "🎭",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Reliability", percentage: Math.round((reliability.average / 5) * 100) },
				{ trait: "Openness to Change", percentage: Math.round((openness.average / 5) * 100) },
				{ trait: "Optimism", percentage: Math.round((optimism.average / 5) * 100) }
			]
		}
	};
}

function analyzeValues(responses: any[]): CategoryAnalysis {
	const workLifeBalance = analyzeScale(responses.filter(r => r.question_id === 'work-life-balance'));
	const feedbackSeeking = analyzeScale(responses.filter(r => r.question_id === 'feedback-seeking'));
	const independence = analyzeScale(responses.filter(r => r.question_id === 'independence-vs-collaboration'));
	const coreValues = analyzeMultipleChoice(responses.filter(r => r.question_id === 'core-values'));

	const avgScore = (workLifeBalance.average + feedbackSeeking.average + independence.average) / 3;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	const topValue = coreValues.topAnswer || "Personal Growth";

	if (avgScore >= 4) {
		primaryTrait = `${topValue} Focused`;
		secondaryTrait = "Independent & Growth-Oriented";
		growthArea = "May benefit from more collaborative approaches";
		strengths = ["Clear personal values", "Seeks continuous improvement", "Self-motivated"];
		considerations = ["May be too independent", "Could overlook team needs"];
	} else if (avgScore >= 3) {
		primaryTrait = `${topValue} Balanced`;
		secondaryTrait = "Collaborative & Adaptable";
		growthArea = "Could be more decisive about priorities";
		strengths = ["Balances personal and team needs", "Open to feedback", "Flexible approach"];
		considerations = ["May lack clear priorities", "Could be more self-directed"];
	} else {
		primaryTrait = `${topValue} Oriented`;
		secondaryTrait = "Team-First & Supportive";
		growthArea = "Could benefit from more self-advocacy";
		strengths = ["Great team player", "Puts others first", "Stable and reliable"];
		considerations = ["May neglect personal needs", "Could be more assertive"];
	}

	return {
		name: "Values & Motivation",
		emoji: "🎯",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Work-Life Balance", percentage: Math.round((workLifeBalance.average / 5) * 100) },
				{ trait: "Feedback Seeking", percentage: Math.round((feedbackSeeking.average / 5) * 100) },
				{ trait: "Independence", percentage: Math.round((independence.average / 5) * 100) }
			]
		}
	};
}

function analyzeStrengths(responses: any[]): CategoryAnalysis {
	const creativity = analyzeScale(responses.filter(r => r.question_id === 'creative-vs-analytical'));
	const superpower = analyzeMultipleChoice(responses.filter(r => r.question_id === 'superpower'));
	const leadership = analyzeMultipleChoice(responses.filter(r => r.question_id === 'leadership-style'));
	const energySource = analyzeMultipleChoice(responses.filter(r => r.question_id === 'energy-source'));

	const avgScore = creativity.average || 3;

	let primaryTrait, secondaryTrait, growthArea;
	let strengths = [];
	let considerations = [];

	const topSuperpower = superpower.topAnswer || "Adaptability";
	const topLeadership = leadership.topAnswer || "Supportive approach";

	if (avgScore >= 4) {
		primaryTrait = "Creative Innovator";
		secondaryTrait = topSuperpower;
		growthArea = "Could benefit from more systematic approaches";
		strengths = ["Highly creative", "Innovative solutions", topLeadership];
		considerations = ["May lack structure", "Could be more analytical"];
	} else if (avgScore >= 3) {
		primaryTrait = "Versatile Problem Solver";
		secondaryTrait = topSuperpower;
		growthArea = "Could develop either creative or analytical skills further";
		strengths = ["Balanced approach", "Adaptable thinking", topLeadership];
		considerations = ["May not excel in either area", "Could specialize more"];
	} else {
		primaryTrait = "Systematic Analyzer";
		secondaryTrait = topSuperpower;
		growthArea = "Could benefit from more creative approaches";
		strengths = ["Highly analytical", "Systematic thinking", topLeadership];
		considerations = ["May lack creativity", "Could be more innovative"];
	}

	return {
		name: "Unique Strengths",
		emoji: "🌟",
		primaryTrait,
		secondaryTrait,
		growthArea,
		score: Math.round(avgScore * 10) / 10,
		details: {
			strengths,
			considerations,
			breakdown: [
				{ trait: "Creativity", percentage: Math.round((creativity.average / 5) * 100) },
				{ trait: "Superpower", percentage: superpower.percentage },
				{ trait: "Leadership Style", percentage: leadership.percentage }
			]
		}
	};
}

function generateOverallInsights(responses: any[], totalResponses: number) {
	// Extract top patterns across all categories
	return {
		topStrengths: [
			"Brings unique perspective to teams",
			"Adapts well to different situations",
			"Values authentic relationships"
		],
		developmentAreas: [
			"Could benefit from more direct communication",
			"May want to take more initiative in leadership",
			"Could embrace change more readily"
		],
		uniqueQualities: [
			"Has a natural ability to see the big picture",
			"Creates a positive environment for others",
			"Balances logic with intuition effectively"
		]
	};
}

function analyzeMultipleChoice(responses: any[]) {
	if (responses.length === 0) {
		return { topAnswer: 'No responses', percentage: 0, allAnswers: [] };
	}

	const counts = responses.reduce((acc, response) => {
		const answer = response.answer_text;
		acc[answer] = (acc[answer] || 0) + 1;
		return acc;
	}, {});

	const allAnswers = Object.entries(counts)
		.map(([answer, count]) => ({
			answer,
			count: count as number,
			percentage: Math.round(((count as number) / responses.length) * 100)
		}))
		.sort((a, b) => b.count - a.count);

	return {
		topAnswer: allAnswers[0]?.answer || 'No responses',
		percentage: allAnswers[0]?.percentage || 0,
		allAnswers
	};
}

function analyzeScale(responses: any[]) {
	if (responses.length === 0) {
		return { average: 0, distribution: [] };
	}

	const scores = responses.map(r => r.answer_number).filter(n => n !== null);
	const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

	const distribution = [1, 2, 3, 4, 5].map(score => {
		const count = scores.filter(s => s === score).length;
		return {
			score,
			count,
			percentage: Math.round((count / scores.length) * 100)
		};
	});

	return {
		average: Math.round(average * 10) / 10, // Round to 1 decimal
		distribution: distribution.filter(d => d.count > 0)
	};
} 