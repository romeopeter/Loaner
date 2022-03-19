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
import NavMenu from '../NavMenu';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

let PageSize = 10;

const Payment = () => {
    let { id } = useParams();
    const [paymentData, setPaymentData] = useState([]);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState({
        modal: false,
        paymentModal: false,
        successState: undefined,
    });
    const [notification, setNotification] = useState({
        confirmation: false,
        isLoading: undefined,
        status: false,
        statusText: undefined,
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
        return paymentData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, paymentData]);
    // ----------------------

    const handleYes = () => {
        setNotification({ ...notification, confirmation: true, isLoading: true, status: false });

        setTimeout(() => {
            setNotification({ ...notification, confirmation: true, isLoading: false, status: true });
        }, 2000);
    };

    // --------------------------------------make one general state

    const openPaymentModal = () => {
        setState({ ...state, paymentModal: true });
    };
    const closePaymentModal = () => {
        setState({ ...state, paymentModal: false });
    };

    const openModalApproved = () => {
        setState({ modal: true, successState: true, paymentModal: false });
        setNotification({ statusText: 'Approved' });
    };

    const openModalRejected = () => {
        setState({ modal: true, successState: false, paymentModal: false });
        setNotification({ statusText: 'Rejected' });
    };

    const closeModal = () => {
        setState({ ...state, modal: false });
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
                setCheckedBid(paymentData);
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
    paymentData.some((bid) => {
        return (disableApproved = bid.current_status === 'approved');
    });
    // checbox action end

    useEffect(() => {
        axios.get(`/v1/bids/?loan_request_id=${id}&status=approved`).then((res) => {
            setPaymentData(res.data);
        });
    }, [id, handleApply]);
    console.log(paymentData);

    return (
        <div>
            <DocumentHead title='New Client' />
            <OrderbookLayout PageNav={NavMenu}>
                <div id='loan-invest-dropdown' className='bg-white px-16 py-10 shadow-md flex justify-start'>
                    <div id='loan' className='dropdown-container mr-5'>
                        Clients <i className='fa fa-caret-down' aria-hidden='true'></i>
                        <div id='load-dropdown'></div>
                    </div>
                    <div id='loan' className='dropdown-container mr-5'>
                        Loans <i className='fa fa-caret-down' aria-hidden='true'></i>
                        <div id='load-dropdown'></div>
                    </div>
                </div>
                <main className='bids'>
                    <div className='bids-heading' style={{ height: '80px' }}>
                        <h1>Rice Value Chain </h1>
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
                                                    checked={checkedBid?.length === paymentData?.length}
                                                    onChange={(e) => handleCheck(e, paymentData)}
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
                                                            disabled={data.current_status === 'approved'}
                                                            // checked when checkedBid contains checked object/filed/row
                                                            checked={
                                                                data.current_status !== 'approved' &&
                                                                checkedBid.some((item) => item?.id === data.id)
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
                                                                {data.owner.first_name} {data.owner.last_name}
                                                            </Flex>
                                                        </Flex>
                                                    </Td>

                                                    <Td>{data.amount}</Td>
                                                    <Td cursor={'pointer'}>
                                                        {data.current_status.charAt(0).toUpperCase() +
                                                            data.current_status.slice(1)}
                                                    </Td>

                                                    {data.paymentStatus === 'Payment made' ? (
                                                        <Td color={'#008060'}>{data.paymentStatus}</Td>
                                                    ) : (
                                                        <Td>{data.paymentStatus}</Td>
                                                    )}

                                                    {data.paymentStatus === 'Payment made' ? (
                                                        <Td
                                                            style={{
                                                                textDecoration: 'underline',
                                                                cursor: 'pointer',
                                                                color: '#1C6CA6',
                                                            }}
                                                            onClick={openPaymentModal}
                                                        >
                                                            View Payment
                                                        </Td>
                                                    ) : (
                                                        <Td>-</Td>
                                                    )}

                                                    {notification.status ? (
                                                        <Td>{notification.statusText}</Td>
                                                    ) : (
                                                        <Td className='payment-cta'>
                                                            <button
                                                                onClick={openModalApproved}
                                                                className='payment-cta--approve'
                                                            >
                                                                Approve Payment
                                                            </button>

                                                            <button
                                                                onClick={openModalRejected}
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
                            </div>
                            <Pagination
                                className='pagination-bar'
                                currentPage={currentPage}
                                totalCount={paymentData.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Box>
                        <PaymentModal1
                            closeModal={closeModal}
                            state={state}
                            handleYes={handleYes}
                            notification={notification}
                        />
                        <PaymentModal2
                            state={state}
                            closePaymentModal={closePaymentModal}
                            notification={notification}
                            openModalApproved={openModalApproved}
                            openModalRejected={openModalRejected}
                        />
                    </section>
                </main>
            </OrderbookLayout>
        </div>
    );
};

export default Payment;
