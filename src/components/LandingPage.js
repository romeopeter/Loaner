import React from "react";
import OrderbookLayout from "./OrderbookLayout";
import DocumentHead from "./DocumentHead";
import Button from "./Button";
import headerBanner from "../assets/images/headerBanner.png";
import tabletLady from "../assets/images/tabletLady.png";
import requestBanner from "../assets/images/requestBanner.jpg";
import thumbsUp from "../assets/images/thumbsUp.png";

export default function LandingPage() {
	const setBgImage = (name) => {
		return { backgroundImage: `url(${name})` };
	};

	return (
		<>
			<DocumentHead title="Orderbook | Home" />
			<OrderbookLayout>
				<header id="orderbook-header" style={setBgImage(headerBanner)}>
					<div id="orderbook-intro">
						<h1 className="mt-0">
							Orderbook, your go to financial platform.
						</h1>
						<p className="font-md text-white">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation.
						</p>
						<Button
							title="Learn more"
							link="#"
							buttonClass="intro-cta"
						/>
					</div>
				</header>
				<section id="orderbook-rows">
					<div className="container border-right">
						<div className="gray-marker">
							
						</div>
						<div className="row-details">
							<h3>orderbook your go</h3>
							<p>
								Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui.
							</p>
						</div>
					</div>
					<div className="container border-right">
						<div className="gray-marker">
							
						</div>
						<div className="row-details">
							<h3>orderbook your go</h3>
							<p>
								Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui.
							</p>
						</div>
					</div>
					<div className="container">
						<div className="gray-marker">
							
						</div>
						<div className="row-details">
							<h3>orderbook your go</h3>
							<p>
								Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui.
							</p>
						</div>
					</div>
				</section>
				<section id="orderbook-bids">
					<div className="container" id="bid-intro">
						<h2>As an investor your money grows for you</h2>
						<p>
							Ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla
							pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia.
						</p>
						<Button
							title="View live bids"
							link="#"
							buttonClass="bid-cta"
						/>
					</div>
					{/*Renders image*/}
					<img
						className="container"
						id="bid-banner"
						alt="Lady with a tablet"
						src={tabletLady}
					/>
				</section>
				<section id="orderbook-request">
					<div id="request-intro-container">
						<img src={requestBanner} alt="" id="request-banner" />
						<div id="request-intro">
							<h2>Orderbook, your go to financial platform</h2>
							<p>
								Dui faucibus in ornare quam viverra orci
								sagittis. Habitasse platea dictumst vestibulum
								rhoncus est pellentesque elit ullamcorper. In
								nulla posuere sollicitudin aliquam ultrices
								sagittis orci a.
							</p>
							<Button
								title="Create a request"
								link="#"
								buttonClass="request-cta"
							/>
						</div>
					</div>
					<div id="orderbook-steps">
						<div className="request-step">
							<div className="white-marker">1</div>
							<h4>Create a free account</h4>
							<p>
								Et molestie ac feugiat sed lectus vestibulum. 
								Cursus turpis massa tincidunt dui ut. 
								Euismod in pellentesque massa placerat duis ultricies lacus.
							</p>
						</div>
						<div className="request-step">
							<div className="white-marker">2</div>
							<h4>Start a new request</h4>
							<p>
								Et molestie ac feugiat sed lectus vestibulum. 
								Cursus turpis massa tincidunt dui ut. 
								Euismod in pellentesque massa placerat duis ultricies lacus.
							</p>
						</div>
						<div className="request-step">
							<div className="white-marker">3</div>
							<h4>Accept investors list</h4>
							<p>
								Et molestie ac feugiat sed lectus vestibulum. 
								Cursus turpis massa tincidunt dui ut. 
								Euismod in pellentesque massa placerat duis ultricies lacus.
							</p>
						</div>
						<div className="request-step">
							<div className="white-marker">4</div>
							<h4>Recieve your fund</h4>
							<p>
								Et molestie ac feugiat sed lectus vestibulum. 
								Cursus turpis massa tincidunt dui ut. 
								Euismod in pellentesque massa placerat duis ultricies lacus.
							</p>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}