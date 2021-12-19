import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
	const { type, title, link, buttonClass } = props;

	return (
		<button
			type={type ? type : ""}
			id="default-orderbook-button"
			className={buttonClass}
		>
			<Link to={link}>{title}</Link>
		</button>
	);
}