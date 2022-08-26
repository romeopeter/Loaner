import React, { useState, useRef } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { rejectManualListingBids } from "../../../../../services/bid.service";
import BatchRejectBidsModal from "../../modals/BatchRejectBidsModal";

export default function DropRejectedBids({ bidsData, tableFuncObj }) {
  const [rejectedBidsID, setRejectedBidsID] = useState([]);
  const [trigger, setTrigger] = useState({
    disableRejectBtn: false,
    showModal: false,
    isLoading: undefined,
    rejectedBids: null,
  });

  /*Drag/drop functions starts*/
  let dropObjectParent = useRef();

  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);

    if (Array.from(dropObjectParent.current.childNodes).length === 0) {
      setTrigger({...trigger, disableRejectBtn: true});
    }

    console.log(dropObjectParent);
  };

  const allowDrop = (e) => e.preventDefault();

  const drop = (e) => {
    e.preventDefault();

    // Append data to state.
    const data = e.dataTransfer.getData("text");

    if (
      dropObjectParent.current !== null ||
      dropObjectParent.current !== undefined
    ) {
      dropObjectParent.current.appendChild(document.getElementById(data));

      dropObjectParent.current.childNodes.forEach((child) => {
        // Add drag function to appended nodes
        child.ondragstart = drag;

        // Remove buttons cells copied from HTML dragged element
        const tableRowNodes = child.childNodes;
        tableRowNodes[tableRowNodes.length - 1].classList.add("hidden");

        // Remove checkbox copied from dragged HTML element
        tableRowNodes[1].childNodes[0].childNodes[2].classList.add("hidden");
      });

      // DropObjectParent child nodes
      const childNodes = Array.from(dropObjectParent.current.childNodes);

      // Get rejected bids ID
      const bidsIDs = childNodes.map((child) => {
        return parseInt(child.attributes.id.nodeValue.split("-")[2]);
      });

      // Update state
      setRejectedBidsID(bidsIDs.sort((a, b) => a - b));
    }
  };

  /*Drag/drop functions ends*/

  const rejectBids = async (e) => {
    setTrigger({...trigger, showModal:true, isLoading: true});
    const sortedBids = bidsData.sort((a, b) => a.id - b.id);

    /* Filter out main bids data that don't match 
      rejected ones */
    const requestArr = [];
    const detail = {
      status: {
        name: "rejected",
        message: "bid rejected",
      },
    };

    sortedBids.filter((data) => {
      if (rejectedBidsID.includes(data.id)) {
        /* Create reject request strings for each bids */
        requestArr.push(`v1/bids/${data.id}/`);
      }

      return null;
    });

    if (requestArr.length > 0) {
      const res = await rejectManualListingBids(requestArr, detail);

      if (res[0].status === 200) {
        // Set Modal trigger
        setTrigger({...trigger, showModal:true, isLoading: false, rejectedBids: res});
      }
    }
  };

  const closeModal = () =>  {
    setTrigger({...trigger, showModal: false});

    window.location.reload();
  };

  const tableColumn = ["name", "tranche", "duration", "amount", "status"];

  return (
    <>
      <p className="text-center py-3 text-lg text-gray-500">
        Drag bids you want to reject from the table above and drop in the table
        below.
      </p>
      <div
        className="tableScroll shadow-sm mx-5 py-5 p-2 rounded-md border-2 border-red-600 mt-2"
        style={{ height: 350 }}
      >
        <Table
          size="sm"
          bgColor={"blackAlpha.100"}
          onDragOver={allowDrop}
          onDrop={drop}
        >
          <Thead bg="F0F0F0" h="80px">
            <Tr fontWeight={"extrabold"} fontSize={["1.9em"]}>
              <Th></Th>
              <Th>
                {/* <input
                  type="checkbox"
                  className={`broker-checkbox`}
                  name="allSelect"
                  disabled={disableApproved}
                  checked={checkedBid?.length === bidsData?.length}
                  onChange={(e) => handleCheck(e, bidsData)}
                /> */}
                 <i className="fa fa-hand-rock-o font-bold text-lg" aria-hidden="true"></i>
              </Th>
              {tableColumn.map((column, index) => {
                return (
                  <Th key={index} className="border">
                    {column}
                  </Th>
                );
              })}
              {/* <Th>Actions</Th> */}
            </Tr>
          </Thead>
          <Tbody
            id="drop-object-parent"
            ref={dropObjectParent}
            style={{ height: 20 }}
          >
            {/* Dragged bids are dropped in table boday */}
          </Tbody>
        </Table>
      </div>
      <div
        id="unapproved-bids-buttons"
        className="sm:flex sm:justify-end py-2 mx-4"
      >
        <button
          className={`cta-buttons--unapproved ${
           rejectedBidsID.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-600"
          } text-white p-1 text-sm rounded sm:w-32 w-full h-11`}
          onClick={(e) => {
            if(rejectedBidsID.length > 0) rejectBids(e)
          }}
          disabled={rejectedBidsID.length === 0 && trigger.disableRejectBtn}
        >
          Reject all bids
        </button>
      </div>

      <BatchRejectBidsModal trigger={trigger} closeModal={closeModal} />
    </>
  );
}
