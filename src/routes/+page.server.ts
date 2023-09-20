import type { PageServerLoad } from './$types';
import { auth } from 'auth/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	auth.subscribe(({ accessToken, userId }: { accessToken: string; userId: string }) => {
		if (accessToken || userId) {
			throw redirect(308, '/dash');
		}
	});
};
