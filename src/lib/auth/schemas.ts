import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long')
});

export const signupSchema = z
	.object({
		email: z.string().email('Please enter a valid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export const resetPasswordSchema = z.object({
	email: z.string().email('Please enter a valid email address')
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// Client-side validation helpers using the same Zod schemas
export function validateLoginField(field: keyof LoginData, value: string): string {
	try {
		if (field === 'email') {
			loginSchema.shape.email.parse(value);
		} else if (field === 'password') {
			loginSchema.shape.password.parse(value);
		}
		return ''; // No error
	} catch (error) {
		if (error instanceof z.ZodError) {
			return error.issues[0]?.message || 'Invalid input';
		}
		return 'Invalid input';
	}
}

export function validateLoginForm(data: Partial<LoginData>): {
	email: string;
	password: string;
	isValid: boolean;
} {
	const errors = {
		email: '',
		password: ''
	};

	if (data.email !== undefined) {
		errors.email = validateLoginField('email', data.email);
	}
	if (data.password !== undefined) {
		errors.password = validateLoginField('password', data.password);
	}

	return {
		...errors,
		isValid: !errors.email && !errors.password
	};
}
