import { request } from '../../app/api';
import type { IUser } from '../../types/user';

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

export function getUser(): Promise<{ user: IUser }> {
	return request({ url: '/users' });
}

export function updateUser(newUserInfo: InewUserInfo): Promise<{ message: string }> {
	return request({ url: '/users', method: 'patch', data: { ...newUserInfo } });
}
