import axios from "axios";

const getPayments = () => {
	retunr axios.get("/v1/payments/").catch(error => error);
}

const getPayment = (ID) => {
	retunr axios.get(`/v1/payments/${ID}`).catch(error => error);
}

const makePayment = () => {
	return axios.post("/v1/payments/").catch(error => error)
}