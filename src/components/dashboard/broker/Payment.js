/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import PaymentModal1 from './modals/PaymentModal1';
import PaymentModal2 from './modals/PaymentModal2';
import bidRejected from '../../../assets/images/bidRejected.png';
import NavMenu from '../NavMenu';
import SubNavBar from './layouts/SubNavBar';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

let PageSize = 10;

const Payment = () => {

    let { id } = useParams();

    const [paymentData, setPaymentData] = useState([]);
    const [approvedBidsData, setApprovedBidsData] = useState([]);
    const [dataState, setDataState] = useState({ isLoading: true, error: undefined });
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState({
        modal: false,
        paymentModal: false,
        successState: undefined,
        data: undefined,
    });
    const [notification, setNotification] = useState({
        isLoading: undefined,
        dataApproved: undefined,
        dataRejected: undefined,
    });
    const [selectFilter, setSelectFilter] = useState({
        value: undefined,
        modal: false,
        isLoading: undefined,
    });
    // Checkbox
    const [checkedBid, setCheckedBid] = useState([]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return approvedBidsData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, approvedBidsData]);
    // ----------------------

    // --------------------------------------make one general state

    const openPaymentModal = (data) => {
        setState({ ...state, paymentModal: true, data: data });
    };
    const closePaymentModal = () => {
        setState({ ...state, paymentModal: false });
    };

    const openModalApproved = (data) => {
        setState({ modal: true, successState: true, paymentModal: false });
        setNotification({ dataApproved: data });
        console.log(data);
    };

    const openModalRejected = (data) => {
        setState({ modal: true, successState: false, paymentModal: false });
        setNotification({ dataRejected: data });
    };

    const closeModal = () => {
        setState({ ...state, modal: false });
        setTimeout(() => {
            setNotification({ ...notification, isLoading: undefined });
        }, 1000);
    };

    const handleApply = useCallback(
        (e) => {
            e.preventDefault();
            if (selectFilter.value === undefined) {
                setSelectFilter({ modal: false });
            } else setSelectFilter({ ...selectFilter, modal: true, successState: true });
        },
        [selectFilter]
    );

    // Checkbox action start
    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        value === 'Select action' ? setSelectFilter({ value: undefined }) : setSelectFilter({ value });
    };

    const handleCheck = (e, data) => {
        const { name, checked } = e.target;

        if (checked) {
            if (name === 'allSelect') {
                setCheckedBid(approvedBidsData);
            } else {
                setCheckedBid([...checkedBid, data]);
            }
        } else {
            if (name === 'allSelect') {
                setCheckedBid([]);
            } else {
                let temp = checkedBid.filter((item) => item.id !== data.id);
                setCheckedBid(temp);
            }
        }
    };

    const className = checkedBid.length < 2 ? 'disable' : '';

    let disableApproved;
    approvedBidsData.some((bid) => {
        return (disableApproved = bid.payment_status === 'approved');
    });
    // checbox action end

    // Handle status update approved
    const updatedataApproved = useCallback(() => {
        let data = notification.dataApproved;
        setNotification({
            ...notification,
            isLoading: true,
        });
        const detail = {
            amount: data.amount,
            bid: data.id,
            status: 'approved',
        };
        data &&
            axios
                .patch(`v1/payments/${data.id}/`, detail)
                .then((res) => {
                    res.data.current_status &&
                        setNotification({
                            ...notification,
                            isLoading: false,
                        });
                })
                .catch((err) => err && setNotification({ ...notification, isLoading: true }));
    }, [notification]);

    useEffect(() => {
        axios
            .get(`/v1/bids/?loan_request_id=${id}&status=approved`)
            .then((res) => {
                setApprovedBidsData(res.data);
                res.statusText === 'OK' && setDataState({ error: '', isLoading: false });
            })
            .catch((e) => setDataState({ error: 'Something Went Wrong', isLoading: false }));

        // payment request
        axios.get('/v1/payments/').then((res) => {
            setPaymentData(res.data);
        });
    }, [id, handleApply]);
    console.log(approvedBidsData);
    console.log(paymentData);

   

    return (
        <div>
            <DocumentHead title='Payments' />
            <OrderbookLayout PageNav={NavMenu}>
                {/* Sub-navbar */}
                <SubNavBar />
                
                <main className='bids'>
                    <div className='bids-heading'>
                        <h1 style={{ padding: '30px' }}>
                            {' '}
                            {approvedBidsData.length > 0 && approvedBidsData[0].loan_request.tranche_name}
                        </h1>
                    </div>
                    <div className='mid-nav'>
                        <div className={`${className} mid-nav--dropdown`}>
                            <select onChange={handleChange}>
                                <option defaultValue={'Select action'}> Select action</option>
                                <option value='approve all'>Approve all</option>
                                <option value='reject'>Reject all</option>
                            </select>

                            <button onClick={handleApply} className='mid-nav-button'>
                                Apply
                            </button>
                        </div>

                        <select className='mid-nav--filter'>
                            <option defaultValue={'Select action'}>Filter</option>
                            <option value='approve all'>Payment made</option>
                            <option value='reject'>Pending payments</option>
                            <option value='reject'>Approved payments</option>
                            <option value='reject'>Rejected payments</option>
                        </select>
                    </div>
                    <section style={{ paddingBottom: '10%' }}>
                        <Box>
                            <div className='tableScroll'>
                                {(() => {
                                    if (dataState.isLoading) {
                                        return <p className='loader' style={{ margin: '100px auto' }}></p>;
                                    } else if (dataState.error) {
                                        return (
                                            <p
                                                className='responseMessage'
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                    margin: '100px auto',
                                                }}
                                            >
                                                <img
                                                    alt=''
                                                    src={bidRejected}
                                                    style={{ height: '30px', width: '30px' }}
                                                />
                                                Something went wrong, please try again.{' '}
                                            </p>
                                        );
                                    } else {
                                        return (
                                            <Table size='sm' colorScheme={'blackAlpha'}>
                                                <Thead bg='#F0F0F0' h='80px'>
                                                    <Tr
                                                        // key={index}
                                                        fontWeight={'extrabold'}
                                                        fontSize={['1.9em']}
                                                    >
                                                        <Th></Th>
                                                        <Th>
                                                            <input
                                                                type='checkbox'
                                                                className={`broker-checkbox`}
                                                                name='allSelect'
                                                                disabled={disableApproved}
                                                                checked={
                                                                    checkedBid?.length === approvedBidsData?.length
                                                                }
                                                                onChange={(e) => handleCheck(e, approvedBidsData)}
                                                            />
                                                        </Th>
                                                        <Th>Name </Th>
                                                        <Th>Amount</Th>
                                                        <Th>Bid Status</Th>
                                                        <Th>Payment Status</Th>
                                                        <Th>Payment Proof</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {currentTableData.map((data, index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                <Td></Td>
                                                                <Td>
                                                                    {' '}
                                                                    <input
                                                                        name={data.id}
                                                                        type='checkbox'
                                                                        className='broker-checkbox'
                                                                        disabled={data.payment_status === 'approved'}
                                                                        // checked when checkedBid contains checked object/filed/row
                                                                        checked={
                                                                            data.payment_status !== 'approved' &&
                                                                            checkedBid.some(
                                                                                (item) => item?.id === data.id
                                                                            )
                                                                        }
                                                                        onChange={(e) => handleCheck(e, data)}
                                                                    />
                                                                </Td>
                                                                <Td>
                                                                    <Flex>
                                                                        <Box
                                                                            w='40px'
                                                                            h='40px'
                                                                            borderRadius={'50%'}
                                                                            bg={'#555555'}
                                                                            // m={['auto']}
                                                                            mr={[4]}
                                                                        ></Box>
                                                                        <Flex alignSelf={'center'}>
                                                                            {data.owner.first_name}{' '}
                                                                            {data.owner.last_name}
                                                                        </Flex>
                                                                    </Flex>
                                                                </Td>

                                                                <Td>{data.amount}</Td>
                                                                <Td cursor={'pointer'}>
                                                                    {data.current_status.charAt(0).toUpperCase() +
                                                                        data.current_status.slice(1)}
                                                                </Td>

                                                                {(() => {
                                                                    if (data.payment_status) {
                                                                        return (
                                                                            <Td color={'#008060'}>
                                                                                {data.payment_status
                                                                                    .charAt(0)
                                                                                    .toUpperCase() +
                                                                                    data.current_status.slice(1)}
                                                                            </Td>
                                                                        );
                                                                    } else {
                                                                        return <Td color={'#eed202'}>Pending</Td>;
                                                                    }
                                                                })()}

                                                                {data.payment_status ? (
                                                                    <Td
                                                                        style={{
                                                                            textDecoration: 'underline',
                                                                            cursor: 'pointer',
                                                                            color: '#1C6CA6',
                                                                        }}
                                                                        onClick={() => openPaymentModal(data)}
                                                                    >
                                                                        View Payment
                                                                    </Td>
                                                                ) : (
                                                                    <Td>-</Td>
                                                                )}

                                                                {data.payment_status ? (
                                                                    <Td>
                                                                        <button
                                                                            disabled={true}
                                                                            className='payment-cta--approve'
                                                                        >
                                                                            Approve Payment
                                                                        </button>

                                                                        <button
                                                                            disabled={true}
                                                                            className='payment-cta--reject'
                                                                        >
                                                                            Reject Payment
                                                                        </button>
                                                                    </Td>
                                                                ) : (
                                                                    <Td className='payment-cta'>
                                                                        <button
                                                                            onClick={() => openModalApproved(data)}
                                                                            className='payment-cta--approve'
                                                                        >
                                                                            Approve Payment
                                                                        </button>

                                                                        <button
                                                                            onClick={() => {
                                                                                openModalRejected(data);
                                                                            }}
                                                                            className='payment-cta--reject'
                                                                        >
                                                                            Reject Payment
                                                                        </button>
                                                                    </Td>
                                                                )}
                                                            </Tr>
                                                        );
                                                    })}
                                                </Tbody>
                                            </Table>
                                        );
                                    }
                                })()}
                            </div>
                            <Pagination
                                className='pagination-bar'
                                currentPage={currentPage}
                                totalCount={approvedBidsData.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Box>
                        <PaymentModal1
                            closeModal={closeModal}
                            state={state}
                            notification={notification}
                            updatedataApproved={updatedataApproved}
                        />
                        <PaymentModal2
                            state={state}
                            closePaymentModal={closePaymentModal}
                            notification={notification}
                            openModalApproved={openModalApproved}
                            openModalRejected={openModalRejected}
                            paymentData={paymentData}
                        />
                    </section>
                </main>
            </OrderbookLayout>
        </div>
    );
};

export default Payment;
