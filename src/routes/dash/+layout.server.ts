import { queryClient } from '$lib/query';
import { fail } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { UseQueryStoreResult } from '@sveltestack/svelte-query';
import { useMutation, useQuery } from '@sveltestack/svelte-query';
import type { AxiosResponse } from 'axios';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { createProject } from '../../features/projects/queryFunctions.js';
import { getUser } from '../../features/users/queryFunctions';

// Define the expected type for the useQuery result
type UserQueryResult = UseQueryStoreResult<
	AxiosResponse<any, any>,
	unknown,
	AxiosResponse<any, any>,
	'user'
>;

const newProjectSchema = z.object({
	projectName: z.string().min(4).max(30)
});

const { mutate: createProjectMutation } = useMutation(createProject, {
	onSuccess: () => {
		queryClient.invalidateQueries();
	}
});

const queryResult: UserQueryResult = useQuery('user', getUser);
const userData = queryResult as unknown as { data: any };

export const load = async (event) => {
	// Server API:
	const form = await superValidate(event, newProjectSchema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }: { request: ServerRequest }) => {
		const form = await superValidate(request, newProjectSchema);
		const isUserDefined = typeof userData?.data._id !== 'undefined';
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated data
		if (isUserDefined) {
			createProjectMutation(request.formData().projectName, userData);
		}
		// Yep, return { form } here too
		return { form };
	}
};
