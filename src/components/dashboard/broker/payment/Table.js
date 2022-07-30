import React from "react";
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function RenderTable(props) {
    const {
        state, 
        tableData, 
        disableApproved, 
        handleCheckFunc, 
        openPaymentModalFunc, 
        openModalApprovedFunc,
        openModalRejectedFunc
    } = props

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
          const bidPayment = data.payment;

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

              <Td>{data.amount}</Td>
              <Td>
                {data.current_status.charAt(0).toUpperCase() +
                  data.current_status.slice(1)}
              </Td>

              {bidPayment.status !== "" ? (
                <Td color={"#008060"}>
                  {bidPayment.status.charAt(0).toUpperCase() +
                    data.current_status.slice(1)}
                </Td>
              ) : (
                <Td color={"#eed202"}>Pending</Td>
              )}

              {bidPayment["proof_of_payment"].length > 0 ? (
                <Td
                  style={{
                    cursor: "pointer",
                    color: "#1C6CA6",
                  }}
                  onClick={() => openPaymentModalFunc(data)}
                >
                  View Payment
                </Td>
              ) : (
                <Td>-</Td>
              )}

              {data.payment_status ? (
                <Td>
                  <button disabled={true} className="payment-cta--approve">
                    Approve Payment
                  </button>

                  <button disabled={true} className="payment-cta--reject">
                    Reject Payment
                  </button>
                </Td>
              ) : (
                <Td className="payment-cta">
                  <button
                    onClick={() => openModalApprovedFunc(data)}
                    className="payment-cta--approve rounded"
                  >
                    Approve Payment
                  </button>

                  <button
                    onClick={() => {
                        openModalRejectedFunc(data);
                    }}
                    className="payment-cta--reject rounded"
                  >
                    Reject Payment
                  </button>
                </Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}