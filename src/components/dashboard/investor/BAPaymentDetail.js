import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";
import accepted from "./icons/accepted.png"

export default function BAPaymentDetail() {
	const pageName = "Payment Detail";

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-bid-payment-detail" className="bg-gray-800 sm:p-20">
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
										<div id="tick-icon" className="bg-white h-20 w-20 rounded-full flex justify-center items-center">
											<img src={accepted} alt="accepted-tick-marked" />
										</div>
									</div>
								</div>
								<h3 className="text-2xl underline text-center py-5 font-bold">Rice Value Chain (Project Finance).</h3>
								<p id="offer-description" className="text-green-700 text-center pb-5 font-bold">
									Your bid with Rice Value Chain has been approved
								</p>
								<div className="flex flex-col sm:flex-row justify-evenly items-center pb-5 action-btns">
									<Button title="Click here to see payment details" buttonClass="bg-green-700 font-bold w-full rounded payment-detail" />
								</div>
								<div className="mb-5 payment-details">
									<p className="font-bold text-lg text-black mb-5 text-center border border-t-black border-b-black border-x-white py-2">Payment details:</p>
									<div className="detail text-center">
										<p>Amount to be paid: 5 Billion</p>
										<p>Bank Name: Standard chattered Bank</p>
										<p>Account Name: Orderbook online</p>
										<p>Account number:  0354870010</p>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row justify-evenly items-center action-btns">
									<Button title="Click here to confirm payment" buttonClass="sm:mb-0 mb-5 font-bold w-full rounded confirm-payment" />
								</div>
							</div>	
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}