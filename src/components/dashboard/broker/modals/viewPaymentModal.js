import React from 'react';

const ViewPaymentModal = ({
    closePaymentModal,
    notification,
    openModalApproved,
    openModalRejected,
    state,
    paymentData,
}) => {
    let proofOfPayment;
    if (state.data) {
        let index = paymentData && paymentData.findIndex((item) => item.bid === state.data.id);
        proofOfPayment = paymentData[index];
    }

    const className = state.paymentModal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closePaymentModal}></div>

            <div className='paymentmodal-body'>
                <img
                    className='paymentProof'
                    alt='payment proof'
                    src={proofOfPayment && proofOfPayment.proof_of_payment[0].file_url}
                />
                <a
                    href={proofOfPayment && proofOfPayment.proof_of_payment[0].file_url}
                    download
                    className='payment-modal-button'
                >
                    Download Payment Proof
                </a>
                <div>
                    {notification.isLoading === undefined && (
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={openModalApproved} className='payment-cta--approve'>
                                Approve Payment
                            </button>
                            <button onClick={openModalRejected} className='payment-cta--reject'>
                                Reject Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

 export default ViewPaymentModal;
