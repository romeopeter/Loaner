import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
	const location = useLocation();

	const isLoggedIn = JSON.parse(localStorage.getItem("IS_LOGGED_IN"));

	return isLoggedIn === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}