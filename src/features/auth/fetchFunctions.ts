import axiosBase from '../../app/api';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

export function login(credentials: ICreds) {
	axiosBase.post('/auth/login', {
		data: credentials
	});
}

export function signup(credentials: ICreds) {
	axiosBase.post('/auth/signup', {
		data: credentials
	});
}

export function sendLogout() {
	axiosBase.post('/auth/logout');
}

export function refresh() {
	axiosBase.get('/auth/refresh');
}
