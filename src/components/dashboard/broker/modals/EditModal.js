import { CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

const EditModal = ({ closeModal, editModal, data, notification }) => {
    const className = editModal.modal ? 'open' : '';
    const [update, setUpdate] = useState({ duration: '', amount: '' });
    const [isLoading, setIsLoading] = useState(undefined);

    const onDurationChange = (e) => {
        const duration = e.target.value;
        setUpdate({ ...update, duration: duration });
    };
    const onAmountChange = (e) => {
        const amount = e.target.value;
        setUpdate({ ...update, amount: amount });
    };

    const submit = (e) => {
        e.preventDefault();
        data.duration = update.duration;
        data.amount = update.amount;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        // Not the best method but this sets isLoading back to undefined to render the form again
        setTimeout(() => {
            setIsLoading(undefined);
        }, 8000);
    };

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModal}></div>

            <div className='modal-body'>
                {isLoading === undefined ? (
                    <div>
                        <div className='modal-head'>
                            <h2>Edit Bid</h2>
                            <button onClick={closeModal} className='close-button'>
                                <CloseIcon />
                            </button>
                        </div>
                        <form onSubmit={submit}>
                            {data && (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <h2>{data.clientName}</h2>
                                        <h2>{data.tranche}</h2>
                                    </div>
                                    <input
                                        style={{ margin: '20px 0px' }}
                                        placeholder={data.duration}
                                        onChange={onDurationChange}
                                        type='text'
                                        required
                                    />
                                    <input placeholder={data.amount} onChange={onAmountChange} type='text' required />
                                    <button
                                        style={{
                                            padding: '7px 20px ',
                                            background: '#555',
                                            marginTop: '25px',
                                            color: '#fff',
                                        }}
                                        type='submit'
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div>
                        {isLoading ? (
                            <div className='loader'></div>
                        ) : (
                            <div style={{ padding: '0px' }}>
                                <h2>Submitted!</h2>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        padding: '3px 10px',
                                        background: '#555',
                                        color: '#fff',
                                        marginTop: '20px',
                                    }}
                                >
                                    Okay
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditModal;
