import { getUser } from '@/features/users/queryFunctions';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const user = await getUser();
	return { user };
};
