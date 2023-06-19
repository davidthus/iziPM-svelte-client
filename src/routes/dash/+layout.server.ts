import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { createProject } from '../../features/projects/queryFunctions.js';

const newProjectSchema = z.object({
	projectName: z.string().min(4).max(30)
});

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
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		await createProject(request.formData());
		// Yep, return { form } here too
		return { form };
	}
};
