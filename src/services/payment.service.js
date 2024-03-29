import axios from "axios";

const getPayments = () => {
	return axios.get("/v1/payments/");
}

const getPayment = (id) => {
	return axios.get(`/v1/payments/${id}`).catch(error => error);
}

const uploadPayment = (data) => {
	return axios.post("/v1/payments/", data).catch(error => error)
}

const updatePayment = ({id, data}) => {
	return axios.patch(`/v1/payments/${id}`, data);
}

export {getPayments, getPayment, uploadPayment, updatePayment}