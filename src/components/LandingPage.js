import React from "react";
import OrderbookLayout from "./OrderbookLayout";
import DocumentHead from "./DocumentHead";

export default function LandingPage() {
	return (
		<>
			<DocumentHead title="Orderbook | Home"/>
			<OrderbookLayout>
				<header className="App-header">
					<h4>Orderbook is still under construction</h4>
				</header>
			</OrderbookLayout>
		</>
	);
}