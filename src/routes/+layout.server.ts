import { getUser } from '@/features/users/queryFunctions';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { LayoutServerLoad } from './$types';

const newProjectSchema = z.object({
	projectName: z.string().min(3).max(40)
});

export const load: LayoutServerLoad = async () => {
	const user = await getUser();
	const newProjectForm = await superValidate(newProjectSchema);

	return { user, newProjectForm };
};
