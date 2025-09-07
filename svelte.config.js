import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({
			// Vercel adapter options
			runtime: 'nodejs20.x',
			regions: ['iad1'], // US East for better performance
			memory: 1024
		})
	}
};

export default config;
