import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE } from '$env/static/private';

// Create an admin client with service role key for elevated permissions
// This should ONLY be used on the server-side
export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
}); 