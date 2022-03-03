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

		/* AUTHENTICATION ERRORS*/

		// Email conflict
		if (errorResponse.status === 409) {
			if (errorResponseText.error) {
				dispatch(
					setServerMessage({
						status: errorResponse.status,
						messageType: "Email_Conflict",
						detail: errorResponseText.error
					})
				);	
			}
		}

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

		/* LOAN REQUEST ERRORS */
		
		// Unprocessed entity
		if (errorResponse.status === 422) {
			dispatch(setServerMessage({
				status: errorResponse.status,
				messageType: code ? code : "Unprocessed_Entity",
				detail: "This loan has been published before",
			}));
		}
	}
}