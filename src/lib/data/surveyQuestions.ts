export interface SurveyQuestion {
	id: string;
	type: 'multiple-choice' | 'scale' | 'text' | 'yes-no';
	question: string;
	description?: string;
	options?: string[];
	scaleMin?: number;
	scaleMax?: number;
	scaleLabels?: { min: string; max: string };
	required?: boolean;
	category: string;
}

export const surveyQuestions: SurveyQuestion[] = [
	// Category 1: 🧠 Cognitive Style (5 questions)
	{
		id: 'decision-making-speed',
		type: 'scale',
		question: 'How quickly do they typically make decisions?',
		description: 'From everyday choices to important life decisions',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Takes lots of time', max: 'Decides very quickly' },
		category: 'cognitive',
		required: true
	},
	{
		id: 'problem-solving-approach',
		type: 'multiple-choice',
		question: 'When facing a complex problem, they prefer to...',
		options: [
			'Break it down into smaller, manageable pieces',
			'Look at the big picture and find creative solutions',
			'Research extensively before taking action',
			'Jump in and learn by doing',
			'Discuss it with others to get different perspectives',
			'Trust their gut instinct and move forward'
		],
		category: 'cognitive',
		required: true
	},
	{
		id: 'risk-tolerance',
		type: 'scale',
		question: 'How comfortable are they with taking risks?',
		description: 'In both personal and professional situations',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Very cautious', max: 'Loves taking risks' },
		category: 'cognitive',
		required: true
	},
	{
		id: 'learning-preference',
		type: 'multiple-choice',
		question: 'How do they learn best?',
		options: [
			'Hands-on experience and experimentation',
			'Reading, research, and theoretical understanding',
			'Watching others and observing patterns',
			'Group discussions and collaborative learning',
			'Structured courses with clear guidelines',
			'Trial and error until mastery'
		],
		category: 'cognitive',
		required: true
	},
	{
		id: 'detail-vs-big-picture',
		type: 'scale',
		question: 'Do they focus more on details or the big picture?',
		description: 'When working on projects or planning',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'All about the details', max: 'Big picture thinker' },
		category: 'cognitive',
		required: true
	},

	// Category 2: 🤝 Social Dynamics (5 questions)
	{
		id: 'social-energy',
		type: 'scale',
		question: 'In social situations, how would you describe their energy?',
		description: 'Think about how they typically behave in groups',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Quiet observer', max: 'Life of the party' },
		category: 'social',
		required: true
	},
	{
		id: 'communication-directness',
		type: 'scale',
		question: 'How direct are they in their communication?',
		description: 'When they have something important to say',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Very diplomatic', max: 'Completely direct' },
		category: 'social',
		required: true
	},
	{
		id: 'emotional-intelligence',
		type: 'scale',
		question: 'How well do they read other people\'s emotions?',
		description: 'Their ability to understand how others are feeling',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Needs help with this', max: 'Incredibly intuitive' },
		category: 'social',
		required: true
	},
	{
		id: 'conflict-resolution',
		type: 'multiple-choice',
		question: 'When there\'s conflict, they tend to...',
		options: [
			'Address it head-on and directly',
			'Try to find a compromise for everyone',
			'Give people space to cool down first',
			'Listen to all sides before responding',
			'Focus on finding the root cause',
			'Use humor or distraction to defuse tension'
		],
		category: 'social',
		required: true
	},
	{
		id: 'group-role',
		type: 'multiple-choice',
		question: 'In group settings, they naturally become the...',
		options: [
			'Leader who guides and makes decisions',
			'Mediator who keeps everyone happy',
			'Contributor who shares ideas and insights',
			'Supporter who helps others succeed',
			'Observer who listens and analyzes',
			'Entertainer who keeps things fun and light'
		],
		category: 'social',
		required: true
	},

	// Category 3: ⚡ Work & Achievement (5 questions)
	{
		id: 'work-style',
		type: 'multiple-choice',
		question: 'In a team project, they\'re most likely to be the...',
		options: [
			'Visionary who comes up with creative ideas',
			'Organizer who keeps everyone on track',
			'Executor who gets things done efficiently',
			'Quality controller who ensures excellence',
			'Motivator who keeps team spirits high',
			'Problem solver who tackles obstacles'
		],
		category: 'work',
		required: true
	},
	{
		id: 'motivation-driver',
		type: 'multiple-choice',
		question: 'What motivates them most?',
		options: [
			'Making a positive impact on others',
			'Achieving personal goals and recognition',
			'Learning and growing continuously',
			'Building meaningful relationships',
			'Creating something unique or innovative',
			'Solving complex challenges',
			'Having freedom and independence',
			'Being part of something bigger than themselves'
		],
		category: 'work',
		required: true
	},
	{
		id: 'stress-response',
		type: 'multiple-choice',
		question: 'Under pressure or stress, they usually...',
		options: [
			'Stay calm and work methodically',
			'Get energized and work faster',
			'Need to talk it through with others',
			'Prefer to work alone until it\'s done',
			'Take breaks to recharge and refocus',
			'Push through until completion'
		],
		category: 'work',
		required: true
	},
	{
		id: 'perfectionism-level',
		type: 'scale',
		question: 'How much of a perfectionist are they?',
		description: 'When it comes to their work and projects',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Good enough works', max: 'Everything must be perfect' },
		category: 'work',
		required: true
	},
	{
		id: 'initiative-taking',
		type: 'scale',
		question: 'How likely are they to take initiative?',
		description: 'Starting new projects or suggesting improvements',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Waits for direction', max: 'Always taking charge' },
		category: 'work',
		required: true
	},

	// Category 4: 🎭 Personality Traits (4 questions)
	{
		id: 'first-impression',
		type: 'multiple-choice',
		question: 'What\'s the first word that comes to mind when you think of this person?',
		description: 'Choose the option that feels most natural',
		options: [
			'Energetic',
			'Thoughtful',
			'Creative',
			'Reliable',
			'Adventurous',
			'Calm',
			'Inspiring',
			'Funny'
		],
		category: 'personality',
		required: true
	},
	{
		id: 'reliability-level',
		type: 'scale',
		question: 'How reliable and consistent are they?',
		description: 'Following through on commitments and promises',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Can be unpredictable', max: 'Extremely reliable' },
		category: 'personality',
		required: true
	},
	{
		id: 'openness-to-change',
		type: 'scale',
		question: 'How do they handle change and new situations?',
		description: 'Unexpected changes in plans or environment',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Prefers routine', max: 'Loves new experiences' },
		category: 'personality',
		required: true
	},
	{
		id: 'optimism-level',
		type: 'scale',
		question: 'How optimistic are they generally?',
		description: 'Their overall outlook on life and situations',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Realistic/cautious', max: 'Very optimistic' },
		category: 'personality',
		required: true
	},

	// Category 5: 🎯 Values & Motivation (4 questions)
	{
		id: 'core-values',
		type: 'multiple-choice',
		question: 'Which value seems most important to them?',
		options: [
			'Honesty and authenticity',
			'Achievement and success',
			'Relationships and connection',
			'Freedom and independence',
			'Security and stability',
			'Growth and learning',
			'Helping others and making a difference',
			'Creativity and self-expression'
		],
		category: 'values',
		required: true
	},
	{
		id: 'work-life-balance',
		type: 'scale',
		question: 'How do they approach work-life balance?',
		description: 'Their typical approach to balancing different priorities',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Work comes first', max: 'Life comes first' },
		category: 'values',
		required: true
	},
	{
		id: 'feedback-seeking',
		type: 'scale',
		question: 'How actively do they seek feedback and criticism?',
		description: 'For personal and professional growth',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Prefers to figure it out alone', max: 'Always asking for input' },
		category: 'values',
		required: true
	},
	{
		id: 'independence-vs-collaboration',
		type: 'scale',
		question: 'Do they prefer working independently or with others?',
		description: 'When given the choice on important projects',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Loves working alone', max: 'Thrives in teams' },
		category: 'values',
		required: true
	},

	// Category 6: 🌟 Unique Strengths (4 questions)
	{
		id: 'superpower',
		type: 'multiple-choice',
		question: 'If they had a superpower, what would it be?',
		description: 'Based on their natural strengths',
		options: [
			'Reading minds (incredible with people)',
			'Time travel (learns from everything)',
			'Invisibility (observant and strategic)',
			'Super strength (gets things done)',
			'Flying (sees the big picture)',
			'Healing (makes others feel better)',
			'Telepathy (amazing communicator)',
			'Shapeshifting (adapts to anything)'
		],
		category: 'strengths',
		required: true
	},
	{
		id: 'creative-vs-analytical',
		type: 'scale',
		question: 'Are they more creative or analytical?',
		description: 'How they approach problems and express themselves',
		scaleMin: 1,
		scaleMax: 5,
		scaleLabels: { min: 'Highly analytical', max: 'Highly creative' },
		category: 'strengths',
		required: true
	},
	{
		id: 'leadership-style',
		type: 'multiple-choice',
		question: 'When they\'re in a leadership role, they lead by...',
		options: [
			'Example and personal demonstration',
			'Vision and inspiring others',
			'Organization and clear structure',
			'Support and empowering others',
			'Innovation and creative solutions',
			'Collaboration and team building'
		],
		category: 'strengths',
		required: true
	},
	{
		id: 'energy-source',
		type: 'multiple-choice',
		question: 'What gives them the most energy?',
		options: [
			'Spending time with people they care about',
			'Accomplishing challenging goals',
			'Learning something completely new',
			'Having quiet time to think and recharge',
			'Creating or building something meaningful',
			'Helping others solve their problems',
			'Exploring new places or experiences',
			'Having deep, meaningful conversations'
		],
		category: 'strengths',
		required: true
	}
];

export interface SurveyResponse {
	questionId: string;
	answer: string | number | boolean;
	timestamp: Date;
}

export interface SurveySubmission {
	inviteCode: string;
	responses: SurveyResponse[];
	completedAt: Date;
	respondentId?: string; // If they're logged in
} 