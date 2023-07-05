import { request } from '../../app/api';
import type { IProject } from '../../types/project';

interface INewProject {
	userId: string;
	projectName: string;
}

interface ICreatedProject {
	message: string;
	projectId: string;
}

export function getUserProjects(): Promise<IProject> {
	return request({ url: '/users/projects' });
}

export function createProject(newProject: INewProject): Promise<ICreatedProject> {
	return request({ url: '/projects', method: 'post', data: { ...newProject } });
}
