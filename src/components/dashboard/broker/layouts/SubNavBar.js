import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SubNavBar({ breadCrumb }) {
  // Dropdown
  const [isOpen, setOpen] = useState({ client: false, investor: false });

  const toggleDropdownClient = () => {
    isOpen.client
      ? setOpen({ ...isOpen, client: false })
      : setOpen({ investor: false, client: true });
  };

  const toggleDropdownInvestor = () => {
    isOpen.investor
      ? setOpen({ ...isOpen, investor: false })
      : setOpen({ client: false, investor: true });
  };

  return (
    <>
      <div
        id="sub-navbar"
        className="bg-white px-16 py-10 shadow-md flex justify-start"
      >
        <div className="dropdownbroker navbar-item">
          <div className="dropdownbroker-header" onClick={toggleDropdownClient}>
            <h2 className="mr-2 underline">Clients</h2>
            <i className={`fa fa-caret-down ${isOpen.client && "open"}`}></i>
          </div>

          <div className={`dropdownbroker-body ${isOpen.client && "open"}`}>
            <Link
              to="/broker/dashboard/new-client"
              className="dropdownbroker-item "
            >
              New Client{" "}
            </Link>
            <Link
              to="/broker/dashboard/allclients"
              className="dropdownbroker-item "
            >
              Manage Clients{" "}
            </Link>
          </div>
        </div>

        <div className="navbar-item">
          <h2 className="mr-2 underline">
            <Link to="/broker/dashboard/upload">Upload users</Link>
          </h2>
        </div>
        {breadCrumb !== undefined && " | "}
        <div className="navbar-item ml-2">
          {(function () {
            if (breadCrumb !== undefined && breadCrumb.length === 1) {
              return (
                <Link to={breadCrumb[0].link} className="underline mx-2">
                  {breadCrumb[0].name}
                </Link>
              );
            }
            
            if (breadCrumb !== undefined && breadCrumb.length === 2) {

              return breadCrumb.map((crumb, index) => {
                return index === 0 ? (
                  <>
                    <Link key={index} to={crumb.link} className="underline mx-2">
                      {crumb.name}
                    </Link>
                    {" / "}
                  </>
                ) : (
                  <Link key={index} to={crumb.link} className="underline mx-2">
                    {crumb.name}
                  </Link>
                );
              });
            }
            
            if(breadCrumb !== undefined && breadCrumb.length > 2){
              return breadCrumb.map((crumb, index) => {
                return (index + 1) % 2 === 0 ?(
                  <>
                  {" / "}
                  <Link key={index} to={crumb.link} className="underline mx-2">
                    {crumb.name}
                  </Link>
                  {" / "}
                  </>
                ):(
                  <Link key={index} to={crumb.link} className="underline mx-2">
                  {crumb.name}
                  </Link>
                )
              });
            }
          })()}
        </div>
      </div>
    </>
  );
}
