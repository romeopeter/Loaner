import React from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { capitalizeFirstLetter } from "../../../../utils/general";
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

  if (tableData.length === 0) {
    return (
      <div className="h-40 w-full">
        <p className="font-medium py-10 text-center">
          No payment has been made yet.
        </p>
      </div>
    );
  }

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
          <Th>Actions</Th>
        </Tr>
      </Thead>

      <Tbody>
        {/* CurrentTableData */}

        {tableData.map((data, idx) => {
          const payment = data.payment;

          const selecAllPayment = state.markedBids.some((item) => item?.id === payment.id);

          if (
            data["current_status"] === filterAction ||
            filterAction === "Filter payment"
          ) {
            return (
              <Tr key={idx}>
                <Td></Td>
                <Td>
                  {" "}
                  <input
                    name={data.id}
                    type="checkbox"
                    className="broker-checkbox"
                    disabled={data["current_status"] === "approved"}
                    // checked when checkedBid contains checked object
                    checked={(payment !== null && payment.status === "approved") && selecAllPayment}
                    onChange={(e) => {
                      payment !== null && handleCheckFunc(e, payment);
                    }}
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

                {/* Amount */}

                {payment !== null ? (
                  <Td>{humanNumber(payment.amount)}</Td>
                ) : (
                  <Td>{humanNumber(data.amount)}</Td>
                )}

                {/* Bid status */}
                {data["current_status"] !== "" ? (
                  <Td color={"#008060"}>
                    {capitalizeFirstLetter(data["current_status"])}
                  </Td>
                ) : (
                  <Td color={"#eed202"}>Pending</Td>
                )}

                {/* Payment status */}
                {payment !== null && payment.status !== "" ? (
                  <Td color={"#008060"}>
                    { capitalizeFirstLetter(payment.status)}
                  </Td>
                ) : (
                  <Td className="text-center">---</Td>
                )}

                {/* Proof of payment */}
                {payment !== null ? (
                  <Td
                    style={{
                      cursor: "pointer",
                      color: "#1C6CA6",
                      textDecoration: "underline",
                    }}
                    onClick={() => openPaymentModalFunc(data)}
                  >
                    View payment
                  </Td>
                ) : (
                  <Td className="text-center">---</Td>
                )}

                {payment !== null && payment.status === "approved" ? (
                  <Td className="payment-cta">
                    <button
                      disabled={true}
                      className="payment-cta--approve rounded"
                      title="You can't approve an already approved payment"
                      onClick={() => openModalApprovedFunc(data)}
                    >
                      Approve payment
                    </button>

                    <button
                      disabled={true}
                      className="payment-cta--reject rounded"
                      title="You can't reject an approved payment"
                      onClick={() => {
                        openModalRejectedFunc(data);
                      }}
                    >
                      Reject payment
                    </button>
                  </Td>
                ) : (
                  <Td className="payment-cta">
                    <button
                      className="payment-cta--approve rounded"
                      onClick={() => openModalApprovedFunc(data)}
                    >
                      Approve payment
                    </button>

                    <button
                      className="payment-cta--reject rounded"
                      onClick={() => {
                        openModalRejectedFunc(data);
                      }}
                    >
                      Reject payment
                    </button>
                  </Td>
                )}
              </Tr>
            );
          } else {
            return (
              <Tr key={idx}>
                {idx === 0 && (
                  <Td colSpan={7} className="text-center py-5 text-xl">
                    You have no {filterAction} payment
                  </Td>
                )}
              </Tr>
            );
          }
        })}
      </Tbody>
    </Table>
  );
}
