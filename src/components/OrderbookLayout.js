import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderbookLayout({ children, PageNav }) {
	const { isLoggedIn } = useSelector((state) => state.auth);

	let navMenuRef = createRef();

	const respondsiveNav = () => {
		navMenuRef.current.classList.toggle("responsive-nav-menu");
	};

	return (
		<section id="app">
			{PageNav ? (
				<PageNav />
			) : (
				<nav id="orderbook-nav">
					<div id="orderbook-logo">
						<Link to="/"><span>Orderbook Online</span></Link>
					</div>
					<div
						id="burger-toggle"
						className="icon"
						onClick={() => respondsiveNav()}
					>
						&#9776;
					</div>
					<div id="nav-menu">
						<ul id="nav-menu-list" className="" ref={navMenuRef}>
							<li className="nav-menu-item">
								<Link to="/">Home</Link>
							</li>
							<li className="nav-menu-item">
								<Link to="/">How it works</Link>
							</li>
							<li className="nav-menu-item">
								<Link to="/">FAQs</Link>
							</li>
							<li className="nav-menu-item">
								<Link to="/">About Us</Link>
							</li>
							<li className="nav-menu-item">
								<Link to="/">Contact Us</Link>
							</li>
							{!isLoggedIn && (
								<>
									<li className="nav-menu-item" id="login">
										<Link to="/login">Login</Link>
									</li>
									<li
										className="nav-menu-item"
										id="register-cta"
									>
										<Link to="/register">Register</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</nav>
			)}
			{children}
			<footer id="orderbook-footer">
				<div id="orderbook-about-us">
					<h4 id="logo">Orderbook</h4>
					<p id="about-us">
						Dui faucibus in ornare quam viverra orci sagittis.
						Habitasse platea dictumst vestibulum rhoncus est
						pellentesque elit ullamcorper. In nulla posuere
						sollicitudin aliquam ultrices sagittis orci a.
					</p>
				</div>
				<div id="orderbook-footer-links">
					<div className="links-container">
						<h4>Company</h4>
						<Link to="/" className="links">
							About us
						</Link>
						<Link to="/" className="links">
							Services
						</Link>
						<Link to="/" className="links">
							Careers
						</Link>
						<Link to="/" className="links">
							Latest news
						</Link>
						<Link to="/" className="links">
							Team
						</Link>
					</div>
					<div className="links-container">
						<h4>Support</h4>
						<Link to="/" className="links">
							FAQs
						</Link>
						<Link to="/" className="links">
							How it works
						</Link>
						<Link to="/" className="links">
							Privacy policy
						</Link>
						<Link to="/" className="links">
							Terms & conditions
						</Link>
						<Link to="/" className="links">
							Contact us
						</Link>
					</div>
					<div className="links-container" id="site-links">
						<h4>Site Links</h4>
						<Link to="/" className="links">
							Live requests
						</Link>
					</div>
				</div>
			</footer>
		</section>
	);
}