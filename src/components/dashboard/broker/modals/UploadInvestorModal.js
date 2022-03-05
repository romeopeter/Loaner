import React from 'react';

const DisagreeModal = ({ responsedata, closeModal }) => {
    const className = responsedata.modal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModal}></div>
            <div className='modal-body'>
                <div
                    className=''
                    style={{
                        borderBottom: 'none',
                        marginBottom: '0px',
                        padding: '5px',
                        fontWeight: '100',
                        textAlign: 'justify',
                    }}
                >
                    {(() => {
                        if (responsedata.isLoading) {
                            return <p className='loader'></p>;
                        } else if (responsedata.status || responsedata.error) {
                            return (
                                <p style={{ color: '#555', fontSize: '14px' }}>
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
                            padding: '3px 7px',
                            margin: 'auto',
                            background: '#555',
                            color: '#fff',
                            borderRadius: '4px',
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
