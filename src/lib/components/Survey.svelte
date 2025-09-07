<script lang="ts">
	import { Button, Input, TextArea } from '$lib/components';
	import { surveyQuestions, type SurveyQuestion, type SurveyResponse } from '$lib/data/surveyQuestions';
	import { trackSurveyStep } from '$lib/analytics';
	import { createEventDispatcher, onMount } from 'svelte';

	let { 
		inviteCode = '',
		inviterName = 'Someone'
	} = $props();

	const dispatch = createEventDispatcher();

	let currentQuestionIndex = $state(0);
	let responses = $state<Record<string, string | number | boolean>>({});
	let isSubmitting = $state(false);
	let textAnswer = $state('');

	let currentQuestion = $derived(surveyQuestions[currentQuestionIndex]);
	let progress = $derived(((currentQuestionIndex + 1) / surveyQuestions.length) * 100);
	let isLastQuestion = $derived(currentQuestionIndex === surveyQuestions.length - 1);
	let canProceed = $derived(!currentQuestion.required || currentQuestion.id in responses);

	function handleAnswer(answer: string | number | boolean) {
		responses[currentQuestion.id] = answer;
		
		// Auto-advance to next question or complete survey after a short delay
		setTimeout(() => {
			if (currentQuestionIndex < surveyQuestions.length - 1) {
				nextQuestion();
			} else {
				// Auto proceed to thank you page on last question
				submitSurvey();
			}
		}, 500);
	}

	function nextQuestion() {
		if (canProceed && currentQuestionIndex < surveyQuestions.length - 1) {
			currentQuestionIndex++;
			// Track survey step progression
			trackSurveyStep(currentQuestionIndex + 1, surveyQuestions.length, inviteCode);
			// Update text answer for the new question
			textAnswer = (responses[surveyQuestions[currentQuestionIndex].id] as string) || '';
		}
	}

	function previousQuestion() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
			// Track survey step progression (going back)
			trackSurveyStep(currentQuestionIndex + 1, surveyQuestions.length, inviteCode);
			// Update text answer for the previous question
			textAnswer = (responses[surveyQuestions[currentQuestionIndex].id] as string) || '';
		}
	}

	async function submitSurvey() {
		if (!canProceed) return;

		isSubmitting = true;
		
		try {
			// Convert responses to the expected format
			const surveyResponses: SurveyResponse[] = Object.entries(responses).map(([questionId, answer]) => ({
				questionId,
				answer,
				timestamp: new Date()
			}));

			// Submit to API
			const response = await fetch('/api/survey/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					inviteCode,
					responses: surveyResponses,
					completedAt: new Date()
				})
			});

			if (response.ok) {
				dispatch('completed');
			} else {
				console.error('Failed to submit survey');
				// Handle error - for now just complete anyway
				dispatch('completed');
			}
		} catch (error) {
			console.error('Error submitting survey:', error);
			// Handle error - for now just complete anyway
			dispatch('completed');
		} finally {
			isSubmitting = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && canProceed) {
			if (isLastQuestion) {
				submitSurvey();
			} else {
				nextQuestion();
			}
		}
	}

	onMount(() => {
		// Track the initial survey step (step 1)
		trackSurveyStep(1, surveyQuestions.length, inviteCode);
	});
</script>

<svelte:window on:keypress={handleKeyPress} />

<div class="survey-container">
	<!-- Survey Header -->
	<div class="survey-header">
		<!-- <h1 class="survey-title">Anonymous Survey about {inviterName}</h1> -->
		<p class="survey-subtitle">Your honest feedback will help {inviterName}image.png understand how others see them</p>
	</div>

	<!-- Progress Bar -->
	<div class="progress-section">
		<div class="progress-info">
			<span class="progress-text">Question {currentQuestionIndex + 1} of {surveyQuestions.length}</span>
			<span class="progress-percent">{Math.round(progress)}%</span>
		</div>
		<div class="progress-bar">
			<div class="progress-fill" style="width: {progress}%"></div>
		</div>
	</div>

	<!-- Question Content -->
	<div class="question-section">
		<div class="question-header">
			<h2 class="question-title">{currentQuestion.question}</h2>
			{#if currentQuestion.description}
				<p class="question-description">{currentQuestion.description}</p>
			{/if}
		</div>

		<div class="question-content">
			{#if currentQuestion.type === 'multiple-choice'}
				<div class="options-grid">
					{#each currentQuestion.options || [] as option, index}
						<button 
							class="option-button {responses[currentQuestion.id] === option ? 'selected' : ''}"
							type="button"
							onclick={(e) => {
								e.preventDefault();
								handleAnswer(option);
							}}
						>
							{option}
						</button>
					{/each}
				</div>

			{:else if currentQuestion.type === 'scale'}
				<div class="scale-container">
					<div class="scale-labels">
						<span class="scale-label-min">{currentQuestion.scaleLabels?.min}</span>
						<span class="scale-label-max">{currentQuestion.scaleLabels?.max}</span>
					</div>
					<div class="scale-options">
						{#each Array.from({length: (currentQuestion.scaleMax || 5) - (currentQuestion.scaleMin || 1) + 1}, (_, i) => (currentQuestion.scaleMin || 1) + i) as value}
							<button 
								class="scale-button {responses[currentQuestion.id] === value ? 'selected' : ''}"
								type="button"
								onclick={(e) => {
									e.preventDefault();
									handleAnswer(value);
								}}
							>
								{value}
							</button>
						{/each}
					</div>
				</div>

			{:else if currentQuestion.type === 'yes-no'}
				<div class="yes-no-container">
					<button 
						class="yes-no-button {responses[currentQuestion.id] === true ? 'selected' : ''}"
						type="button"
						onclick={(e) => {
							e.preventDefault();
							handleAnswer(true);
						}}
					>
						Yes
					</button>
					<button 
						class="yes-no-button {responses[currentQuestion.id] === false ? 'selected' : ''}"
						type="button"
						onclick={(e) => {
							e.preventDefault();
							handleAnswer(false);
						}}
					>
						No
					</button>
				</div>

			{:else if currentQuestion.type === 'text'}
				<div class="text-input-container">
					<textarea
						placeholder="Share your thoughts..."
						bind:value={textAnswer}
						oninput={() => handleAnswer(textAnswer)}
						rows={4}
						class="text-input"
					></textarea>
				</div>
			{/if}
		</div>
	</div>

	<!-- Navigation -->
	<div class="navigation-section">
		<div class="nav-buttons">
			<Button 
				variant="outline" 
				onclick={(e: MouseEvent) => {
					e.preventDefault();
					previousQuestion();
				}}
				disabled={currentQuestionIndex === 0}
			>
				Previous
			</Button>
			
			{#if isLastQuestion}
				<Button 
					variant="primary" 
					onclick={(e: MouseEvent) => {
						e.preventDefault();
						submitSurvey();
					}}
					disabled={!canProceed || isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Complete Survey'}
				</Button>
			{:else if currentQuestion.id in responses}
				<Button 
					variant="primary" 
					onclick={(e: MouseEvent) => {
						e.preventDefault();
						nextQuestion();
					}}
				>
					Next
				</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: #10b981;
		min-height: 100vh;
	}

	.survey-container {
		max-width: 700px;
		margin: 0 auto;
		padding: var(--spacing-6);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.survey-container::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: 
			radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
		pointer-events: none;
		z-index: -1;
	}

	.survey-header {
		text-align: center;
		margin-bottom: var(--spacing-8);
		position: relative;
		z-index: 1;
	}

	.survey-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		color: #ffffff;
		margin-bottom: var(--spacing-3);
		letter-spacing: -0.02em;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.survey-subtitle {
		font-size: clamp(0.875rem, 2vw, 1rem);
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
		font-weight: 500;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.progress-section {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 16px;
		padding: var(--spacing-6);
		margin-bottom: var(--spacing-8);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		z-index: 1;
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-4);
	}

	.progress-text {
		font-size: 0.875rem;
		color: #64748b;
		font-weight: 600;
	}

	.progress-percent {
		font-size: 0.875rem;
		color: #10b981;
		font-weight: 700;
		background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.progress-bar {
		width: 100%;
		height: 12px;
		background: rgba(226, 232, 240, 0.6);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.progress-fill {
		height: 100%;
		background: #10b981;
		border-radius: 8px;
		transition: width 0.4s ease;
		box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
	}

	.question-section {
		flex: 1;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 20px;
		padding: var(--spacing-8);
		margin-bottom: var(--spacing-6);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		z-index: 1;
	}

	.question-header {
		margin-bottom: var(--spacing-8);
		text-align: center;
	}

	.question-title {
		font-size: clamp(1.5rem, 3vw, 1.875rem);
		font-weight: 700;
		color: #0f172a;
		margin-bottom: var(--spacing-4);
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.question-description {
		font-size: clamp(1rem, 2vw, 1.125rem);
		color: #64748b;
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
		font-weight: 500;
	}

	.question-content {
		display: flex;
		justify-content: center;
	}

	/* Multiple Choice Styles */
	.options-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--spacing-4);
		width: 100%;
		max-width: 600px;
	}

	.option-button {
		padding: var(--spacing-5);
		border: 2px solid rgba(226, 232, 240, 0.8);
		border-radius: 16px;
		background: rgba(248, 250, 252, 0.8);
		color: #0f172a;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		line-height: 1.5;
		font-family: inherit;
	}

	.option-button:hover {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(59, 130, 246, 0.1);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	.option-button.selected {
		border-color: #10b981;
		background: #10b981;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
	}

	/* Scale Styles */
	.scale-container {
		width: 100%;
		max-width: 500px;
	}

	.scale-labels {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing-6);
		padding: 0 var(--spacing-3);
	}

	.scale-label-min,
	.scale-label-max {
		font-size: 0.875rem;
		color: #64748b;
		font-weight: 600;
		text-align: center;
	}

	.scale-options {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-3);
	}

	.scale-button {
		width: 64px;
		height: 64px;
		border: 2px solid rgba(226, 232, 240, 0.8);
		border-radius: 50%;
		background: rgba(248, 250, 252, 0.8);
		color: #0f172a;
		font-size: 1.125rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
	}

	.scale-button:hover {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(59, 130, 246, 0.1);
		transform: scale(1.1);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	.scale-button.selected {
		border-color: #10b981;
		background: #10b981;
		color: white;
		transform: scale(1.1);
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
	}

	/* Navigation Styles */
	.navigation-section {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 16px;
		padding: var(--spacing-6);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		z-index: 1;
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-3);
	}

	.required-notice {
		text-align: center;
		color: #f59e0b;
		font-size: 0.875rem;
		margin: 0;
		font-weight: 600;
		background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		display: inline-block;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.survey-container {
			padding: var(--spacing-4);
		}

		.question-title {
			font-size: var(--font-size-lg);
		}

		.options-grid {
			grid-template-columns: 1fr;
		}

		.scale-button {
			width: 50px;
			height: 50px;
			font-size: var(--font-size-md);
		}

		.yes-no-container {
			flex-direction: column;
		}

		.yes-no-button {
			width: 100%;
		}
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.survey-container {
			padding: var(--spacing-4);
		}

		.survey-header {
			margin-bottom: var(--spacing-6);
		}

		.survey-title {
			font-size: clamp(1.25rem, 4vw, 1.5rem);
		}

		.survey-subtitle {
			font-size: clamp(0.8125rem, 2vw, 0.875rem);
		}

		.progress-section,
		.question-section,
		.navigation-section {
			padding: var(--spacing-4);
		}

		.question-title {
			font-size: 1.25rem;
		}

		.question-description {
			font-size: 1rem;
		}

		.options-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-3);
		}

		.option-button {
			padding: var(--spacing-4);
		}

		.scale-button {
			width: 50px;
			height: 50px;
			font-size: 1rem;
		}

		.scale-options {
			gap: var(--spacing-2);
		}
	}

	@media (max-width: 480px) {
		.survey-container {
			padding: var(--spacing-3);
		}

		.survey-header {
			margin-bottom: var(--spacing-4);
		}

		.survey-title {
			font-size: clamp(1.125rem, 5vw, 1.25rem);
		}

		.survey-subtitle {
			font-size: clamp(0.75rem, 2.5vw, 0.8125rem);
		}

		.progress-section,
		.question-section,
		.navigation-section {
			padding: var(--spacing-3);
		}

		.question-title {
			font-size: 1.125rem;
		}

		.question-description {
			font-size: 0.9375rem;
		}

		.option-button {
			padding: var(--spacing-3);
			font-size: 0.9375rem;
		}

		.scale-button {
			width: 44px;
			height: 44px;
			font-size: 0.9375rem;
		}
	}
</style> 