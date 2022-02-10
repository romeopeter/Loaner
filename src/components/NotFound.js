import React from 'react';
import DocumentHead from "./DocumentHead";
import {Link}  from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<DocumentHead title="404-Not found" />
			<div id="orderbook-not-found" className="flex flex-col justify-center items-center h-full w-full">
				<p id="lead-intro" className="text-3xl sm:text-8xl px-10 pt-5 sm:px-10 sm:pt-10 text-black">Oh Sorry!</p>
				<h1 id="lead-404" className="text-center font-bold text-6xl sm:text-9xl text-gray-600 py-2">404</h1>
				<p id="message" className="lead text-2xl sm:text-3xl md:text-5xl sm:px-40 sm:mx-auto mb-5 text-center text-black">YOU’VE COME TO A PAGE THAT DOESN’T EXIST</p>
				<p id="go-home" className="text-md sm:text-2xl py-2 px-5 sm:py-4 sm:px-10">
					<Link to="/" className="text-white text-center font-bold">Go to homepage</Link>
				</p>
			</div>
		</>
	)
}

export default NotFound