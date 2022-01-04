import axios from "axios";

const API_URL = "https://order-book-online.herokuapp.com";

// Default Axios config
const axiosHeaders = axios.defaults.headers;
const authToken = localStorage.getItem("AUTH_TOKEN");
axiosHeaders.post['Content-Type'] = "application/json";
if (authToken) {
	axiosHeaders.common['Authorization'] = `Token ${authToken}`
}

// Authentication request
const signUpRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_up/`, data)
		.catch((error) => error);
};

const signInRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_in/`, data)
		.then((response) => {
			if (response.data.tokens.access) {

				// Store access token in browser storage
				localStorage.setItem("USER", JSON.stringify(response.data))
			}

			return response.data
		})
		.catch((error) => error);
};

const signOutRequest = () => {
	localStorage.removeItem("USER");
};

export {signUpRequest, signInRequest, signOutRequest};