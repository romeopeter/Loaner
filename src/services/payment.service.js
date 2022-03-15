import axios from "axios";

const getPayments = () => {
	return axios.get("/v1/payments/").catch(error => error);
}

const getPayment = (ID) => {
	return axios.get(`/v1/payments/${ID}`).catch(error => error);
}

const makePayment = () => {
	return axios.post("/v1/payments/").catch(error => error)
}