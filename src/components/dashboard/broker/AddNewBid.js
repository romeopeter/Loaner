import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-dropdown-select';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Grid } from '@chakra-ui/react';

const AddNewBid = () => {
    let navigate = useNavigate();

    const [active, setActive] = useState(false);

    const handleState = () => {
        setActive(true);
    };

    const options = [
        { id: 1, label: 'Investor1' },
        { id: 2, label: 'Investor2' },
        { id: 3, label: 'Investor3' },
        { id: 4, label: 'Investor4' },
        { id: 5, label: 'Investor5' },
        { id: 6, label: 'Investor6' },
        { id: 7, label: 'Investor7' },
    ];

    return (
        <>
            <DocumentHead title='New Client' />
            <OrderbookLayout PageNav={NavMenu}>
                <div className='NewBid'>
                    <div className='NewBid--form'>
                        <Grid>
                            {!active && (
                                <div>
                                    <h1>Select Investor </h1>
                                    <Grid templateColumns='92% 8%'>
                                        <Select
                                            valueField='id'
                                            className='NewBid--form-input'
                                            options={options}
                                            onChange={(value) => console.log(value)}
                                        />
                                        <button
                                            onClick={() => {
                                                navigate('/broker/dashboard/allbids');
                                            }}
                                        >
                                            +
                                        </button>
                                    </Grid>

                                    <h2>OR</h2>
                                    <button value={active} onClick={handleState} className='buttonMod'>
                                        Add New Investor{' '}
                                    </button>
                                </div>
                            )}

                            {active && (
                                <div>
                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            password: '',
                                            organisation: '',
                                            confirmPassword: '',
                                        }}
                                        validationSchema={Yup.object({
                                            firstName: Yup.string()
                                                .max(15, 'Must be 15 characters or less')
                                                .required('*Required'),
                                            lastName: Yup.string()
                                                .max(20, 'Must be 20 characters or less')
                                                .required('*Required'),
                                            email: Yup.string().email('Invalid email address').required('*Required'),
                                            password: Yup.string().required('*Password is required').min(6),
                                            confirmPassword: Yup.string()
                                                .required('*Please retype your password.')
                                                .oneOf([Yup.ref('password'), null], '*Your passwords do not match.'),
                                        })}
                                        onSubmit={(values) => {
                                            console.log(values);

                                            navigate('/broker/dashboard/allbids', { replace: true });

                                            // send to api
                                        }}
                                    >
                                        {() => (
                                            <Form>
                                                <h1 style={{ marginBottom: '20px' }}>Add New Investor</h1>
                                                <ErrorMessage
                                                    style={{ color: '#D82C0D' }}
                                                    name='firstName'
                                                    component='div'
                                                />
                                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='text'
                                                        placeholder='First Name'
                                                        name='firstName'
                                                    />

                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='text'
                                                        placeholder='Last Name'
                                                        name='lastName'
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='email'
                                                        component='div'
                                                    />
                                                    <Field
                                                        type='email'
                                                        name='email'
                                                        placeholder='Email'
                                                        className='NewBid--form-input'
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <Field
                                                        type='text'
                                                        name='organisation'
                                                        placeholder='Organisation'
                                                        className='NewBid--form-input'
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='password'
                                                        component='div'
                                                    />
                                                    <Field
                                                        type='password'
                                                        name='password'
                                                        placeholder='Password'
                                                        className='NewBid--form-input'
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='confirmPassword'
                                                        component='div'
                                                    />
                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='password'
                                                        name='confirmPassword'
                                                        placeholder='Confirm Password'
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <button type='submit'>Submit</button>
                                                </Grid>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </Grid>
                    </div>
                </div>
            </OrderbookLayout>
        </>
    );
};

export default AddNewBid;
