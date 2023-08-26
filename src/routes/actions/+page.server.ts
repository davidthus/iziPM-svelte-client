import { sendLogout } from '@/features/auth/queryFunctions';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { logOut } from 'auth/auth';
import { superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
	logout: async () => {
		sendLogout();
		logOut();
		redirect(303, '/');
	},
	createProject: async () => {
		// const form = await superValidate(request, newProjectSchema);
		// const isUserDefined = typeof userData?.data._id !== 'undefined';
		// console.log('POST', form);
		// Convenient validation check:
		// if (!form.valid) {
		// Again, always return { form } and things will just work.
		// 	return fail(400, { form });
		// }
		// TODO: Do something with the validated data
		// if (isUserDefined) {
		// 	createProjectMutation(request.formData().projectName, userData);
		// }
		// Yep, return { form } here too
		// return { form };
	}
};
