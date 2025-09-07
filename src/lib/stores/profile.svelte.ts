import type { User } from '@supabase/supabase-js';

type Profile = {
	user: User | null;
	responsesReceived: number;
	resultsUnlocked: boolean;
};

/**
 * A reactive store holding the user's profile data.
 * This is designed to be easily synced with Supabase.
 */
export const profile = $state<Profile>({
	user: null,
	responsesReceived: 0,
	resultsUnlocked: false
}); 