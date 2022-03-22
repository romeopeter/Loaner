import axios from "axios";

const getPayments = () => {
	return axios.get("/v1/payments/").catch(error => error);
}

const getPayment = (ID) => {
	return axios.get(`/v1/payments/${ID}`).catch(error => error);
}

const uploadPayment = (data) => {
	return axios.post("/v1/payments/", data).catch(error => error)
}

export {getPayments, getPayment, uploadPayment}