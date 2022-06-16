import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import Table from "./Table";

import { getApprovedBidsAction } from "../../../redux/bidSlice";

export default function ApprovedBids() {
  const pageName = "Successful offers";
  const dispatch = useDispatch();

  /* Pagination stars */
  const [paginateState, setPaginateState] = useState({
    list: [],
    perPage: 9,
    page: 0,
    pages: 0,
  });

  const { page, perPage, pages, list } = paginateState;
  let approvedBids = list.slice(page * perPage, (page + 1) * perPage);

  const handlePageClick = (event) => {
    let page = event.selected;
    setPaginateState((state) => ({ ...state, page: page }));
  };
  /* Pagination Ends */

  const [isLoading, setisLoading] = useState(true);

  useEffect(
    function getapprovedBids() {
      let componentIsMounted = true;

      (async () => {
        const req = await dispatch(getApprovedBidsAction());

        if (req.meta.requestStatus === "fulfilled") {

          if (componentIsMounted) {
            setPaginateState((state) => ({
              ...state,
              list: req.payload,
              pages: Math.floor(req.payload.length / 9),
            }));
            setisLoading(false);
          }
        }

        componentIsMounted = false;
      })();

      return () => componentIsMounted;
    },
    [dispatch]
  );

  const tableColumn = useMemo(
    () => [
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Description",
        accessor: "description",
      },
      {
        header: "TableBtn",
        accessor: "tableBtn",
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    return approvedBids.map(bid => {

      const dealId = bid["loan_request"]["id"];
      const dealType =
        bid["loan_request"]["deal_type"] === "Commercial Paper"
          ? "cp"
          : "bonds";
      const bidName = bid["loan_request"]["deal_name"] !== undefined ? bid["loan_request"]["deal_name"] : bid["loan_request"]["tranche_name"];
      return {
        name: bidName,
        description: "***",
        tableBtn: `${dealId}/${dealType.toLowerCase()}`
      };
    });
  },[approvedBids]);

  return (
    <>
      <DocumentHead title={pageName} />
      <OrderbookLayout PageNav={NavMenu}>
        <div
          id="loan-invest-dropdown"
          className="bg-white px-16 py-10 shadow-md flex justify-start w-full"
        >
          <Link 
            to="/investor/dashboard"
            id="home"
            className="dropdown-container mr-5 underline"
          >
            Dashboard
          </Link>
          <Link
            to="/investor/offers"
            id="offers"
            className="dropdown-container underline"
          >
            Offers
          </Link>
        </div>
        <section id="orderbook-investor-successful-bids">
          <div id="Succesful-bids">
            <h3
              id="header"
              className="py-10 text-lg sm:text-2xl pl-5 text-white"
            >
              Successful Bids
            </h3>

            {isLoading ? (
              <div className="bg-white w-full h-auto">
                <p className="text-3xl text-center h-40 flex justify-center items-center text-gray-500">
                  <i
                    className="fa fa-spinner fa-pulse fa-3x fa-fw"
                    style={{ fontSize: 30 }}
                  ></i>
                </p>
              </div>
            ) : (
              <div id="table-container" style={{ overflowX: "auto" }} className="pb-2">
                <div id="table-action" className="bg-white py-5 px-2 w-full">
                  <select
                    name="table-action"
                    id="select-table-action"
                    className="mr-2 mt-1 focus:ring-white focus:border-black border-2 border-black"
                  >
                    <option defaultValue="value 1">Select action</option>
                    <option value="value 1">Option 1</option>
                    <option value="vallue 2">Option 2</option>
                    <option value="value 3">Option 3</option>
                  </select>
                  <Button title="Apply" buttonClass="bg-gray-500 action-btn" />
                </div>

                {approvedBids.length === 0 ? (
                  <p
                    className="py-5 text-center text-3xl text-gray-400 h-40 flex justify-center items-center"
                    style={{ fontSize: "1.875rem" }}
                  >
                    No bid has been approved yet

                    <i class="fa fa-times ml-2" aria-hidden="true"></i>
                  </p>
                ) : (
                    approvedBids.length > 0 && <Table columns={tableColumn} data={tableData} />
                )}
              </div>
            )}

            {approvedBids.length > 9 && (
              <div id="paginate-bids" className="bg-white">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={pages}
                  containerClassName={"pagination"}
                  onPageChange={(e) => handlePageClick(e)}
                />
              </div>
            )}
          </div>
        </section>
      </OrderbookLayout>
    </>
  );
}
