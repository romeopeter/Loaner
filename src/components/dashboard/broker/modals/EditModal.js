import { CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';

const EditModal = ({ closeModal, editModal, data, notification }) => {
    const className = editModal.modal ? 'open' : '';
    const [update, setUpdate] = useState({ duration: '', amount: '' });
    const [isLoading, setIsLoading] = useState(undefined);


    const onAmountChange = (e) => {
        const amount = e.target.value;
        setUpdate({ ...update, amount: amount });
    };

    const submit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        // console.log(update.duration);
        const detail = {
            amount: update.amount,
        };

        axios.patch(`/v1/bids/${data.id}/`, detail).then((response) => {
            console.log(response);
            response.statusText === 'OK' && setIsLoading(false);

            setTimeout(() => {
                setIsLoading(undefined);
            }, 3000);
        });
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
                                        <h2>
                                            Investor - {data.owner.first_name} {data.owner.last_name}
                                        </h2>
                                    </div>

                                    <input placeholder={data.amount} onChange={onAmountChange} type='number' required />
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
