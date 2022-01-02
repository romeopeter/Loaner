import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
	const location = useLocation();

	const { isLoggedIn } = useSelector((state) => state.auth);
	const testLogin = true;

	return isLoggedIn === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}