import React from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {capitalizeFirstLetter} from "../../../../utils/general";
import { humanNumber } from "../../../../utils/HRN";

export default function RenderTable(props) {
  const {
    state,
    tableData,
    filterAction,
    disableApproved,
    handleCheckFunc,
    openPaymentModalFunc,
    openModalApprovedFunc,
    openModalRejectedFunc,
  } = props;

  console.log(tableData);

  return (
    <Table size="sm" colorScheme={"blackAlpha"}>
      <Thead bg="#F0F0F0" h="80px">
        <Tr fontWeight={"extrabold"} fontSize={["1.9em"]}>
          <Th></Th>
          <Th>
            <input
              type="checkbox"
              className={`broker-checkbox`}
              name="allSelect"
              disabled={disableApproved}
              checked={state.markedBids?.length === state.approvedBids?.length}
              onChange={(e) => handleCheckFunc(e, state.approvedBids)}
            />
          </Th>
          <Th>Name</Th>
          <Th>Amount</Th>
          <Th>Bid Status</Th>
          <Th>Payment Status</Th>
          <Th>Payment Proof</Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {/* CurrentTableData */}
        {tableData.map((data, index) => {
          // console.log(data);

          const bidPayment = data.payment;

          if (
            data["current_status"] === filterAction ||
            filterAction === "Filter payment"
          ) {
            if (bidPayment !== null) {
              return (
                <Tr key={index}>
                  <Td></Td>
                  <Td>
                    {" "}
                    <input
                      name={data.id}
                      type="checkbox"
                      className="broker-checkbox"
                      disabled={data.payment_status === "approved"}
                      // checked when checkedBid contains checked object
                      checked={
                        data.payment_status !== "approved" &&
                        state.markedBids.some((item) => item?.id === data.id)
                      }
                      onChange={(e) => handleCheckFunc(e, data)}
                    />
                  </Td>
                  <Td>
                    <Flex>
                      <Box
                        w="40px"
                        h="40px"
                        borderRadius={"50%"}
                        bg={"#555555"}
                        mr={[4]}
                      ></Box>
                      <Flex alignSelf={"center"}>
                        {data.owner.first_name} {data.owner.last_name}
                      </Flex>
                    </Flex>
                  </Td>

                  <Td>{humanNumber(data.amount)}</Td>
                  <Td>
                    {capitalizeFirstLetter(data.current_status)}
                  </Td>

                  {bidPayment.status !== "" ? (
                    <Td color={"#008060"}>
                      {capitalizeFirstLetter(data.current_status)}
                    </Td>
                  ) : (
                    <Td color={"#eed202"}>Pending</Td>
                  )}

                  {bidPayment["proof_of_payment"].length > 0 ? (
                    <Td
                      style={{
                        cursor: "pointer",
                        color: "#1C6CA6",
                        textDecoration: "underline"
                      }}
                      onClick={() => openPaymentModalFunc(data)}
                    >
                      View payment
                    </Td>
                  ) : (
                    <Td>-</Td>
                  )}

                  {bidPayment.status === "approved" ? (
                    <Td className="payment-cta">
                      <button
                        disabled={true}
                        className="payment-cta--approve rounded"
                        title="Bid already approved"
                      >
                        Approve Payment
                      </button>

                      <button
                        disabled={true}
                        className="payment-cta--reject rounded"
                        title="Bid already approved"
                      >
                        Reject Payment
                      </button>
                    </Td>
                  ) : (
                    <Td className="payment-cta">
                      <button
                        disabled={true}
                        className="payment-cta--approve rounded"
                        onClick={() => openModalApprovedFunc(data)}
                      >
                        Approve Payment
                      </button>

                      <button
                        disabled={true}
                        className="payment-cta--reject rounded"
                        onClick={() => {
                          openModalRejectedFunc(data);
                        }}
                      >
                        Reject Payment
                      </button>
                    </Td>
                  )}
                </Tr>
              );
            } else {
            }
          } else {
            return (
              <Tr key={index}>
                {index === 0 && (
                  <Td colSpan={7} className="text-center py-5 text-xl">
                    You have no {filterAction} payment
                  </Td>
                )}
              </Tr>
            );
          }

          return null;
        })}
      </Tbody>
    </Table>
  );
}
