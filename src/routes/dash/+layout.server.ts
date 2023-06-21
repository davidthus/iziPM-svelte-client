import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { useMutation } from '@sveltestack/svelte-query';
import { queryClient } from '$lib/query';
import { z } from 'zod';
import { getUser } from '../../features/users/queryFunctions';
import { createProject } from '../../features/projects/queryFunctions.js';

const newProjectSchema = z.object({
	projectName: z.string().min(4).max(30)
});

const { mutate: createProjectMutation } = useMutation(createProject, {
	onSuccess: () => {
		queryClient.invalidateQueries();
	}
});
const { data: userData } = useQuery('user', getUser);

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	// Server API:
	const form = await superValidate(event, newProjectSchema);

	// Always return { form } in load and form actions.
	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, newProjectSchema);
		const isUserDefined = typeof userData?.user._id !== 'undefined';
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		if (isUserDefined) {
			createProjectMutation(projectName, userData);
		}
		// Yep, return { form } here too
		return { form };
	}
};
