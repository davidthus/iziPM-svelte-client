import axios from 'axios';
import { auth } from '../features/auth/auth';
import getTokenPayload from '../util/getTokenPayload';
import { setCredentials } from '../features/auth/auth';

let accessToken;

auth.subscribe(({ accessTokenValue }) => {
	accessToken = accessTokenValue;
});

const client = axios.create({
	baseURL: 'http://localhost:3500',
	withCredentials: true,
	transformRequest: [
		(data, headers) => {
			headers.Authorization = `Bearer ${accessToken}`;
			return data;
		}
	]
});

export const request = async ({ ...options }) => {
	let result = await client(options);

	if (result?.error?.status === 403 || result?.error?.status === 401) {
		const refreshResult = await client({ url: '/auth/refresh' });

		if (refreshResult?.data) {
			const typedRefreshResult = refreshResult.data as { accessToken: string };
			setCredentials(getTokenPayload(typedRefreshResult.accessToken));

			// retry original query with new access token
			result = await client(option);
		} else {
			const error = refreshResult.error as {
				status: number;
				data: { message: string };
			};

			if (error.status === 403) {
				error.data.message = 'Your login has expired. ';
			}

			return refreshResult;
		}
	}
	return result;
};

export default client;
