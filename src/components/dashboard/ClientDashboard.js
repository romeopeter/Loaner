import React, {createRef} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signOutAsync } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";
import Button from "../Button";

import setBgImage from "../../utils/setBgImage";
import headerBanner from "../../assets/images/headerBanner.png";
import offerImage from "../../assets/images/offerImage.png";
import profileLady from "../../assets/images/profileLady.png";
import UBALogo from "../../assets/images/UBALogo.png";

export default function Dashboard() {
	const pageName = "Dashboard";

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.auth.user);

	const { user: currentUser } = authUser;

	if (!currentUser) {
		return <Navigate replace to="login" />;
	}


	const handleSignOut = () => {
		dispatch(signOutAsync());
		navigate("/login");
	};

	/*Dashboard navigation*/
	let navMenuRef = createRef();

	const respondsiveNav = () => {
		navMenuRef.current.classList.toggle("responsive-nav-menu");
	};

	const pageNav = (
		<div id="dashboard-nav">
			<nav id="orderbook-nav">
				<div id="orderbook-logo" className="">
					<span>Orderbook Online</span>
				</div>
				<div id="burger-toggle" className="icon" onClick={() => respondsiveNav()}>
					&#9776;
				</div>
				<div id="nav-menu">
					<ul id="nav-menu-list" className="" ref={navMenuRef}>
						<li id="deals" className="nav-menu-item" style={{color: "white", cursor:"pointer"}}>
							Deals{" "}
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
							<div id="deals-dropdown" className="shadow-md hidden">
								<Link to="">Current deals</Link>
								<Link to="/">Archive deals</Link>
								<Link to="/">Create deal - single tranche</Link>
								<Link to="/">
									Create deal - multiple tranche
								</Link>
							</div>
						</li>
						<li className="nav-menu-item">
							<Link to="/">
								Analysis{" "}
								<i
									class="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Admin</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Recent</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Help</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Privacy</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/register">Terms of Use</Link>
						</li>
						<li
							className="nav-menu-item text-white font-bold"
							style={{ cursor: "pointer" }}
							onClick={() => handleSignOut()}
						>
							<div id="profile" className="">
								<div id="profile-image">
									<img src={profileLady} id="profile-photo" alt="" className="round-lg" />{" "}
									<i
										class="fa fa-caret-down text-white"
										aria-hidden="true"
									></i>
								</div>
								<img src={UBALogo} alt="" className="round-lg" />{" "}
							</div>

						</li>
					{/*	<li className="nav-menu-item">
							
						</li>*/}
					</ul>
				</div>
			</nav>
		</div>
	);

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout pageNav={pageNav}>
				<section id="dashboard-intro-container">
					<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-5 shadow-md"
					>
						<div id="loan" className="dropdown-container">
							Load{" "}
							<i class="fa fa-caret-down" aria-hidden="true"></i>
							<div id="load-dropdown"></div>
						</div>
						<div id="investor" className="dropdown-container">
							Investor{" "}
							<i class="fa fa-caret-down" aria-hidden="true"></i>
							<div id="investor-dropdown"></div>
						</div>
					</div>
					<div id="orderbook-dashboard-intro" style={setBgImage(headerBanner)}>
						<h1>Hello, {currentUser.first_name}</h1>
						<h3>Welcome to your dashboard</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation
						</p>
						<Button
							title="Update your profile"
							buttonClass="update-profile-cta"
						/>
					</div>
					<div
						id="user-quick-action"
						className="flex flex-row justify-evenly h-20"
					>
						<div className="actions action-1 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								Create new offer
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								Create new list
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								My offer
							</h2>
						</div>
					</div>
					<div id="account-overview" className="flex justify-around flex-col md:flex-row">
						<div id="overview-title" className="flex justify-center items-center px-5 pt-5 md:p-2">
							<h3>Account Overview</h3>
						</div>
						<div id="account" className="flex justify-around sm:justify-around items-center sm:w-full">
							<p>
								<span className="count">10</span>	All loans
							</p>
							<p>
								<span className="count">15</span>	Approved loans
							</p>
							<p>
								<span className="count">10</span>	Decline
							</p>
						</div>
					</div>
					<div id="offers" className="bg-black p-14">
						<div id="offer-header" className="flex flex-col md:flex-row justify-between pb-10">
							<h3 className="font-bold mb-10 md:mb-0">My offers</h3>
							<div id="sort-by">
								<label htmlFor="sort-offer" className="font-bold">Sort by:</label>{" "}
								<select name="sort-offer" id="sort-offer" className="font-bold">
									<option value="status">Status</option>
								</select>
							</div>
						</div>
						<div id="the-offers">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center place-content-center gap-10">
								<div className="offer" id="offer-1">
									<div className="offer-title">
										<img
											className="offer-image"
											src={offerImage}
											alt=""
										/>
										<h3 className="title">
											Rice Value Chain (Project Finance)
										</h3>
									</div>
									<p className="offer-description">
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in pective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion
									</p>
									<div className="offer-button">
										<Button
											title={`Edit draft`}
											type="button"
											buttonClass="h-2 p-2 bg-grey"
										/>
										{/*<i
											class="fa fa-long-arrow-right"
											aria-hidden="true"
										></i>*/}
										<Button
											title="Publish"
											type="button"
											buttonClass="h-2 p-2 bg-white"
										/>
									</div>
								</div>
								<div className="offer" id="offer-2">
									<div className="offer-title">
										<img
											className="offer-image"
											src={offerImage}
											alt=""
										/>
										<h3 className="title">
											Rice Value Chain (Project Finance)
										</h3>
									</div>
									<p className="offer-description">
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in pective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion
									</p>
									<div className="offer-button">
										<Button
											title="Edit draft"
											type="button"
											buttonClass="h-2 p-2 bg-grey"
										/>
										{/*<i
											class="fa fa-long-arrow-right"
											aria-hidden="true"
										></i>*/}
										<Button
											title="Publish"
											type="button"
											buttonClass="h-2 p-2 bg-white"
										/>
									</div>
								</div>
								<div className="offer" id="offer-3">
									<div className="offer-title">
										<img
											className="offer-image"
											src={offerImage}
											alt=""
										/>
										<h3 className="title">
											Rice Value Chain (Project Finance)
										</h3>
									</div>
									<p className="offer-description">
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in pective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion
									</p>
									<div className="offer-button">
										<Button
											title="Edit draft"
											type="button"
											buttonClass="h-2 p-2 last-button"
										/>
										{/*<i
											class="fa fa-long-arrow-right"
											aria-hidden="true"
										></i>*/}
									</div>
								</div>
							</div>
							<div id="view-more" className="text-right">
								View more{" "}
								<i
									class="fa fa-long-arrow-right"
									aria-hidden="true"
								></i>
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}