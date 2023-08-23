import { request } from '../../app/api';
import getTokenPayload from '../../util/getTokenPayload';
import { setCredentials } from './auth';

interface ICreds {
	email: string;
	password: string;
	username?: string;
}

interface IAccessToken {
	accessToken: string;
}

export function login(credentials: ICreds): Promise<IAccessToken> {
	return request({ url: '/auth/login', method: 'post', data: credentials });
}

export function signup(credentials: ICreds): Promise<IAccessToken> {
	return request({ url: '/auth/signup', method: 'post', data: credentials });
}

export function sendLogout(): Promise<{ message: string }> {
	return request({ url: '/auth/logout', method: 'post' });
}

export function refresh(): Promise<IAccessToken> {
	return request({
		url: '/auth/refresh',
		transformRequest: [
			(data) => {
				const { accessToken, userId } = getTokenPayload(data.accessToken);
				setCredentials(accessToken, userId);
				return data;
			}
		]
	});
}
