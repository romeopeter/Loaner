import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
	const location = useLocation();
	const userStateObj = useSelector((state) => state.auth);
	
	const { isLoggedIn, user } = userStateObj;
	const userTypeFromPathName = location.pathname.split("/")[1].toLowerCase();
	const userTypeFromState = user !== null && user.user.groups[0].name.toLowerCase();


	if (user !== null && isLoggedIn === true && userTypeFromPathName === userTypeFromState) {
		return (children);
	} else {
		return (<Navigate to="/login" replace state={{ path: location.pathname }} />);
	}
}