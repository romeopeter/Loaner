import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
	const {title, link, buttonClass} = props;

	return (
		<button id="default-orderbook-button" className={buttonClass}>
			<Link to={link}>{title}</Link>
		</button>
	);
}