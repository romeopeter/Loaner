import axios from "axios";
import jwt_decode from "jwt-decode";

export default function axiosConfig() {
	const axiosHeaders = axios.defaults.headers;
	axiosHeaders.post["Content-Type"] = "application/json";

	const currentUser = JSON.parse(localStorage.getItem("USER"));

	if (currentUser !== null && typeof currentUser === "object") {
		let {tokens: {refresh, access}} = currentUser;

		const decode = jwt_decode(access);
		const tokenExpirationDate = decode.exp
		const currentDate = Date.now();

		if (tokenExpirationDate < currentDate / 1000 || access === null) {

			// Make new request for access token
			axios.post(`https://order-book-online.herokuapp.com/api/v1/token/refresh/`, {refresh: `${refresh}`})
			.then(res => {
				const newAccessToken = res.data.access;

				// Reset expired tokem with new one
				access = newAccessToken;
			});

		} else  {
			axiosHeaders.common["Authorization"] = `Bearer ${access}`;
		}
	}
}