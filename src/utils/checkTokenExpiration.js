import axios from "axios";
import jwt_decode from "jwt-decode";

async function checkTokenExpiration() {

	const currentUser = JSON.parse(localStorage.getItem("USER"));

	if (currentUser !== null && typeof currentUser === "object") {
		let {tokens: { refresh, access} } = currentUser;

		const decode = jwt_decode(access, {complete: true});
		const tokenExpirationDate = decode.exp / 1000;
		const currentDate = new Date();

		if (tokenExpirationDate < currentDate.getTime()) {
			// Make new request for access token
			console.log("Old token expired. Getting new token...")

			const response = await axios.post(
				`https://order-book-online.herokuapp.com/v1/token/refresh/`,
				{ refresh: `${refresh}` }
			);

			// Update local storage object
			const newAccessToken = response.data.access;
			currentUser.tokens.access = newAccessToken;

			// save local storage object
			localStorage.setItem("USER", JSON.stringify(currentUser));
		} else {
			console.log("Old token valid")
		}
	}
}

export default checkTokenExpiration;