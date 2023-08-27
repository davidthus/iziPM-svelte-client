import type { LayoutServerLoad } from './$types';
import { getUser } from '@/features/users/queryFunctions';

export const load: LayoutServerLoad = async () => {
	const user = await getUser();
	return { user };
};
