import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function BAPaymentProof() {
	const pageName = "Payment proof";

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-bid-payment-proof" className="bg-gray-800 sm:p-20">
					<h2 id="offer-title" className="text-white font-bold mb-10 text-2xl pt-5 pl-5 sm:pt-0 sm:pl-0 sm:text-3xl">Rice Value Chain</h2>
					<div className="bg-white" id="bid-container">
						<div id="go-back-arrow" className="bg-gray-300 mb-5">
							<Link to="/investor/dashboard" className="flex justify-center items-center">
								<i className="fa fa-long-arrow-left" aria-hidden="true"></i>
							</Link>
						</div>
						<div id="inner-bid-container" className="flex flex-col justify-center items-center p-5 sm:p-0">
							<div id="bid" className="">
								<div id="img-container">
									<img src={offerImage} alt="" className="w-full" />
									<div className="overlay">
										<div id="tick-icon" className="bg-white h-20 w-20 rounded-full"></div>
									</div>
								</div>
								<h3 className="text-2xl underline text-center py-5 font-bold">Rice Value Chain (Project Finance).</h3>
								<p id="offer-description" className="text-black text-center pb-5 font-bold">
									Your file has been successfully uploaded
								</p>
								<div id="action-btns" className="flex flex-col sm:flex-row justify-evenly items-center">
									<Button title="View offers" buttonClass="view-offers sm:mb-0 mb-5 w-full" />
									<Button title="Go home" buttonClass="go-home w-full" />
								</div>
							</div>	
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}