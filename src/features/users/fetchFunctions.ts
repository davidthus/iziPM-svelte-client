import axiosBase from '../../app/api';

export function getUser() {
	axiosBase.get('/users', { headers: {} });
}
