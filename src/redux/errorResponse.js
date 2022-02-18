import { setServerMessage } from "./messageSlice";

export default function handleRequestError(errorResponse, dispatch) {
	const response = errorResponse;

	// Network error, unable to sent request
	if (response.message === "Network Error") {
		// Dipatch action
		dispatch(
			setServerMessage({
				status: null,
				messageType: "network_error",
				message: "Network error",
				detail: "Poor network connection. Try signing in again",
			})
		);

		return;
	}

	// Request sent but unsuccessful
	if ("stack" in response) {
		const errorResponse = response.request;
		const errorResponseText = JSON.parse(errorResponse.responseText);
		const { code, detail } = errorResponseText;

		// Unauthorized access
		if (errorResponse.status === 401) {
			dispatch(
				setServerMessage({
					status: errorResponse.status,
					messageType: code,
					detail: detail,
				})
			);

			return;
		}
	}
}