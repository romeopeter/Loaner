import axios from "axios";

const serverURL = "https://order-book-online.herokuapp.com";

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
		.post(`${serverURL}/api/v1/registration/sign_up/`, data)
		.then((response) => response.data)
		.catch((error) => error);
};

const signInRequest = (data) => {
	return axios
		.post(`${serverURL}/api/v1/registration/sign_in/`, data)
		.then((response) => response.data)
		.catch((error) => error);
};

const signOutRequest = () => {
	return axios
		.post(`${serverURL}/api/v1/registration/sign_out/`)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
};

export {signUpRequest, signInRequest, signOutRequest};