/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { auth, setCredentials } from '../features/auth/auth';
import getTokenPayload from '../util/getTokenPayload';

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

export async function request<ReturnData>({ ...options }: AxiosRequestConfig): Promise<ReturnData> {
	try {
		const response: AxiosResponse<ReturnData> = await client<ReturnData>(options);
		return response.data;
	} catch (error: any) {
		if (error?.response?.status === 403 || error?.response?.status === 401) {
			try {
				const refreshResponse: AxiosResponse<{ accessToken: string }> = await client({
					url: '/auth/refresh'
				});
				const { accessToken, userId } = getTokenPayload(refreshResponse.data.accessToken);
				setCredentials(accessToken, userId);

				// Retry original query with new access token
				const retryResponse: AxiosResponse<ReturnData> = await client<ReturnData>(options);
				return retryResponse.data;
			} catch ({ response: refreshError }: any) {
				if (refreshError.status === 403) {
					refreshError.data.message = 'Your login has expired. ';
				}

				throw refreshError;
			}
		} else {
			throw error;
		}
	}
}

export default client;
