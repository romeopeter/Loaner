import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-dropdown-select';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import Arrow from '../../../assets/images/Arrow.png';
import { Grid, GridItem } from '@chakra-ui/react';

const AddNewBid = () => {
    let navigate = useNavigate();

    const [active, setActive] = useState(false);

    // STATE FOR TOGGLE SHOW AND HIDE
    const handleState = () => {
        setActive(active ? false : true);
    };
    // TEMP OPTIONS FOR SELECT SEARCH DROPDOWN
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
                        <Link to='/broker/dashboard/bids/'>
                            <img alt='' src={Arrow} style={{ background: '#c4c4c4', padding: '12px' }} />
                        </Link>

                        <div style={{ padding: '20px' }}>
                            {/**Form 1 --- Select Investors */}
                            <Formik
                                initialValues={{
                                    bidValue: '',
                                    select: '',
                                }}
                                validationSchema={Yup.object({
                                    bidValue: Yup.string().required('*Required'),
                                })}
                                onSubmit={(values) => {
                                    navigate('/broker/dashboard/bids', { replace: true });
                                    // send to api
                                    console.log(values);
                                }}
                            >
                                {() => (
                                    <Form>
                                        {/**Toggle state to show/hide */}
                                        {!active && (
                                            <div>
                                                <h2>Add Bid Value</h2>
                                                {/**Bid Value */}
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='bidValue'
                                                        component='div'
                                                    />
                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='number'
                                                        name='bidValue'
                                                        placeholder='Bid Value'
                                                    />
                                                </Grid>

                                                {/**Select search dropdown */}
                                                <h2>Select Investor </h2>
                                                <Grid>
                                                    {' '}
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='select'
                                                        component='div'
                                                    />
                                                    <Select
                                                        name='select'
                                                        type='text'
                                                        valueField='id'
                                                        className='NewBid--form-input'
                                                        options={options}
                                                    />
                                                </Grid>
                                                <h2>
                                                    Or{' '}
                                                    <span
                                                        onClick={handleState}
                                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                    >
                                                        {' '}
                                                        Add New Investor
                                                    </span>
                                                </h2>
                                                <Grid>
                                                    <GridItem colEnd={6}>
                                                        <button onClick={() => {}} type='submit'>
                                                            Submit
                                                        </button>
                                                    </GridItem>
                                                </Grid>
                                            </div>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                            {/**Form 2 --- Add New Investors */}
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    organisation: '',
                                    confirmPassword: '',
                                    bidValue: '',
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
                                    organisation: Yup.string().required('*Required'),
                                    bidValue: Yup.string().required('*Required'),
                                })}
                                onSubmit={(values) => {
                                    navigate('/broker/dashboard/allbids', { replace: true });
                                    // send to api
                                    console.log(values);
                                }}
                            >
                                {() => (
                                    <Form>
                                        {/**Toggle state to show/hide */}
                                        {active && (
                                            <div>
                                                {/**Bid Value */}
                                                <h2>Add Bid Value</h2>
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='bidValue'
                                                        component='div'
                                                    />
                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='number'
                                                        name='bidValue'
                                                        placeholder='Bid Value'
                                                    />
                                                </Grid>
                                                <h2>Add New Investor</h2>
                                                {/*Error message for first and last name */}
                                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='firstName'
                                                        component='div'
                                                    />
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='lastName'
                                                        component='div'
                                                    />
                                                </Grid>
                                                {/*first and last name*/}
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
                                                {/*Email*/}
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
                                                {/*Organisation*/}
                                                <Grid>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='organisation'
                                                        component='div'
                                                    />
                                                    <Field
                                                        type='text'
                                                        name='organisation'
                                                        placeholder='Organisation'
                                                        className='NewBid--form-input'
                                                    />
                                                </Grid>
                                                {/*Error message for password and confirm password */}
                                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='password'
                                                        component='div'
                                                    />
                                                    <ErrorMessage
                                                        style={{ color: '#D82C0D' }}
                                                        name='confirmPassword'
                                                        component='div'
                                                    />
                                                </Grid>
                                                {/*Password and confirm password */}
                                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                                    <Field
                                                        type='password'
                                                        name='password'
                                                        placeholder='Password'
                                                        className='NewBid--form-input'
                                                    />
                                                    <Field
                                                        className='NewBid--form-input'
                                                        type='password'
                                                        name='confirmPassword'
                                                        placeholder='Confirm Password'
                                                    />
                                                </Grid>
                                                <h2>
                                                    Or{' '}
                                                    <span
                                                        onClick={handleState}
                                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                    >
                                                        {' '}
                                                        Select Investor
                                                    </span>
                                                </h2>
                                                {/*cta */}
                                                <Grid>
                                                    <GridItem colEnd={6}>
                                                        <button onClick={() => {}} type='submit'>
                                                            Submit
                                                        </button>
                                                    </GridItem>
                                                </Grid>
                                            </div>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </OrderbookLayout>
        </>
    );
};

export default AddNewBid;
