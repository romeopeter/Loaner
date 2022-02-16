import axios from "axios";
import axiosConfig from "./authHeader";

const getOffers = () => {
	return axios
		.get("/api/v1/loan_request/")
		.catch((error) => console.log(error));
};

const loanRequestCP = (data) => {
	return axios.post("/api/v1/loan_request/cp/", data).catch((error) => error);
};

const loanRequestBond = (data) => {
	return axios
		.post("/api/v1/loan_request/bonds/", data)
		.catch((error) => error);
};

export { loanRequestCP, loanRequestBond, getOffers };