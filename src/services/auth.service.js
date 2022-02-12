import axios from "axios";
import axiosConfig from "./authHeader";

axiosConfig();

const API_URL = "https://order-book-online.herokuapp.com";

/*Authentication requests*/
const signUpRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_up/?is_superuser=True`, data)
		.catch((error) => error);
};

const signInRequest = (data) => {
	return axios
		.post(`${API_URL}/api/v1/registration/sign_in/`, data)
		.catch((error) => error);
};

export { signUpRequest, signInRequest};