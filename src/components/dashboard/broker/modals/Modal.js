import React from 'react';
import bidApproved from '../../../../assets/images/bidApproved.png';
import bidRejected from '../../../../assets/images/bidRejected.png';

const Modal = ({ closeModal, state, successState }) => {
    const className = state ? 'open' : '';
    const classSuccessState = successState ? 'h1Approved' : 'h1Rejected';
    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModal}></div>

            <div className='modal-body'>
                {successState ? (
                    <img alt='approved' className='img' src={bidApproved} />
                ) : (
                    <img alt='rejected' className='img' src={bidRejected} />
                )}
                {successState ? (
                    <h1 className={`${classSuccessState}`}>Payment Approved</h1>
                ) : (
                    <h1 className={`${classSuccessState}`}>Payment Rejected</h1>
                )}

                {successState ? (
                    <p>You have approved JJ N5 Billion Payment</p>
                ) : (
                    <p>You have rejected JJ N5 Billion Payment</p>
                )}

                <button className='modal-button ' onClick={closeModal}>
                    Back to list
                </button>
            </div>
        </div>
    );
};

export default Modal;
