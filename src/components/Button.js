import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
	const { type, title, link, buttonClass, buttonDisabled } = props;

	if (link) {
		return (
			<button
				type={type ? type : "button"}
				id="default-orderbook-button"
				className={buttonClass}
				disabled={buttonDisabled}
			>
				<Link to={link}>{title}</Link>
			</button>
		);
	} else {
		return (
			<button
				type={type ? type : "button"}
				id="default-orderbook-button"
				className={buttonClass}
				disabled={buttonDisabled}
			>
				{title}
			</button>
		);
	}
}