import React from 'react'
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth"

export default function RequireAuth({children}) {
	const {auth} = useAuth();
	const location = useLocation();

	if (auth) {
		return (children)
	} else {
		return <Navigate to="/login" replace state={{path: location.pathname}} />
	}
}