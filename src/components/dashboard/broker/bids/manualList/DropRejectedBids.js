import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { rejectManualListingBids } from "../../../../../services/bid.service";
import BatchRejectBidsModal from "../../modals/BatchRejectBidsModal";

import { capitalizeFirstLetter } from "../../../../../utils/general";


// Global state prevent re-initialisation when state is rerendered
const droppedBidsArr = [];

export default function DropRejectedBids({ bidsData, tableFuncObj }) {
  const [rejectedBidsID, setRejectedBidsID] = useState([]);
  const [trigger, setTrigger] = useState({
    showModal: false,
    isLoading: undefined,
    rejectedBids: null,
    rejectBidStatus: null,
    DOMIsLoaded: false,
  });

  /*Drag/drop functions starts*/
  let dropObjectParent = useRef();

  // let componentIsMounted = true;
  const storedRejectedBidsObj = localStorage.getItem("REJECTED_BROKER_BIDS");

  storedRejectedBidsObj === null &&
    localStorage.setItem(
      "REJECTED_BROKER_BIDS",
      JSON.stringify(droppedBidsArr)
    );

  useEffect(
    function UpdateTriggerState() {
      let componentIsMounted = true;
      const storedRejectedBids = JSON.parse(
        localStorage.getItem("REJECTED_BROKER_BIDS")
      );

      // Check if reject button should be disable
      if (trigger.rejectBidStatus !== null) {
        dropObjectParent.current.childNodes.forEach((child) => {
          const tableRow = child.childNodes;

          // Table row
          const updateStatus = tableRow[child.childElementCount - 2];
          updateStatus.classList.add("text-red-500");
          updateStatus.innerHTML = trigger.rejectBidStatus;
        });

        // Set Modal trigger
        if (componentIsMounted) {
          setTrigger({
            ...trigger,
            showModal: true,
            rejectBidStatus: null,
            DOMIsLoaded: true,
          });
        }
      }

      // Clear rows in table body
      if (rejectedBidsID.length === 0 && storedRejectedBids.length === 0) {
        dropObjectParent.current.innerHTML = "<tr class='hidden'></tr>";
      }

      return () => (componentIsMounted = false);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rejectedBidsID.length, trigger]
  );

  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);

    if (Array.from(dropObjectParent.current.childNodes).length === 0) {
      setTrigger({ ...trigger, disableRejectBtn: true });
    }
  };

  const saveBidsInStorage = (tableRow) => {
    const bid = tableRow;

    const name = bid.childNodes[2].childNodes[0].childNodes[1].innerText;
    const BidID = parseInt(tableRow.attributes.id.nodeValue.split("-")[3]);

    droppedBidsArr.push({
      id: BidID,
      name: name,
      tranche: bid.childNodes[3].innerText,
      duration: bid.childNodes[4].innerText,
      amount: bid.childNodes[5].innerText,
      status: bid.childNodes[6].innerText,
    });

    // Save tables to local storage
    if (droppedBidsArr.length > 0) {
      localStorage.setItem(
        "REJECTED_BROKER_BIDS",
        JSON.stringify(droppedBidsArr)
      );
    }
  };

  const drop = (e) => {
    e.preventDefault();

    // Get dropped element data
    const data = e.dataTransfer.getData("text");

    // Table body DOM properties
    const droppedParerntProps = dropObjectParent.current;

    if (droppedParerntProps !== null || droppedParerntProps !== undefined) {
      // Append dragged element
      const appendedBid = droppedParerntProps.appendChild(
        document.getElementById(data)
      );

      const tableRowNodes = appendedBid;

      // Add functions to appended nodes
      tableRowNodes.drop = drop;
      tableRowNodes.drag = drag;

      // Save bid to storage
      saveBidsInStorage(tableRowNodes);

      // Remove checkbox copied from dragged HTML element
      tableRowNodes.childNodes[1].childNodes[0].childNodes[2].classList.add(
        "hidden"
      );

      // Remove buttons cells copied from HTML dragged element
      tableRowNodes.childNodes[
        tableRowNodes.childNodes.length - 1
      ].classList.add("hidden");

      /* Get dropped bids ID and update state. Start*/
      // Modify bids attribute
      const ID = appendedBid.attributes.id.nodeValue.split("-")[3];
      appendedBid.attributes.id.nodeValue = `rejectBids-drag-object-${ID}`;

      setRejectedBidsID((state) => [...state, parseInt(ID)]);

      /* Get dropped bids ID and update state. End*/
    }
  };
  /*Drag/drop functions ends*/

  const rejectBids = async (e) => {
    setTrigger({ ...trigger, showModal: true, isLoading: true });
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
        setTrigger({
          ...trigger,
          isLoading: false,
          rejectedBids: res,
          rejectBidStatus: "Rejected",
        });
      }
    }
  };

  const clearRejectedBids = () => {
    // Clear global bids objects array
    droppedBidsArr.length = 0;

    // Clear bids in local storage
    localStorage.setItem("REJECTED_BROKER_BIDS", JSON.stringify([]));

    // Cleat bids in state
    setRejectedBidsID([]);
  };

  const closeModal = () => {
    setTrigger({ ...trigger, showModal: false });
  };

  // Will enable Reject and Clear table buttons
  const storedBids = JSON.parse(storedRejectedBidsObj);

  const disableActionTableBtn = () => {
    if (rejectedBidsID.length === 0 && storedBids.length === 0) {
      return true;
    } else if(storedBids.length > 0 || rejectedBidsID > 0) {
      return false;
    }
  }

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
        onDragOver={(e) => e.preventDefault()}
        onDrop={drop}
      >
        <Table size="sm">
          <Thead bg="F0F0F0" h="80px">
            <Tr
              fontWeight={"extrabold"}
              fontSize={["1.9em"]}
              bgColor={"blackAlpha.100"}
            >
              <Th></Th>
              <Th>
                <i
                  className="fa fa-hand-rock-o font-bold text-lg"
                  aria-hidden="true"
                ></i>
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}
          >
            {/* Dragged bids are dropped in table boday */}
            {(function showRejectedBids() {
              const storedBids = JSON.parse(
                localStorage.getItem("REJECTED_BROKER_BIDS")
              );

              if (storedBids !== null && storedBids.length > 0) {
                return storedBids.map((bid, index) => {
                  if (!rejectedBidsID.includes(bid.id)) {
                    return (
                      <Tr
                        key={bid.id}
                        id={`rejectBids-drag-object-${bid.id}`}
                        draggable={true}
                      >
                        <Td></Td>
                        <Td>
                          <Flex>
                            <span
                              className="cursor-grab"
                              title="Drag item to unapproved table"
                              style={{ cursor: "hand" }}
                            >
                              <svg
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className="octicon octicon-grabber"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"
                                ></path>
                              </svg>
                            </span>
                          </Flex>
                        </Td>
                        <Td className="border">
                          <Flex>
                            <Box
                              w="40px"
                              h="40px"
                              borderRadius={"50%"}
                              bg={"#555555"}
                              mr={[4]}
                            ></Box>
                            <Flex alignSelf={"center"}>{bid.name}</Flex>
                          </Flex>
                        </Td>
                        <Td className="border">{bid.tranche}</Td>
                        <Td className="border">{bid.duration}</Td>
                        <Td className="border">{bid.amount}</Td>
                        <Td className="border cta-status--rejected">
                          {capitalizeFirstLetter(bid.status)}
                        </Td>

                        {/**Use render props CTA BUTTONS */}
                        <Td className="cta-buttons hidden">
                          <div>
                            {(() => {
                              if (bid.status === "approved") {
                                const bidData = bidsData.filter(
                                  // eslint-disable-next-line no-undef
                                  (data) => bid.id === data.id
                                )[0];

                                return (
                                  <div>
                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalEdit(bidData);
                                      }}
                                      className="cta-buttons--edit"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      // eslint-disable-next-line no-undef
                                      onClick={() => openDeleteModal(data)}
                                      className="cta-buttons--delete"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                );
                              }
                              // eslint-disable-next-line no-undef
                              if (bid === "rejected") {
                                const bidData = bidsData.filter(
                                  // eslint-disable-next-line no-undef
                                  (data) => bid.id === data.id
                                )[0];

                                return (
                                  <div>
                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalApproved(bidData);
                                      }}
                                      className="cta-buttons--approve"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalEdit(bidData);
                                      }}
                                      className="cta-buttons--edit"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      // eslint-disable-next-line no-undef
                                      onClick={() => openDeleteModal(data)}
                                      className="cta-buttons--delete"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                );
                              } else {
                                const bidData = bidsData.filter(
                                  // eslint-disable-next-line no-undef
                                  (data) => bid.id === data.id
                                )[0];

                                return (
                                  <div>
                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalApproved(bidData);
                                      }}
                                      className="cta-buttons--approve"
                                    >
                                      Approve
                                    </button>

                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalRejected(data);
                                      }}
                                      className="cta-buttons--reject"
                                    >
                                      Reject
                                    </button>

                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalEdit(bidData);
                                      }}
                                      className="cta-buttons--edit"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        // eslint-disable-next-line no-undef
                                        openModalDisagree(data);
                                      }}
                                      className="cta-buttons--disagree"
                                    >
                                      Disagree
                                    </button>
                                    <button
                                      // eslint-disable-next-line no-undef
                                      onClick={() => openDeleteModal(data)}
                                      className="cta-buttons--delete"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </Td>
                      </Tr>
                    );
                  }

                  return null;
                });
              }
            })()}
          </Tbody>
        </Table>
      </div>

      <div
        id="unapproved-bids-buttons"
        className="sm:flex sm:justify-end py-2 mx-4"
      >
        <button
          className={`mr-2 text-white p-1 rounded sm:w-32 w-full h-11 mb-3 sm:mb-0 ${
            disableActionTableBtn()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500"
          }`}
          onClick={clearRejectedBids}
          disabled={disableActionTableBtn()}
        >
          Clear table
        </button>
        <button
          className={`cta-buttons--unapproved text-white p-1 text-sm rounded sm:w-32 w-full h-11 ${
            disableActionTableBtn()
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500"
          }`}
          onClick={(e) => {
            if (rejectedBidsID.length > 0) rejectBids(e);
          }}
          disabled={disableActionTableBtn()}
        >
          Rejected all bid
        </button>
      </div>

      <BatchRejectBidsModal trigger={trigger} closeModal={closeModal} />
    </>
  );
}
