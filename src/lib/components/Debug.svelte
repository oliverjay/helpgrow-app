<script lang="ts">
	import { profile } from '$lib/stores/profile.svelte';

	function increment() {
		profile.responsesReceived++;
	}

	function decrement() {
		if (profile.responsesReceived > 0) {
			profile.responsesReceived--;
		}
	}

	function toggleUnlocked() {
		profile.resultsUnlocked = !profile.resultsUnlocked;
	}
</script>

<div class="debug-panel">
	<div class="controls">
		<button onclick={decrement}>-</button>
		<span>Responses</span>
		<button onclick={increment}>+</button>
		<button onclick={toggleUnlocked}>Toggle Unlocked</button>
	</div>
	<pre>{JSON.stringify(profile, null, 2)}</pre>
</div>

<style>
	.debug-panel {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		background: rgba(20, 20, 20, 0.85);
		color: #a7f3d0; /* A light green for better readability */
		padding: 1rem;
		border-radius: 8px;
		z-index: 9999;
		font-family: monospace;
		font-size: 12px;
		max-width: 400px;
		max-height: 300px;
		overflow: auto;
		border: 1px solid var(--color-border-primary);
		backdrop-filter: blur(4px);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.controls button {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		font-family: monospace;
	}

	.controls button:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.controls span {
		color: white;
	}
</style> 