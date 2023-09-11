import { page } from '$app/stores';
import { getUser } from '@/features/users/queryFunctions';
import { redirect } from '@sveltejs/kit';
import { auth } from 'auth/auth';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { LayoutServerLoad } from './$types';

let authObject: { accessToken: string; userId: string };

auth.subscribe((value) => {
	authObject = value;
});

const newProjectSchema = z.object({
	projectName: z.string().min(3).max(40)
});

export const load: LayoutServerLoad = async ({ url }) => {
	const newProjectForm = await superValidate(newProjectSchema);

	if (authObject.accessToken || authObject.userId) {
		const user = await getUser();
		return { user, newProjectForm };
	} else {
		if (url.pathname !== '/signup') {
			throw redirect(308, '/signup');
		}
	}
};
