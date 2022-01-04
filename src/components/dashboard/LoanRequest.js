import React, {useState} from "react";
import NavMenu from "./NavMenu";
import RequestForm from "./RequestForm";
import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";

export default function NewLoan() {

	const pageName = "Loan request";

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section className="orderbook-loan-request">
					<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-5 shadow-md"
					>
						<div id="loan" className="dropdown-container">
							Load{" "}
							<i className="fa fa-caret-down" aria-hidden="true"></i>
							<div id="load-dropdown"></div>
						</div>
						<div id="investor" className="dropdown-container">
							Investor{" "}
							<i className="fa fa-caret-down" aria-hidden="true"></i>
							<div id="investor-dropdown"></div>
						</div>
					</div>
					<div className="loadn-request-container">
						<div id="request-loan-form">
							<RequestForm />
						</div>
						<div id="loan-summary"></div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}