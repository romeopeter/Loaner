import { setServerMessage, setClientMessage } from "../messageSlice";

export default function authRequestError(error, dispatch) {

    const requestError = error.request;
    const responseText = JSON.parse(requestError.responseText);
	const { code, detail } = responseText;

    // Network error, unable to sent request
	if (error.message === "Network Error") {
		// Dipatch action
		dispatch(
			setClientMessage({
				status: null,
				messageType: "network_error",
				message: "Network error",
				detail: "Poor network connection. Try signing in again",
			})
		);

		return;
	}

    // Email conflict
    if (requestError.status === 409) {

        if (responseText.error) {
            dispatch(
                setServerMessage({
                    status: requestError.status,
                    messageType: "Email_Conflict",
                    detail: responseText.error
                })
            );	
        }

        return
    }

    // Unauthorized access
    if (requestError.status === 401) {
        dispatch(
            setServerMessage({
                status: requestError.status,
                messageType: code,
                detail: detail,
            })
        );

        return;
    }
}