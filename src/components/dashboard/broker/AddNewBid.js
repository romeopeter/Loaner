import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-dropdown-select';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import PostModal from '../broker/modals/PostModal';
import Arrow from '../../../assets/images/Arrow.png';
import { Grid, GridItem } from '@chakra-ui/react';

const AddNewBid = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [active, setActive] = useState(false);
    const [investors, setInvestors] = useState(null);
    const [select, setSelect] = useState(null);
    const [responsedata, setResponsedata] = useState({
        status: undefined,
        isLoading: undefined,
        error: undefined,
        modal: false,
        selectError: false,
    });

    // STATE FOR TOGGLE SHOW AND HIDE
    const handleState = () => {
        setActive(active ? false : true);
    };

    // OPTIONS FOR SELECT SEARCH DROPDOWN
    const options = [];

    investors &&
        investors.map((data) => {
            let values;
            values = { id: data.user.id, label: ` ${data.user.first_name} ${data.user.last_name}` };
            return options.push(values);
        });
    const closeModal = () => {
        setResponsedata({ ...responsedata, modal: false });

        setTimeout(() => {
            setResponsedata({ error: undefined });
        }, 1000);
    };
    useEffect(() => {
        let isMounted = true;
        axios
            .get(`/v1/loan_request/${id}/investors/`)
            .then((response) => {
                isMounted && setInvestors(response.data);
            })
            .catch((err) => err && setResponsedata({ ...responsedata, selectError: true }));

        window.scroll(0, 0);
        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = (values) => {
        setResponsedata({ ...responsedata, isLoading: true, modal: true });
        const bidObject = {
            amount: values.bidValue,
            owner: select[0].id,
            loan_request: id,
        };
        axios
            .post('v1/bids/', bidObject)
            .then((response) => {
                response.statusText === 'OK' &&
                    setResponsedata({ ...responsedata, modal: true, status: 'Bid Added Successfully!' });
            })
            .catch((err) => {
                if (err && err.message === 'Request failed with status code 400') {
                    setResponsedata({
                        ...responsedata,
                        modal: true,
                        error: 'You cannot create a new bid with this investor.',
                    });
                } else if (err && err.message === 'Network Error') {
                    setResponsedata({
                        ...responsedata,
                        modal: true,
                        error: 'Network Error',
                    });
                } else {
                    setResponsedata({
                        ...responsedata,
                        modal: true,
                        error: 'Something went wrong, Please try again.',
                    });
                }
            });
        values.bidValue = '';
    };

    return (
        <>
            <DocumentHead title='Add New Bid' />
            <OrderbookLayout PageNav={NavMenu}>
                <div className='NewBid'>
                    <div className='NewBid--form'>
                        <Link to={`/broker/dashboard/bids/${id}`}>
                            <img alt='' src={Arrow} className='backArrow' />
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
                                    handleSubmit(values);
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
                                                        loading={responsedata.selectError}
                                                        required={true}
                                                        className='NewBid--form-input'
                                                        options={options}
                                                        onChange={(values) => setSelect(values)}
                                                        style={{ paddingLeft: '15px' }}
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
                    <PostModal responsedata={responsedata} closeModal={closeModal} />
                </div>
            </OrderbookLayout>
        </>
    );
};

export default AddNewBid;
