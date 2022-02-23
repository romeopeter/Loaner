import React, { useState } from 'react';
import ReactPaginate from "react-paginate";

export default function Pagination({dataToPaginate, perPage}) {
	const [pagination, setPagination] = useState({
		list: dataToPaginate,
		perPage: perPage,
		page: 0,
		pages: Math.floor(dataToPaginate.length / perPage),
	});

	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	}

	return (
		<div>
			<ReactPaginate
				previousLabel={"<"}
				nextLabel={">"}
				pageCount={pages}
				containerClassName={"pagination"}
				onPageChange={(e) => handlePageClick(e)}
			/>
		</div>
	)
}