import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import bidApproved from '../../../../assets/images/bidApproved.png';
import bidRejected from '../../../../assets/images/bidRejected.png';

const SelectModal = ({ closeSelectModal, selectFilter, bidsData, checkbox }) => {
    const className = selectFilter.modal ? 'open' : '';
    const classSuccessState = selectFilter.value === 'approve all' ? 'h1Approved' : 'h1Rejected';

    const [isLoading, setIsLoading] = useState(undefined);

    const handleChange = () => {
        setIsLoading(true);

        setTimeout(() => {
            checkbox.forEach((e) => {
                if (e.checked && selectFilter.value === 'approve all') {
                    bidsData.forEach((d) => {
                        if (d.id === e.data.id) {
                            d.status = 'Approved';
                        }
                    });
                }
                if (e.checked && selectFilter.value === 'reject all') {
                    bidsData.forEach((d) => {
                        if (d.id === e.data.id) {
                            d.status = 'Rejected';
                        }
                    });
                }
            });

            setIsLoading(false);
        }, 1000);

        // Not the best method but this sets isLoading back to undefined to render the form again
        setTimeout(() => {
            setIsLoading(undefined);
        }, 8000);
    };
    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeSelectModal}></div>

            <div className='modal-body'>
                {(() => {
                    if (isLoading === undefined) {
                        return (
                            <div>
                                <div className='modal-head'>
                                    {selectFilter.value && (
                                        <div>
                                            {selectFilter.value === 'approve all' && <h2>Approve Bids?</h2>}
                                            {selectFilter.value === 'reject all' && <h2>Reject Bids?</h2>}
                                        </div>
                                    )}

                                    <button onClick={closeSelectModal} className='close-button'>
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <button
                                        onClick={handleChange}
                                        style={{
                                            background: '#e5e5e5',
                                            width: '50px',
                                            padding: '7px',
                                            marginRight: '20px',
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={closeSelectModal}
                                        style={{ background: '#d82c0d', width: '50px', padding: '7px', color: '#fff' }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        );
                    }
                    if (isLoading) {
                        return <div className='loader'></div>;
                    }
                    if (!isLoading) {
                        return (
                            <div>
                                {selectFilter.value === 'approve all' ? (
                                    <img alt='approved' className='img' src={bidApproved} />
                                ) : (
                                    <img alt='rejected' className='img' src={bidRejected} />
                                )}
                                {selectFilter.value === 'approve all' ? (
                                    <h1 className={`${classSuccessState}`}>You have Approved the Bids</h1>
                                ) : (
                                    <h1 className={`${classSuccessState}`}>You have Rejected the Bids</h1>
                                )}

                                <button className='modal-button ' onClick={closeSelectModal}>
                                    Back to list
                                </button>
                            </div>
                        );
                    }
                })()}
            </div>
        </div>
    );
};

export default SelectModal;
