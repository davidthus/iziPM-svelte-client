import axios from 'axios';

const axiosBase = axios.create({
	baseURL: 'http://localhost:3500',
	timeout: 1000,
	headers: { authorization: 'foobar' }
});

export default axiosBase;
