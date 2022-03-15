import React from 'react';
import bidRejected from '../../../../assets/images/bidRejected.png';
import bidApproved from '../../../../assets/images/bidApproved.png';

const PostModal = ({ responsedata, closeModal }) => {
    const className = responsedata.modal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModal}></div>
            <div className='modal-body' style={{ width: 'auto' }}>
                <div
                    className=''
                    style={{
                        borderBottom: 'none',
                        marginBottom: '10px',

                        fontWeight: '100',
                        textAlign: 'center',
                    }}
                >
                    {(() => {
                        if (responsedata.isLoading) {
                            return (
                                <div className='loader-div' style={{ boxShadow: 'none', padding: '0px' }}>
                                    <p className='loader'></p>
                                    <p>Please Wait</p>
                                </div>
                            );
                        } else if (responsedata.status || responsedata.error) {
                            return (
                                <p
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                    }}
                                >
                                    <img
                                        alt=''
                                        src={responsedata.error ? bidRejected : bidApproved}
                                        style={{ height: '30px', width: '30px', marginRight: '10px' }}
                                    />
                                    {responsedata.status || responsedata.error}
                                </p>
                            );
                        }
                    })()}
                </div>
                {!responsedata.isLoading && (
                    <button
                        onClick={closeModal}
                        style={{
                            padding: '8px 30px',
                            color: '#fff',
                            borderRadius: '4px',
                            background: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        Okay
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostModal;
