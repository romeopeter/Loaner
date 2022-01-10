import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
	const { type, title, link, buttonClass, buttonDisabled, handleClick, children } =
		props;

	if (link) {
		return (
			<button
				type={type ? type : "button"}
				className={`default-orderbook-button ${buttonClass}`}
				disabled={buttonDisabled}
			>
				<Link to={link}>{title}</Link>
			</button>
		);
	} else {
		return (
			<button
				type={type ? type : "button"}
				className={`default-orderbook-button ${buttonClass}`}
				disabled={buttonDisabled}
				onClick={handleClick && (() => handleClick())}
			>
				{children ? children : title}
			</button>
		);
	}
}