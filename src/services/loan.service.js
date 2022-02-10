import axios from "axios";
import axiosConfig from "./authHeader";


// Default Axios config
axiosConfig();

const API_URL = "https://order-book-online.herokuapp.com";

const getOffers = axios.get(`${API_URL}/api/v1/loan_request/cp/`).catch(error => console.log(error));


const loanRequestCP = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/cp/`, data)
		.catch((error) => error);

        // Get refresh token
        const {tokens: {refresh}} = JSON.parse(localStorage.getItem("USER"));
};

const loanRequestBond = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/bonds/`, data)
		.catch((error) => error);
};

export { loanRequestCP, loanRequestBond, getOffers };