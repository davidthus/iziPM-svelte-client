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

export async function getUserProjects(): Promise<{ projects: IProject[] }> {
	return await request({ url: '/users/projects' });
}

export async function createProject(newProject: INewProject): Promise<ICreatedProject> {
	return await request({ url: '/projects', method: 'post', data: { ...newProject } });
}
