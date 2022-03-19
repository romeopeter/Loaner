import React from 'react';
import axios from 'axios';
import { CloseIcon } from '@chakra-ui/icons';
import bidApproved from '../../../../assets/images/bidApproved.png';
import bidRejected from '../../../../assets/images/bidRejected.png';

const SelectModal = ({ closeSelectModal, selectFilter, setSelectFilter, checkbox }) => {
    const className = selectFilter.modal ? 'open' : '';
    const classSuccessState = selectFilter.value === 'approve all' ? 'h1Approved' : 'h1Rejected';

    const handleChange = () => {
        setSelectFilter({ ...selectFilter, isLoading: true });

        checkbox.forEach((e) => {
            if (e && selectFilter.value === 'approve all') {
                const detail = {
                    status: {
                        name: 'approved',
                        message: 'Please take heed to this',
                    },
                };

                axios.patch(`v1/bids/${e.id}/`, detail).then((res) => {
                    res.statusText === 'OK' && setSelectFilter({ ...selectFilter, isLoading: false });
                });
            } else if (e && selectFilter.value === 'reject all') {
                const detail = {
                    status: {
                        name: 'rejected',
                        message: 'Rejected',
                    },
                };

                axios.patch(`v1/bids/${e.id}/`, detail).then((res) => {
                    res.statusText === 'OK' && setSelectFilter({ ...selectFilter, isLoading: false });
                });
            }
        });
    };
    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeSelectModal}></div>

            <div className='modal-body'>
                {(() => {
                    if (selectFilter.isLoading === undefined) {
                        return (
                            <div>
                                <div className='modal-head'>
                                    {selectFilter.value && (
                                        <div>
                                            {selectFilter.value === 'approve all' && <h2>Approve Bids?</h2>}
                                            {selectFilter.value === 'reject all' && <h2>Reject Bids?</h2>}
                                        </div>
                                    )}

                                    <button onClick={closeSelectModal} className='close-button'></button>
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
                    if (selectFilter.isLoading) {
                        return <div className='loader'></div>;
                    }
                    if (!selectFilter.isLoading) {
                        return (
                            <div>
                                {selectFilter.value === 'approve all' ? (
                                    <img alt='approved' className='img' src={bidApproved} />
                                ) : (
                                    <img alt='rejected' className='img' src={bidRejected} />
                                )}
                                {selectFilter.value === 'approve all' ? (
                                    <div>
                                        <h1 className={`${classSuccessState}`}>Approved</h1>
                                    </div>
                                ) : (
                                    <h1 className={`${classSuccessState}`}>Rejected</h1>
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
