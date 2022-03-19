import React from 'react';

// import { CloseIcon } from '@chakra-ui/icons';

const DeleteModal = ({ deleteModal, handleDelete, closeDeleteModal }) => {
    const className = deleteModal.modal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeDeleteModal}></div>

            <div className='modal-body'>
                <div className='modal-head'>
                    <h2>Are you sure you want to delete this bid?</h2>
                    <button onClick={closeDeleteModal} className='close-button'>

                    </button>
                </div>
                {deleteModal.isLoading && <p className='loader'></p>}
                {deleteModal.isLoading === undefined && (
                    <div style={{ marginTop: '20px' }}>
                        <button
                            onClick={handleDelete}
                            style={{ background: '#e5e5e5', width: '50px', padding: '7px', marginRight: '20px' }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={closeDeleteModal}
                            style={{ background: '#d82c0d', width: '50px', padding: '7px', color: '#fff' }}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteModal;
