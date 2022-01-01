import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
	const location = useLocation();

	const currentUser = JSON.parse(localStorage.getItem("USER"));
	const isLoggedIn = currentUser.tokens.access;
	const testLogin = true;

	return isLoggedIn === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}