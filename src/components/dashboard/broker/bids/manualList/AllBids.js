import React, { useRef } from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { capitalizeFirstLetter } from "../../../../../utils/general";

export default function AllBids({
  tableData,
  tableColumn,
  tableStateObj,
  tableFuncObj,
}) {
  const {
    handleCheck,
    openModalApproved,
    openModalRejected,
    openModalDisagree,
    openModalEdit,
    openDeleteModal,
  } = tableFuncObj;

  const { checkedBid, bidsData } = tableStateObj;

  /*Drag/drop functions starts*/
  let dropObjectParent = useRef();

  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

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
        // Remove buttons cells copied from HTML dragged element
        const tableRowNodes = child.childNodes;
        tableRowNodes[tableRowNodes.length - 1].classList.remove("hidden");

        // // Remove checkbox copied from dragged HTML element
        tableRowNodes[1].childNodes[0].childNodes[2].classList.remove("hidden");
      });
    }
  };
  /*Drag/drop functions ends*/

  return (
    <Table
      size="sm"
      colorScheme={"blackAlpha"}
      onDragOver={(e) => e.preventDefault()}
      onDrop={drop}
    >
      <Thead bg="#F0F0F0" h="80px">
        <Tr fontWeight={"extrabold"} fontSize={["1.9em"]}>
          <Th></Th>
          <Th>
            <Flex>
              <span className="mr-1">
                <i
                  className="fa fa-hand-rock-o font-bold text-lg"
                  aria-hidden="true"
                ></i>
              </span>{" "}
              <input
                type="checkbox"
                className={`broker-checkbox self-center`}
                name="allSelect"
                checked={checkedBid?.length === bidsData?.length}
                onChange={(e) => handleCheck(e, bidsData)}
              />
            </Flex>
          </Th>
          {tableColumn.map((column, index) => {
            return (
              <Th key={index} className="border">
                {column}
              </Th>
            );
          })}
          <Th>Actions</Th>
        </Tr>
      </Thead>

      <Tbody ref={dropObjectParent}>
        {tableData.map((data, index) => {

          return (
            <Tr
              id={`allbids-drag-object-${data.id}`}
              key={index}
              draggable={true}
              onDragStart={drag}
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
                  </span>{" "}
                  <input
                    name={data["id"]}
                    type="checkbox"
                    className="broker-checkbox"
                    disabled={data["status"] === "approved"}
                    // checked when checkedBid contains checked object/filed/row
                    checked={
                      data.status !== "approved" &&
                      checkedBid.some((item) => item?.id === data.id)
                    }
                    onChange={(e) => handleCheck(e, data)}
                  />
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

                  <Flex alignSelf={"center"}>{data["name"]}</Flex>
                </Flex>
              </Td>

              <Td className="border">{data["tranche"]}</Td>
              <Td className="border">{data["duration"]}</Td>
              <Td className="border">NGN {data["amount"]}</Td>

              {(() => {
                if (data["status"]) {
                  const approved =
                    data["status"] === "approved" ? "cta-status--approved" : "";
                  const rejected =
                    data["status"] === "rejected" ? "cta-status--rejected" : "";
                  return (
                    <Td className={`border ${approved} ${rejected}`}>
                      {capitalizeFirstLetter(data["status"])}
                    </Td>
                  );
                } else {
                  return <Td className="border">-</Td>;
                }
              })()}

              {/** Use render props CTA BUTTONS */}
              <Td className="cta-buttons">
                {(() => {
                  if (data.status && data.status === "approved") {
                    const bidData = bidsData.filter(
                      (bid) => data.id === bid.id
                    )[0];

                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalEdit(bidData);
                          }}
                          className="cta-buttons--edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(data)}
                          className="cta-buttons--delete"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  }
                  if (data.status && data.status === "rejected") {
                    const bidData = bidsData.filter(
                      (bid) => data.id === bid.id
                    )[0];

                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalApproved(bidData);
                          }}
                          className="cta-buttons--approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            openModalEdit(bidData);
                          }}
                          className="cta-buttons--edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(data)}
                          className="cta-buttons--delete"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  } else {
                    const bidData = bidsData.filter(
                      (bid) => data.id === bid.id
                    )[0];

                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalApproved(bidData);
                          }}
                          className="cta-buttons--approve"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => {
                            openModalRejected(data);
                          }}
                          className="cta-buttons--reject"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => {
                            openModalEdit(bidData);
                          }}
                          className="cta-buttons--edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            openModalDisagree(data);
                          }}
                          className="cta-buttons--disagree"
                        >
                          Disagree
                        </button>
                        <button
                          onClick={() => openDeleteModal(data)}
                          className="cta-buttons--delete"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  }
                })()}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
