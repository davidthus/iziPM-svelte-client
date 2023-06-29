import axios from 'axios';

const client = axios.create({
	baseURL: 'http://localhost:3500'
});

export const request = ({ ...options }) => {
	client.defaults.headers.common.Authorization = `Bearer token`;
	const onSuccess = (response: any) => response;
	const onError = (error: any) => {
		// optionally catch errors here and add additional logging
		return error;
	};

	return client(options).then(onSuccess).catch(onError);
};

export default client;
