import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode';

import AppRoutes from "./AppRoutes";

import signOutAsync from "../redux/authSlice";
import setClientMessage from "../redux/messageSlice.js";

function App() {
    const userObj = JSON.parse(localStorage.getItem("USER"));
    const decodeToken = jwt_decode;
    const dispatch = useDispatch;
    const navigate = useNavigate();

    // Set default endpoint URL and Authorization key
    axios.defaults.baseURL = "https://order-book-online.herokuapp.com/";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = undefined;

    if (userObj !== null && userObj !== false) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userObj.tokens.access}`;
    }


    useEffect(() => {
        // Check token expiration
        if (userObj !== null && typeof userObj === "object") {
            let {tokens: { access }} = userObj;
            const decodedToken = decodeToken(access);
            const currentDate = new Date();

            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                dispatch(signOutAsync).then(() => {
                    dispatch(setClientMessage({
                        status: null,
                        messageType: "token_expired", 
                        message: "Token expired", 
                        detail: "Login token is expired. Please sign in"
                    }));

                    // Redirect to login page
                    navigate("/login")
                });
            }
        }
    }, [])

    return (<AppRoutes />);
}

export default App;
