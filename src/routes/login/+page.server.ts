import { setCredentials } from '@/features/auth/auth';
import { login } from '@/features/auth/queryFunctions';
import getTokenPayload from '@/util/getTokenPayload';
import { redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(40)
});

export const load = async () => {
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		const { accessToken } = await login({ email, password });
		const { userId } = getTokenPayload(accessToken);
		setCredentials(accessToken, userId);
		redirect(308, '/dash');
	}
};
