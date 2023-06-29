import client from '../../app/api';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

export function login(credentials: ICreds) {
	return client.post('/auth/login', {
		data: credentials
	});
}

export function signup(credentials: ICreds) {
	return client.post('/auth/signup', {
		data: credentials
	});
}

export function sendLogout() {
	return client.post('/auth/logout');
}

export function refresh() {
	return client.get('/auth/refresh');
}
