import axiosBase from '../../app/api';

interface INewProject {
	userId: string;
	projectName: string;
}

export function getUserProjects() {
	return axiosBase.get('/users/projects');
}

export function createProject(newProject: INewProject) {
	return axiosBase.post('/projects', {
		data: { ...newProject }
	});
}
