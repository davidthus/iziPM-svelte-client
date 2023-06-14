import { auth } from '../features/auth/auth';
import type { IProject } from '../types/project';
import type { IUser } from '../types/user';
import getTokenPayload from '../util/getTokenPayload';

// 0,1,2 integers

export enum userRoles {
	member,
	projectManager,
	owner
}

type returnValues = userRoles.member | userRoles.projectManager | userRoles.owner | false;

export default function useAuth(projectId: string, data: { projects: IProject[] }): returnValues {
	let status: returnValues = false;
	// false if user is not in the project (in the members array)

	auth.subscribe(({ accessToken }) => {
		if (typeof data !== 'undefined' && accessToken) {
			const { userId } = getTokenPayload(accessToken);
			const project = data.projects.find((project: IProject) => project._id === projectId);

			if (!project) {
				return status;
			}

			const isUserOwner = project.owner._id === userId;
			const isUserPM = project.projectManagers.find((pm: IUser) => pm._id === userId)
				? true
				: false;

			if (isUserOwner) {
				status = userRoles.owner;
				return status;
			} else if (isUserPM) {
				status = userRoles.projectManager;
				return status;
			} else {
				status = userRoles.member;
				return status;
			}
		}
	});
	// returns false if user isnt in the project
	return status;
}
