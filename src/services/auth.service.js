import axios from "axios";

const API_URL = "https://order-book-online.herokuapp.com";

// Default Axios config
const axiosHeaders = axios.defaults.headers;
axiosHeaders.post["Content-Type"] = "application/json";

/*Authentication requests*/
const signUpRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_up/`, data)
		.catch((error) => error);
};

const signInRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_in/`, data)
		.catch((error) => error);
};

export { signUpRequest, signInRequest};