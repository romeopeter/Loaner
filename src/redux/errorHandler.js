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

	if (response.status === 400) {
		console.log(errorResponse);
		console.log(response.status)
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

			return
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

		// Unprocessed entity
		if (errorResponse.status === 422) {
			dispatch(setServerMessage({
				status: errorResponse.status,
				messageType: code ? code : "Unprocessed_Entity",
				detail: "This loan has been published before",
			}));
		}

		// Bad request
		if (errorResponse.status === 400) {
			console.log(errorResponse);

			const resUrl = errorResponse.responseURL;

			const cpResUrl = "https://order-book-online.herokuapp.com/v1/loan_request/cp/";
			const bondResUrl = "https://order-book-online.herokuapp.com/v1/loan_request/bond/";

			if (resUrl === cpResUrl) {
				dispatch(setServerMessage({
					status: errorResponse.status,
					messageType: code ? code : "Bad_Request",
					detail: errorResponseText,
				}));
			}

			if (resUrl === bondResUrl) {
				dispatch(setServerMessage({
					status: errorResponse.status,
					messageType: code ? code : "Bad_Request",
					detail: errorResponseText,
				}));
			}

			return
		}
	}
}