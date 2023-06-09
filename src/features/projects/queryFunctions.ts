import axiosBase from '../../app/api';

interface INewProject {
	userId: string;
	projectName: string;
}

export function getUserProjects() {
	axiosBase.get('/users/projects');
}

export function createProject(newProject: INewProject) {
	axiosBase.post('/projects', {
		data: { ...newProject }
	});
}
