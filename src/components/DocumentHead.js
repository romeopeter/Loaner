/*
 *
 *
 *
 *
 *
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

function DocumentHead(props) {
	const { lang, title, meta, links} = props;

	return (
		<Helmet
			htmlAttribute={{ lang }}
			title={title}
			meta={[].concat(meta)}
			link={[
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous",
				},
				{
					rel: "styTlesheet",
					href: "https://fonts.googleapis.com/css2?family=Arvo&family=Lato:wght@300&display=swap",
				},
			].concat(links)}
		/>
	);
}

DocumentHead.defaultProps = {
	lang: "en",
	meta: [],
	links: [],
};

DocumentHead.propTypes = {
	lang: PropTypes.string,
	title: PropTypes.string.isRequired,
	meta: PropTypes.arrayOf(PropTypes.object),
	links: PropTypes.arrayOf(PropTypes.object),
};

export default DocumentHead;