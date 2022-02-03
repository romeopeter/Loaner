import axios from "axios";


// Default Axios config
const axiosHeaders = axios.defaults.headers;
const currentUser = JSON.parse(localStorage.getItem("USER"));
axiosHeaders.post["Content-Type"] = "application/json";

if (currentUser?.tokens.access !== undefined) {
	axiosHeaders.common["Authorization"] = `Bearer ${currentUser.tokens.access}`;
}

const API_URL = "https://order-book-online.herokuapp.com";


const loanRequestCP = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/cp/`, data)
		.catch((error) => error);

        // Get refresh token
        const {tokens: {refresh}} = JSON.parse(localStorage.getItem("USER"));

        // Modify header in config

        // Make new request for access token

        // Save token in storage
};

const loanRequestBond = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/bonds/`, data)
		.catch((error) => error);
};

export { loanRequestCP, loanRequestBond };