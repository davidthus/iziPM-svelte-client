import axiosBase from '../../app/api';
import { auth } from '../auth/auth';

let authObj: { accessToken: string; userId: string };

auth.subscribe((value) => {
	authObj = value;
});

export function getUser() {
	axiosBase.get('/users', {
		headers: {
			authorization: `Bearer ${authObj.accessToken}`
		}
	});
}
