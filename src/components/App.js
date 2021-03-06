import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import AppRoutes from "./AppRoutes";
// eslint-disable-next-line no-unused-vars
import AppErrorBoundary from "./AppErrorBoundary";

// import { signOutAsync } from "../redux/authSlice";
import { signOutAction } from "../redux/authSlice";
import { setClientMessage } from "../redux/messageSlice.js";

export default function App() {
    const userObj = JSON.parse(localStorage.getItem("USER"));
    const dispatch = useDispatch();

    // Set default endpoint URL and Authorization key
    axios.defaults.baseURL = "https://order-book-online.herokuapp.com/";
    axios.defaults.headers.post["Content-Type"] = "application/json";

    if (userObj !== null && userObj.hasOwnProperty("tokens")) {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${userObj.tokens.access}`;
    }

    // Interceptor checks response for expire on invalid token
    axios.interceptors.response.use(
        (response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            return response
        },
        async (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            const response = error.response;

            if (response.status === 401 && response.statusText === "Unauthorized") {
                const message = dispatch(
                    setClientMessage({
                        status: 401,
                        messageType: "token_not_valid",
                        message: "Unauthorized: Token is invalid or expired",
                        detail: "Login token is expired. Please sign in",
                    })
                );

                const messageObj =
                    typeof message.payload === "object" && message.payload;

                if (messageObj !== false) {
                    if (
                        messageObj.messageType !== undefined &&
                        messageObj.messageType === "token_not_valid"
                    ) {
                        // Sign user out
                        const signOut = await dispatch(signOutAction());

                        if (signOut.type === "auth/signOutAction") window.location.reload() 
                    }
                }
            }
        }
    );

    //Remove interceptors

    return (
        // <AppErrorBoundary>
        <AppRoutes />
        // </AppErrorBoundary>
    );
}
