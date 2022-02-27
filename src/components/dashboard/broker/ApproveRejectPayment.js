/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks

import React, { useState } from 'react';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import Modal from '../broker/modals/Modal';
import PaymentModal from '../broker/modals/PaymentModal';
import NavMenu from '../NavMenu';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import { Paymentdata } from '../../../data/broker/DummyData';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Divider } from '@chakra-ui/react';

const AllClients = () => {
    // modal state
    const [state, setState] = useState(false);
    // modal state
    const [paymentModal, setPaymentModal] = useState(false);

    // modal approved or rejected state
    const [successState, setSuccessState] = useState(false);

    const onCheckboxChange = (checkboxes) => {
        // do something
    };
    const openPaymentModal = () => {
        setPaymentModal(true);
    };
    const closePaymentModal = () => {
        setPaymentModal(false);
    };

    const openModalApproved = () => {
        setState(true);
        setSuccessState(true);
    };
    const openModalRejected = () => {
        setState(true);
        setSuccessState(false);
    };
    
    const closeModal = () => {
        setState(false);
    };

    return (
        <>
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
                    <div id='investor' className='dropdown-container'>
                        Investor <i className='fa fa-caret-down' aria-hidden='true'></i>
                        <div id='investor-dropdown'></div>
                    </div>
                </div>
                <main className='bids'>
                    <div className='bids-heading'>
                        <h1>Rice Value Chain Bid List</h1>
                        <div className='bids-heading--links'>
                            <Center className='bids-heading--mod'>
                                <a className='active' href='#'>
                                    Prorated
                                </a>
                                <Divider orientation='vertical' />
                                <a href='#'>Manual Listing</a>
                                <Divider orientation='vertical' />
                                <a href='#'>Ordered Listing</a>
                            </Center>
                        </div>
                    </div>
                    <div className='mid-nav'>
                        <div className='mid-nav--dropdown'>
                            <select>
                                <option defaultValue={'Select action'}> Select action</option>
                                <option value='approve all'>Approve all</option>
                                <option value='reject'>Reject all</option>
                            </select>

                            <button className='mid-nav-button'>Apply</button>
                        </div>

                        <select>
                            <option defaultValue={'Select action'}> Select action</option>
                            <option value='approve all'>Approve all</option>
                            <option value='reject'>Reject all</option>
                        </select>
                    </div>
                    <section style={{ paddingBottom: '10%' }}>
                        <Box>
                            <div className='tableScroll'>
                                <Table size='sm' colorScheme={'blackAlpha'}>
                                    <CheckboxGroup onChange={onCheckboxChange}>
                                        <Thead bg='#C4C4C4' h='80px'>
                                            <Tr
                                                // key={index}
                                                fontWeight={'extrabold'}
                                                fontSize={['1.9em']}
                                            >
                                                <Th></Th>
                                                <Th>
                                                    {' '}
                                                    <AllCheckerCheckbox className='broker-checkbox' />
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
                                            {Paymentdata.map((data, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td></Td>
                                                        <Td>
                                                            {' '}
                                                            <Checkbox className='broker-checkbox' />
                                                        </Td>
                                                        <Td>
                                                            <Flex>
                                                                <Box
                                                                    w='50px'
                                                                    h='50px'
                                                                    borderRadius={'50%'}
                                                                    bg={'#C4C4C4'}
                                                                    // m={['auto']}
                                                                    mr={[4]}
                                                                ></Box>
                                                                <Flex alignSelf={'center'}>{data.offerName}</Flex>
                                                            </Flex>
                                                        </Td>

                                                        <Td>{data.size}</Td>
                                                        <Td cursor={'pointer'}>{data.bidStatus}</Td>

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
                                                                View payment
                                                            </Td>
                                                        ) : (
                                                            <Td>-</Td>
                                                        )}

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
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </CheckboxGroup>
                                </Table>
                            </div>
                        </Box>
                        <Modal closeModal={closeModal} state={state} successState={successState} />
                        <PaymentModal closePaymentModal={closePaymentModal} paymentModal={paymentModal} />
                    </section>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default AllClients;
