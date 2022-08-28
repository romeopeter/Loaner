import bidRejected from "../../../../assets/images/bidRejected.png";

export default function BatchRejectBidsModal({ closeModal, trigger }) {
  const className = trigger.showModal ? "open" : "";

  const rejectedBidsNum =
    trigger.rejectedBids !== null && trigger.rejectedBids.length;

  return (
    <div className={`modal ${className}`}>
      <div className="modal-overlay" onClick={closeModal}></div>

      <div className="modal-body h-60 flex justify-center">
        {trigger.isLoading ? <p className="loader"></p> : null}

        {!trigger.isLoading && (
          <div>
            <img alt="rejected" className="img" src={bidRejected} />
            <h1 className="h1Rejected">Bids Rejected</h1>
            {rejectedBidsNum === 1 ? (
              <p>You rejected {rejectedBidsNum} bid offer.</p>
            ) : (
              <p>You rejected {rejectedBidsNum} bid offers.</p>
            )}

            <button className="modal-button " onClick={closeModal}>
              Back to list
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
