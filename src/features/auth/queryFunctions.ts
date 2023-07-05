import { request } from '../../app/api';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

interface IAccessToken {
	accessToken: string;
}

export function login(credentials: ICreds): Promise<IAccessToken> {
	return request({ url: '/auth/login', data: credentials });
}

export function signup(credentials: ICreds): Promise<IAccessToken> {
	return request({ url: '/auth/signup', data: credentials });
}

export function sendLogout(): Promise<{ message: string }> {
	return request({ url: '/auth/logout' });
}

export function refresh(): Promise<IAccessToken> {
	return request({ url: '/auth/refresh' });
}
