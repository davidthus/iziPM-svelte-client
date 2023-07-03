import { request } from '../../app/api';

interface INewProject {
	userId: string;
	projectName: string;
}

export function getUserProjects() {
	return request({ url: '/users/projects' });
}

export function createProject(newProject: INewProject) {
	return request({ url: '/projects', method: 'post', data: { ...newProject } });
}
