import React, {createRef} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";

export default function InvestorDashboard() {
	const pageName = "Investor"

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-investor-dashboard">
					<div
						id="user-quick-action"
						className="flex flex-row justify-evenly h-20 w-full"
					>
						<div className="actions action-1 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/offers">My offers</Link>
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/sucessful-bids">Successful offers</Link>
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/bids/declined">Decline offers</Link>
							</h2>
						</div>
					</div>

					<div id="notifications-container">
						<h3 className="text-3xl text-white font-bold pl-5 py-10">Notification</h3>
						<div className="flex flex-col md:flex-row md:pr-5">
							<div id="blank-space" className="bg-white hidden md:block">
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}