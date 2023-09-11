import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
	baseURL,
	headers: {
		Accept: 'application/json',
	},
});

export default axiosInstance;
