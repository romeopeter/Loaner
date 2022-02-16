import axios from "axios";
import axiosConfig from "./authHeader";

axiosConfig();

const API_URL = "https://order-book-online.herokuapp.com";

const currentUser = JSON.parse(localStorage.getItem("USER"));
const accessToken = currentUser.tokens.access;

const header = {headers: {
	"Authorization": `${accessToken}`,
}}

const getOffers = () => {
	return axios.get(`${API_URL}/api/v1/loan_request/`, header).catch(error => console.log(error));
}


const loanRequestCP = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/cp/`, data, header)
		.catch((error) => error);
};

const loanRequestBond = (data) => {

	return axios
		.post(`${API_URL}/api/v1/loan_request/bonds/`, data, header)
		.catch((error) => error);
};

export { loanRequestCP, loanRequestBond, getOffers };