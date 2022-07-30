import React, { useMemo, useEffect, useCallback } from "react";

import { useStateReducer } from "../../../../hooks/useStateReducer";
import { paymentStateInit, paymentStateReducer } from "../state/payment.state";

import { getapprovedBid } from "../../../../services/bid.service";
import { getPayments, updatePayment } from "../../../../services/payment.service";

import { Box} from "@chakra-ui/react";
import Table from "./Table";

import { useParams } from "react-router-dom";

import OrderbookLayout from "../../../OrderbookLayout";
import NavMenu from "../../NavMenu";
import SubNavBar from "../layouts/SubNavBar";

import DocumentHead from "../../../DocumentHead";
import PaymentModal1 from "../modals/PaymentModal1";
import PaymentModal2 from "../modals/PaymentModal2";
import Pagination from "../pagination/Pagination";
import bidRejected from "../../../../assets/images/bidRejected.png";

const Payment = () => {
  let { id } = useParams();
  const pageSize = 10;

  const [state, dispatch] = useStateReducer(
    paymentStateReducer,
    paymentStateInit
  );

  const openPaymentModal = (data) => {
    // Update Modal state
    dispatch({
      type: "OPEN_PAYMENT_MODAL",
      payload: data,
    });
  };
  const closePaymentModal = () => {
    // Update Modal state
    dispatch({ type: "CLOSE_PAYMENT_MODAL" });
  };

  const openModalApproved = (data) => {
    // Update Modal state
    dispatch({ type: "OPEN_APPROVED_MODAL" });

    // Update Notification state
    dispatch({
      type: "OPEN_NOTIFICATION_APPROVED_MODAL",
      payload: data,
    });
  };

  const openModalRejected = (data) => {
    // Update Modal state
    dispatch({ type: "OPEN_REJECTED_MODAL" });

    // Update Notification state
    dispatch({
      type: "OPEN_NOTIFICATION_REJECTED_MODAL",
      payload: data,
    });
  };

  const closeModal = () => {
    // Update modal state
    dispatch({ type: "CLOSE_MODAL" });

    // Update Notification state
    setTimeout(() => {
      dispatch({ type: "CLOSE_NOTIFICATION_MODAL" });
    }, 1000);
  };

  const handleApply = useCallback(
    (e) => {
      e.preventDefault();

      if (state.markedBidsActionFilter.value === undefined) {
        dispatch({type: "MARKED_BIDS_ACTION_FILTER"});
      } else
        dispatch({
            type: "MARKED_BIDS_ACTION_FILTER_MODIFIED",
            payload: {
                modal: true,
                successState: true
            }
        });
    },
    [dispatch, state.markedBidsActionFilter.value]
  );

  // Checkbox action start
  const handleChange = (e) => {
    e.preventDefault();

    let value = e.target.value;
    if (value === "Select action") {
        dispatch({type: "MARKED_BIDS_ACTION_FILTER"})
    } else {
        dispatch({
            type: "MARKED_BIDS_ACTION_FILTER_MODIFIED",
            payload: value
        });
    }
  };

  const handleCheck = (e, data) => {
    const { name, checked } = e.target;

    if (checked) {
      if (name === "allSelect") {
        dispatch({type: "MARKED_BIDS", payload: state.approvedBids});
      } else {
        dispatch({type: "MARKED_BIDS", payload: [...state.markedBids, data]});
      } 
    }

    if (!checked) {
      if (name === "allSelect") {
        dispatch({type: "MARKED_BIDS", payload: []});
      } else {
        let temp = state.markedBids.filter((item) => item.id !== data.id);
        dispatch({type: "MARKED_BIDS", payload: temp});
      }
    }
  };

  const className = (state.markedBids !== undefined && state.markedBids.length) < 2 ? "disable" : "";

  let disableApproved;
  state.approvedBids.some((bid) => {
    return (disableApproved = bid.payment_status === "approved");
  });
  // checbox action end

  // Handle status update approved
  const updatedataApproved = useCallback(() => {
    let data = state.notification.dataApproved;
    // Update Notification state
    dispatch({type: "SET_PAYMENT_NOTIFICATION", payload: false});

    (async function () {
      if (data) {
        try {
          const res = await updatePayment({
            id: data.id,
            data: {
              amount: data.amount,
              bid: data.id,
              status: "approved",
            },
          });

            if (res.statusText === "OK") {
                // Update Notification state
                dispatch({type: "SET_PAYMENT_NOTIFICATION", payload: false});
            }
        } catch (_) {
            // Update Notification state
            dispatch({type: "SET_PAYMENT_NOTIFICATION", payload: true});
        }
      }
    })();
  }, [dispatch, state.notification.dataApproved]);

  useEffect(() => {
    let componentIsMounted = true;

    (async function approvedBid() {
      try {
        const request = await getapprovedBid(id);

        if (request.statusText === "OK") {
          if (componentIsMounted) {
            // Update Approved Bids state
            dispatch({ type: "APPROVED_BIDS", payload: request.data });

            // Update Data State state
            dispatch({
              type: "DATA_STATE",
              payload: {
                error: "",
                isLoading: false,
              },
            });
          }
        }
      } catch (_) {
        if (componentIsMounted) {
          // Update Data State state
          dispatch({
            type: "DATA_STATE",
            payload: {
              error: "Something Went Wrong",
              isLoading: false,
            },
          });
        }
      }
    })();

    (async function bidPayments() {
      try {
        const response = await getPayments();

        if (response.statusText === "OK") {
          dispatch({
            type: "BID_PAYMENT",
            payload: response.data,
          });
        }
      } catch (_) {
        // Do nothing
      }
    })();

    return () => (componentIsMounted = false);
  }, [id, handleApply, dispatch]);

  const currentTableData = useMemo(() => {
    if (state.approvedBids !== undefined) {
      const firstPageIndex = (state.currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return state.approvedBids.slice(firstPageIndex, lastPageIndex);
    }
  }, [state.currentPage, state.approvedBids, pageSize]);

  return (
    <div>
      <DocumentHead title="Payments" />
      <OrderbookLayout PageNav={NavMenu}>
        {/* Sub-navbar */}
        <SubNavBar />

        <main className="bids">
          <div className="bids-heading">
            <h1 style={{ padding: "30px" }}>
              {" "}
              {state.approvedBids.length > 0 &&
                state.approvedBids[0].loan_request.tranche_name}
            </h1>
          </div>
          <div className="mid-nav">
            <div className={`${className} mid-nav--dropdown`}>
              <select onChange={handleChange}>
                <option defaultValue={"Select action"}> Select action</option>
                <option value="approve all">Approve all</option>
                <option value="reject">Reject all</option>
              </select>

              <button onClick={handleApply} className="mid-nav-button">
                Apply
              </button>
            </div>

            <select className="mid-nav--filter rounded" onChange={(e) => dispatch({
              type: "MARKED_BIDS_VIEW_FILTER", 
              payload: e.target.value
            })}>
              <option defaultValue={"Select action"}>Filter payment</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <section style={{ paddingBottom: "10%" }}>
            <Box>
              <div className="tableScroll">
                {(() => {
                  if (state.dataState.isLoading) {
                    return (
                      <p
                        className="loader"
                        style={{ margin: "100px auto" }}
                      ></p>
                    );
                  }
                  
                  if (state.dataState.error) {
                    return (
                      <p
                        className="responseMessage"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          margin: "100px auto",
                        }}
                      >
                        <img
                          alt=""
                          src={bidRejected}
                          style={{ height: "30px", width: "30px" }}
                        />
                        Something went wrong, please try again.{" "}
                      </p>
                    );
                  }

                  return currentTableData.map(data => {
                    if (data["current_status"] === state.markedBidsViewFilter) {

                      return (
                        <Table
                          state={state}
                          tableData={currentTableData}
                          disableApproved={disableApproved}
                          handleCheckFunc={handleCheck}
                          openPaymentModalFunc={openPaymentModal}
                          openModalApprovedFunc={openModalApproved}
                          openModalRejectedFunc={openModalRejected}
                        />
                      );
                    }
                    
                    return null
                  })


                })()}

              </div>
              <Pagination
                className="pagination-bar"
                currentPage={state.currentPage}
                totalCount={state.approvedBids.length}
                pageSize={pageSize}
                onPageChange={(page) =>
                  dispatch({ type: "CURRENT_PAGE", payload: page })
                }
              />
            </Box>
            <PaymentModal1
              closeModal={closeModal}
              state={state.modal}
              notification={state.notification}
              updatedataApproved={updatedataApproved}
            />
            <PaymentModal2
              state={state.modal}
              closePaymentModal={closePaymentModal}
              notification={state.notification}
              openModalApproved={openModalApproved}
              openModalRejected={openModalRejected}
              paymentData={state.bidPayment}
            />
          </section>
        </main>
      </OrderbookLayout>
    </div>
  );
};

export default Payment;
