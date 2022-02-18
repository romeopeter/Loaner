import axios from "axios";
import jwt_decode from "jwt-decode";

async function axiosConfig() {
	console.log("Config initiated");

	axios.defaults.baseURL = 'https://order-book-online.herokuapp.com"';
	axios.defaults.headers.post['Content-Type'] = 'application/json';

	const currentUser = JSON.parse(localStorage.getItem("USER"));

	if (currentUser !== null && typeof currentUser === "object") {
		let {tokens: { refresh} } = currentUser;

		// eslint-disable-next-line no-undef
		const decode = jwt_decode(access, {complete: true});
		const tokenExpirationDate = decode.exp;
		const currentDate = new Date();

		if (tokenExpirationDate < currentDate.getTime()) {
			// Make new request for access token
			console.log("Getting new token")

			const response = await axios.post(
				`https://order-book-online.herokuapp.com/api/v1/token/refresh/`,
				{ refresh: `${refresh}` }
			);

			// Update local storage with new token
			const newAccessToken = response.data.access;
			currentUser.tokens.access = newAccessToken;
		}
	}
}

export default axiosConfig;