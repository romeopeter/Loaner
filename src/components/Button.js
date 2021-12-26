import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
	const { type, title, link, buttonClass, buttonDisabled } = props;

	// Registration component animated form prop
	const { slide } = props;

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
				onClick={slide && (() => slide())}
			>
				{title}
			</button>
		);
	}
}