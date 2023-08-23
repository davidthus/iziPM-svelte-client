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
