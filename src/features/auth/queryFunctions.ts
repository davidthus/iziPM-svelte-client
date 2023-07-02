import { request } from '../../app/api';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

export function login(credentials: ICreds) {
	return request({ url: '/auth/login', data: credentials });
}

export function signup(credentials: ICreds) {
	return request({ url: '/auth/signup', data: credentials });
}

export function sendLogout() {
	return request({ url: '/auth/logout' });
}

export function refresh() {
	return request({ url: '/auth/refresh' });
}
