import React from 'react';
import DocumentHead from "./DocumentHead";
import {Link}  from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<DocumentHead title="404-Not found" />
			<div id="orderbook-not-found" className="flex flex-col justify-center items-center h-full w-full">
				<h1 className="lead text-3xl sm:text-6xl px-10 py-5 sm:p-10 mb-5 text-gray-400">OH SORRY!</h1>
				<p className="text-center text-xl sm:text-2xl text-gray-600 mb-5 p-5">404 - You've come to a page that doesn't exist</p>
				<p className="text-xl">
					Go{" "}<Link to="/" className="underline">home</Link>
				</p>
			</div>
		</>
	)
}

export default NotFound