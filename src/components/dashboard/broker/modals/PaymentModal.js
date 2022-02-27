import React, { useState } from 'react';
import paymentProof from '../../../../assets/images/paymentProof.png';
import bidApproved from '../../../../assets/images/bidApproved.png';
import bidRejected from '../../../../assets/images/bidRejected.png';

const PaymentModal = ({ paymentModal, closePaymentModal }) => {
    const className = paymentModal ? 'open' : '';
    const [notification, setNotification] = useState({ approved: false, rejected: false, text: '' });
    const handleApprove = () => {
        setNotification({ approved: true, text: 'Approved' });
    };
    const handleReject = () => {
        setNotification({ rejected: true, text: 'Rejected' });
    };
    const image = notification.text === 'Approved' ? bidApproved : bidRejected;
    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closePaymentModal}></div>

            <div className='modal-body'>
                <img className='paymentProof' alt='payment proof' src={paymentProof} />
                <a href={paymentProof} download className='payment-modal-button'>
                    Download Payment Proof
                </a>
                <div>
                    {notification.approved || notification.rejected ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ width: '30px', height: '30px', marginRight: '20px' }} alt='' src={image} />
                            <h1>Payment {notification.text}</h1>
                        </div>
                    ) : (
                        <div>
                            <button
                                disabled={notification.rejected}
                                onClick={handleApprove}
                                className='payment-cta--approve'
                            >
                                Approve Payment
                            </button>
                            <button onClick={handleReject} className='payment-cta--reject'>
                                Reject Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
