import axiosBase from '../../app/api';
import { auth } from '../auth/auth';

let authObj: { token: string; userId: string };

auth.subscribe((value) => {
	authObj = value;
});

export function getUser() {
	axiosBase.get('/users', {
		headers: {
			authorization: `Bearer ${authObj.token}`
		}
	});
}
