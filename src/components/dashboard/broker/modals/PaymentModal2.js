import React from 'react';
import paymentProof from '../../../../assets/images/paymentProof.png';

const PaymentModal2 = ({ closePaymentModal, notification, openModalApproved, openModalRejected, state }) => {
    const className = state.paymentModal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closePaymentModal}></div>

            <div className='paymentmodal-body'>
                <img className='paymentProof' alt='payment proof' src={paymentProof} />
                <a href={paymentProof} download className='payment-modal-button'>
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

export default PaymentModal2;
