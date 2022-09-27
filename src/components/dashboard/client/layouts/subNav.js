import React from "react";
import { Link } from "react-router-dom";

export default function SubNav({ breadCrumbs }) {
  return (
    <div
      id="dashboard-dropdown"
      className="bg-white px-16 py-10 shadow-md flex justify-start"
    >
      {/* <div id="loan" className="dropdown-container">
        <div>
          Offers <i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
        </div>
        <div id="loan-dropdown" className="shadow-md rounded bg-white">
          <Link to="#">All offers</Link>
          <Link to="#">Publised offers</Link>
          <Link to="#">Drafts</Link>
        </div>
      </div>
      {breadCrumbs !== undefined && " | "} */}
      <div className="navbar-item ml-2">
          {(function () {
            if (breadCrumbs !== undefined && breadCrumbs.length === 1) {
              return (
                <Link to={breadCrumbs[0].link} className="underline mx-2">
                  {breadCrumbs[0].name}
                </Link>
              );
            }

            if (breadCrumbs !== undefined && breadCrumbs.length === 2) {
              return breadCrumbs.map((crumb, index) => {
                return index === 0 ? (
                  <Link key={index} to={crumb.link} className="">
                    <span className="underline">{crumb.name}</span>
                    {"  "}
                    <span className="">/</span>
                  </Link>
                ) : (
                  <Link key={index} to={crumb.link} className="underline mx-2">
                    {crumb.name}
                  </Link>
                );
              });
            }

            if (breadCrumbs !== undefined && breadCrumbs.length > 2) {
              return breadCrumbs.map((crumb, index) => {
                return (index + 1) % 2 === 0 ? (
                  <Link key={index} to={crumb.link} className="">
                    <span>/</span>{" "}
                    <span className="underline">{crumb.name}</span>{" "}
                    <span>/</span>
                  </Link>
                ) : (
                  <Link key={index} to={crumb.link} className="underline mx-2">
                    {crumb.name}
                  </Link>
                );
              });
            }
          })()}
        </div>
    </div>
  );
}
