import React from "react";

import bidApproved from "../../../../assets/images/bidApproved.png";
import bidRejected from "../../../../assets/images/bidRejected.png";

import { humanNumber } from "../../../../utils/HRN";

const ApprovedPaymentModal = ({
  closeModal,
  modalState,
  notification,
  updatePaymentStatysFunc,
}) => {
  const className = modalState.modal ? "open" : "";
  const classSuccessState = modalState.successState
    ? "h1Approved"
    : "h1Rejected";

  const approvedData = notification.dataApproved;
  const rejectedData = notification.dataRejected;

  const updatePaymentReq = () => {
    if (modalState.modalType === "approved") {
      updatePaymentStatysFunc(modalState.modalType);
    }

    if (modalState.modalType === "rejected") {
      updatePaymentStatysFunc(modalState.modalType);
    }
  };

  return (
    <div className={`modal ${className}`}>
      <div className="modal-overlay" onClick={closeModal}></div>

      <div className="modal-body">
        {notification.isLoading === undefined ? (
          <div>
            <div className="modal-head">
              {modalState.modalType === "approved" ? (
                <h2>Are you sure you want to approve this payment?</h2>
              ) : modalState.modalType === "rejected" ? (
                <h2>Are you sure you want to reject this payment?</h2>
              ) : null}
              <button onClick={closeModal} className="close-button"></button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={updatePaymentReq}
                style={{
                  background: "#e5e5e5",
                  width: "50px",
                  padding: "7px",
                  marginRight: "20px",
                }}
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                style={{
                  background: "#d82c0d",
                  width: "50px",
                  padding: "7px",
                  color: "#fff",
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : null}

        {notification.isLoading ? <p className="loader"></p> : null}

        {notification.error && notification.isLoading !== undefined ? (
          <p className="font-medium py-10 text-center">
            Something went wrong. Please try again.
          </p>
        ) : null}

        {notification.requestSuccess ? (
          <div>
            {modalState.modalType === "approved" ? (
              <div>
                <img alt="approved" className="img" src={bidApproved} />
                <h1 className={`${classSuccessState}`}>Payment Approved</h1>
                <p>
                  You have approved{" "}
                  {`${approvedData.owner["first_name"]} ${approvedData.owner["last_name"]}'s`}{" "}
                  {humanNumber(approvedData.payment.amount)} Payment
                </p>
              </div>
            ) : modalState.modalType === "rejected" ? (
              <div>
                <img alt="rejected" className="img" src={bidRejected} />
                <h1 className={`${classSuccessState}`}>Payment Rejected</h1>
                <p>
                  You have rejected{" "}
                  {`${rejectedData.owner["first_name"]} ${rejectedData.owner["last_name"]}'s`}{" "}
                  {humanNumber(rejectedData.payment.amount)} Payment
                </p>
              </div>
            ) : null}

            <button className="modal-button " onClick={closeModal}>
              Back to list
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ApprovedPaymentModal;
