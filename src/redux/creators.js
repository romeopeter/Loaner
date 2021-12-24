import axios from "axios";

const serverURL = "https://order-book-online.herokuapp.com/swagger_ui/";

// Default Axios config
const axiosHeaders = axios.defaults.headers;
const authToken = localStorage.getItem("AUTH_TOKEN");
axiosHeaders.post['Content-Type'] = "application/json";
if (authToken) {
	axiosHeaders.common['Authorization'] = `Token ${authToken}`
}

// Authentication request
const signUpFunc = (data) => {
	return axios
		.post(`${serverURL}/api/v1/registration/sign_up/`, data)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
};

const signInFunc = (data) => {
	return axios
		.post(`${serverURL}/api/v1/registration/sign_in/`, data)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
};

const signOutFunc = () => {
	return axios
		.post(`${serverURL}/api/v1/registration/sign_out/`)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
};

export {signUpFunc, signInFunc, signOutFunc};