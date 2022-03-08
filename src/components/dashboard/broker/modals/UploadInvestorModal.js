import React from 'react';

const DisagreeModal = ({ responsedata, closeModal }) => {
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
                                <p style={{ color: '#333', fontSize: '14px' }}>
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
                            padding: '0px 7px',
                            margin: 'auto',
                            border: '1px solid #333',
                            color: '#555',
                            borderRadius: '2px',
                            fontSize: '14px',
                        }}
                    >
                        Okay
                    </button>
                )}
            </div>
        </div>
    );
};

export default DisagreeModal;
