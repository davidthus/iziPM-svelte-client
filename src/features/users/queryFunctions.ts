import { request } from '../../app/api';
import type { IUser } from '../../types/user';
import { auth } from '../auth/auth';

interface InewUserInfo {
	userId: string;
	avatar?: {
		data: Buffer;
		contentType: string;
	};
	password?: string;
	notes: string;
	username: string;
}

let authObj: { accessToken: string; userId: string };

auth.subscribe((value) => {
	authObj = value;
});

export function getUser(): Promise<{ user: IUser }> {
	return request({ url: '/users', headers: { authorization: `Bearer ${authObj.accessToken}` } });
}

export function updateUser(newUserInfo: InewUserInfo): Promise<{ message: string }> {
	return request({ url: '/users', method: 'patch', data: { ...newUserInfo } });
}
