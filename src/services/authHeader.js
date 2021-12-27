export default function() {
	const user = JSON.Parse(localStorge.getItem("USER"));

	if (user && user.tokens.access) {
		return {Authorization: `Token ${user.tokens.access}`}
	}

	return {}
}