import React, { useMemo } from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { capitalizeFirstLetter } from "../../../../utils/general";
import { humanNumber } from "../../../../utils/HRN";

export default function OrderedListing({ tableStateObj, tableFuncObj }) {
  const { bidsData, checkedBid, paginationData } = tableStateObj;
  const {
    handleCheck,
    openModalApproved,
    openModalRejected,
    openModalDisagree,
    openModalEdit,
    openDeleteModal,
  } = tableFuncObj;

  const tableColumn = useMemo(
    () => ["name", "tranche", "duration", "amount", "status"],
    []
  );

  const tableData = useMemo(() => {

    const data = paginationData.map((data, index) => {

        return {
            id: data.id,
            name: `${data.owner.first_name} ${data.owner.last_name}`,
            tranche: data.loan_request.tranche_name,
            duration: `${data.loan_request.duration} days`,
            amount: humanNumber(data.amount),
            currency: ``,
            status: data.current_status,
        }
    });

    return data.sort((a, b) => a.id - b.id)
  }, [paginationData]);

  const disableApproved = bidsData.some((bid) => bid.status === "approved");

  return (
    <Table size="sm" colorScheme={"blackAlpha"}>
      <Thead bg="#F0F0F0" h="80px">
        <Tr fontWeight={"extrabold"} fontSize={["1.9em"]}>
          <Th></Th>
          <Th>
            <input
              type="checkbox"
              className={`broker-checkbox  `}
              name="allSelect"
              disabled={disableApproved}
              checked={checkedBid?.length === bidsData?.length}
              onChange={(e) => handleCheck(e, bidsData)}
            />
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

      <Tbody>
        {tableData.map((data, index) => {
          return (
            <Tr key={index}>
              <Td></Td>
              <Td>
                {" "}
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
              </Td>
              <Td className="border text-center">
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

              <Td className="border text-center">{data["tranche"]}</Td>
              <Td className="border text-center">{data["duration"]}</Td>
              <Td className="border text-center">{data["amount"]}</Td>

              {(() => {
                if (data["status"]) {
                  const approved =
                    data["status"] === "approved" ? "cta-status--approved" : "";
                  const rejected =
                    data["status"] === "rejected" ? "cta-status--rejected" : "";
                  return (
                    <Td className={`border ${approved} ${rejected} text-center`}>
                      {capitalizeFirstLetter(data["status"])}
                    </Td>
                  );
                } else {
                  return <Td className="border">-</Td>;
                }
              })()}

              {/**Use render props CTA BUTTONS */}
              <Td className="cta-buttons">
                {(() => {
                  if (data.status && data.status === "approved") {
                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalEdit(data);
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
                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalApproved(data);
                          }}
                          className="cta-buttons--approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            openModalEdit(data);
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
                    return (
                      <div>
                        <button
                          onClick={() => {
                            openModalApproved(data);
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
                            openModalEdit(data);
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
