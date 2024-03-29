import { redirect } from '@sveltejs/kit';
import { auth } from 'auth/auth';
import type { LayoutServerLoad } from './$types';

let authObject: { accessToken: string; userId: string };

auth.subscribe((value) => {
	authObject = value;
});

export const load: LayoutServerLoad = async () => {
	if (authObject.accessToken || authObject.userId) {
		throw redirect(308, '/dash');
	}
};
