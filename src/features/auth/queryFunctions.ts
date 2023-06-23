import axiosBase from '../../app/api';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

export function login(credentials: ICreds) {
	return axiosBase.post('/auth/login', {
		data: credentials
	});
}

export function signup(credentials: ICreds) {
	return axiosBase.post('/auth/signup', {
		data: credentials
	});
}

export function sendLogout() {
	return axiosBase.post('/auth/logout');
}

export function refresh() {
	return axiosBase.get('/auth/refresh');
}
