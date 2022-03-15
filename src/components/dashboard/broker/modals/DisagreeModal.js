import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CloseIcon } from '@chakra-ui/icons';

const DisagreeModal = ({ closeModalDisagree, disModal, disagreeForm }) => {
    let className = disModal.modal ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModalDisagree}></div>
            <div className='modal-body'>
                {disModal.isLoading === undefined && (
                    <div>
                        <div className='modal-head'>
                            <h2>Why do you want to disagree?</h2>
                            <button onClick={closeModalDisagree} className='close-button'>
                                <CloseIcon />
                            </button>
                        </div>
                        <Formik
                            initialValues={{ textArea: '' }}
                            validationSchema={Yup.object({
                                textArea: Yup.string().min(5, 'Must be more than 5 characters').required('**Required'),
                            })}
                            onSubmit={(values) => disagreeForm(values)}
                        >
                            <Form>
                                <ErrorMessage name='textArea' />
                                <div>
                                    <Field
                                        placeholder='Enter reason'
                                        style={{ width: '100%' }}
                                        as='textarea'
                                        name='textArea'
                                        type='text'
                                    />
                                </div>

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
                            </Form>
                        </Formik>
                    </div>
                )}

                <div>
                    {disModal.isLoading && <div className='loader'></div>}
                    {disModal.isLoading === false && (
                        <div style={{ padding: '0px' }}>
                            <h2>Submitted!</h2>
                            <button
                                onClick={closeModalDisagree}
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
            </div>
        </div>
    );
};

export default DisagreeModal;
