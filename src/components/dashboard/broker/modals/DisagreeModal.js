import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CloseIcon } from '@chakra-ui/icons';

const DisagreeModal = ({ closeModalDisagree, disModal }) => {
    const [isLoading, setIsLoading] = useState(undefined);

    const submit = (values) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(values);
            setIsLoading(false);
        }, 2000);
        // send values to api
    };
    let className = disModal.modal && (isLoading === true || isLoading === undefined) ? 'open' : '';

    return (
        <div className={`modal ${className}`}>
            <div className='modal-overlay' onClick={closeModalDisagree}></div>
            <div className='modal-body'>
                <div className='modal-head'>
                    <h2 htmlFor='firstName'>Why do you want to disagree?</h2>
                    <button onClick={closeModalDisagree} className='close-button'>
                        <CloseIcon />
                    </button>
                </div>
                <Formik
                    initialValues={{ textArea: '' }}
                    validationSchema={Yup.object({
                        textArea: Yup.string().max(15, 'Must be 15 characters or less').required('**Required'),
                    })}
                    onSubmit={submit}
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
                        {isLoading ? (
                            <p className='loader'></p>
                        ) : (
                            <button
                                style={{ padding: '7px 20px ', background: '#c4c4c4', marginTop: '25px' }}
                                type='submit'
                            >
                                Submit
                            </button>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default DisagreeModal;
