import React from 'react';
// import { CloseIcon } from '@chakra-ui/icons';

import bidApproved from '../../../../assets/images/bidApproved.png';
import bidRejected from '../../../../assets/images/bidRejected.png';

const ApprovedPaymentModal = ({ closeModal, state, notification, updatedataApproved, updatedataRejected }) => {
    const className = state.modal ? 'open' : '';
    const classSuccessState = state.successState ? 'h1Approved' : 'h1Rejected';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModal}></div>

            <div className='modal-body'>
                {notification.isLoading === undefined && (
                    <div>
                        <div className='modal-head'>
                            {state.successState ? (
                                <h2>Are you sure you want to approve this payment?</h2>
                            ) : (
                                <h2>Are you sure you want to reject this payment?</h2>
                            )}
                            <button onClick={closeModal} className='close-button'></button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button
                                onClick={notification.dataApproved ? updatedataApproved : updatedataRejected}
                                style={{ background: '#e5e5e5', width: '50px', padding: '7px', marginRight: '20px' }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeModal}
                                style={{ background: '#d82c0d', width: '50px', padding: '7px', color: '#fff' }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

                {notification.isLoading ? <p className='loader'></p> : null}
                {notification.isLoading === false ? (
                    <div>
                        {state.successState ? (
                            <div>
                                <img alt='approved' className='img' src={bidApproved} />
                                <h1 className={`${classSuccessState}`}>Payment Approved</h1>
                                <p>You have approved JJ N5 Billion Payment</p>
                            </div>
                        ) : (
                            <div>
                                <img alt='rejected' className='img' src={bidRejected} />
                                <h1 className={`${classSuccessState}`}>Payment Rejected</h1>
                                <p>You have rejected JJ N5 Billion Payment</p>
                            </div>
                        )}

                        <button className='modal-button ' onClick={closeModal}>
                            Back to list
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ApprovedPaymentModal;
