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

export async function getUser(): Promise<{ user: IUser }> {
	return await request({ url: '/users' });
}

export function updateUser(newUserInfo: InewUserInfo): Promise<{ message: string }> {
	return request({ url: '/users', method: 'patch', data: { ...newUserInfo } });
}
