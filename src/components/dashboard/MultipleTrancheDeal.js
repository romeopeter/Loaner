import React from "react";
import {Link}  from "react-router-dom";

export default function ArchivedDeals() {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full" style={{ height: "100vh" }}>
			<h1 className="lead text-3xl sm:text-6xl px-10 py-5 sm:p-10 mb-5 text-gray-400">
				This page is under construction 🔨
			</h1>
			<p className="text-xl">
					Go{" "}<Link to="/" className="underline">home</Link>
				</p>
		</div>
	);
}