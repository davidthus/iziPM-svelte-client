import axios from 'axios';
import { auth, setCredentials } from '../features/auth/auth';
import getTokenPayload from '../util/getTokenPayload';

interface Response {
	data: unknown;
	status: number;
	headers: unknown;
	config: unknown;
}

let accessToken: string;

auth.subscribe(({ accessToken: accessTokenValue }) => {
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

export async function request({ ...options }) {
	const result = client(options).catch((error) => {
		if (error?.response.status === 403 || error?.response.status === 401) {
			// start of if block
			client({ url: '/auth/refresh' })
				.then((res: Response) => {
					const typedRefreshResult = res.data as { accessToken: string };
					const { accessToken, userId } = getTokenPayload(typedRefreshResult.accessToken);
					setCredentials(accessToken, userId);

					// retry original query with new access token
					return client(options);
				})
				.catch(function (error) {
					const refreshError = error.response as {
						status: number;
						data: { message: string };
					};

					if (error.status === 403) {
						error.data.message = 'Your login has expired. ';
					}

					return refreshError;
				});
			// end of if block
		}
	});

	return result?.data;
}

export default client;
