import client from '../../app/api';

interface INewProject {
	userId: string;
	projectName: string;
}

export function getUserProjects() {
	return client.get('/users/projects');
}

export function createProject(newProject: INewProject) {
	return client.post('/projects', {
		data: { ...newProject }
	});
}
