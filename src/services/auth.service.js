import axios from "axios";

const API_URL = "https://order-book-online.herokuapp.com";

// Default Axios config
const axiosHeaders = axios.defaults.headers;
const currentUser = JSON.parse(localStorage.getItem("USER"));
axiosHeaders.post["Content-Type"] = "application/json";

if (currentUser?.tokens.access !== undefined) {
	axiosHeaders.common["Authorization"] = `Bearer ${currentUser.tokens.access}`;
}

/*Authentication requests*/
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
				localStorage.setItem("USER", JSON.stringify(response.data));
			}

			return response.data;
		})
		.catch((error) => error);
};

const signOutRequest = () => {
	localStorage.removeItem("USER");
};

/*Authentication requests*/
const loanRequest = (data) => {
	const requestURL = "https://order-book-online.herokuapp.com";

	return axios
		.post(`${requestURL}/api/v1/loan_request/cp/`, data)
		.catch((error) => error);

        // Get refresh token
        const {tokens: {refresh}} = JSON.parse(localStorage.getItem("USER"));

        // Modify header in config

        // Make new request for access token

        // Save token in storage
};

export { signUpRequest, signInRequest, loanRequest };