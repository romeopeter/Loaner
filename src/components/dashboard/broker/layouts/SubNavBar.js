import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SubNavBar() {
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
    <div className=' bg-white px-16 py-10 shadow-md flex justify-start'>
              <div className='dropdownbroker'>
                <div
                  className='dropdownbroker-header'
                  onClick={toggleDropdownClient}
                >
                  <h2 className='mr-2'>Clients</h2>
                  <i
                    className={`fa fa-caret-down ${isOpen.client && 'open'}`}
                  ></i>
                </div>
                <div
                  className={`dropdownbroker-body ${isOpen.client && 'open'}`}
                >
                  <Link
                    to='/broker/dashboard/new-client'
                    className='dropdownbroker-item '
                  >
                    New Client{' '}
                  </Link>
                  <Link
                    to='/broker/dashboard/allclients'
                    className='dropdownbroker-item '
                  >
                    Manage Clients{' '}
                  </Link>
                </div>
              </div>
              <div className='dropdownbroker'>
                <div
                  className='dropdownbroker-header'
                  onClick={toggleDropdownInvestor}
                >
                  <h2 className='mr-2'>Upload</h2>
                  <i
                    className={`fa fa-caret-down ${isOpen.investor && 'open'}`}
                  ></i>
                </div>
                <div
                  className={`dropdownbroker-body ${isOpen.investor && 'open'}`}
                >
                  <Link
                    to='/broker/dashboard/upload'
                    className='dropdownbroker-item '
                  >
                  Bulk upload {' '}
                  </Link>
                </div>
              </div>
            </div>
  );
}
