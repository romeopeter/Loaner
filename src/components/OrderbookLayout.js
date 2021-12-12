import React from "react";

export default function OrderbookLayout({ children }) {
	return (
		<section className="App">
			<nav>navigation</nav>
			{children}
			<footer>Footer</footer>
		</section>
	);
}