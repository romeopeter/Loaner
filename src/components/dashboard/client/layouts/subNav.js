import React from "react";
import { Link } from "react-router-dom";

export default function SubNav({ breadCrumbs }) {
  return (
    <div
      id="dashboard-dropdown"
      className="bg-white px-16 py-10 shadow-md flex justify-start"
    >
      <div id="loan" className="dropdown-container">
        <div>
          Offers <i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
        </div>
        <div id="loan-dropdown" className="shadow-md rounded bg-white">
          <Link to="#">All offers</Link>
          <Link to="#">Publised offers</Link>
          <Link to="#">Drafts</Link>
        </div>
      </div>
      {breadCrumbs !== undefined && " | "}
    </div>
  );
}
