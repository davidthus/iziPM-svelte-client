import client from '../../app/api';
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

export function getUser() {
	return client.get('/users', {
		headers: {
			authorization: `Bearer ${authObj.accessToken}`
		}
	});
}

export function updateUser(newUserInfo: InewUserInfo) {
	return client.patch('/users', { data: { ...newUserInfo } });
}
