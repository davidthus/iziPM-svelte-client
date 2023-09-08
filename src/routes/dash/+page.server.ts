import { getUserProjects } from '@/features/projects/queryFunctions';
import { getUser } from '@/features/users/queryFunctions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { user } = await getUser();
	const { projects } = await getUserProjects();

	return { user, projects };
};
