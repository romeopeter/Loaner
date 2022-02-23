/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks

import React from 'react';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from 'react-router-dom';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

import { AllBidsData } from '../../../data/broker/AllClients';

import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Divider } from '@chakra-ui/react';

const AllClients = () => {
    const onCheckboxChange = (checkboxes) => {
        // do something
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
                        <Link to='/broker/dashboard/allbids/addnewbid'>
                            <button className='mid-nav--addNewBid'>Add New Bid</button>
                        </Link>
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
                                                <Th className='border'>Name </Th>

                                                <Th className='border'>Tranche</Th>
                                                <Th className='border'>Duration</Th>
                                                <Th className='border'>Amount</Th>
                                                <Th className='border'>Status</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {AllBidsData.map((data, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td></Td>
                                                        <Td>
                                                            {' '}
                                                            <Checkbox className='broker-checkbox' />
                                                        </Td>
                                                        <Td className='border'>
                                                            <Flex>
                                                                <Box
                                                                    w='50px'
                                                                    h='50px'
                                                                    borderRadius={'50%'}
                                                                    bg={'#C4C4C4'}
                                                                    // m={['auto']}
                                                                    mr={[4]}
                                                                ></Box>
                                                                <Flex alignSelf={'center'}>{data.clientName}</Flex>
                                                            </Flex>
                                                        </Td>
                                                        <Td className='border'>{data.tranche}</Td>
                                                        <Td className='border'>{data.duration}</Td>
                                                        <Td className='border'>{data.amount}</Td>
                                                        <Td className='border' color={'#008060'} cursor={'pointer'}>
                                                            {data.status}
                                                        </Td>
                                                        <Td className='cta-buttons'>
                                                            <button className='cta-buttons--approve'>Approve</button>
                                                            <button className='cta-buttons--reject'>Reject</button>

                                                            <button className='cta-buttons--edit'>Edit</button>
                                                            <button className='cta-buttons--disagree'>Disagree</button>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                            <Tr>
                                                <Td></Td>
                                                <Td>
                                                    {' '}
                                                    <Checkbox className='broker-checkbox' />
                                                </Td>
                                                <Td className='border'>
                                                    <Flex>
                                                        <Box
                                                            w='50px'
                                                            h='50px'
                                                            borderRadius={'50%'}
                                                            bg={'#C4C4C4'}
                                                            // m={['auto']}
                                                            mr={[4]}
                                                        ></Box>
                                                        <Flex alignSelf={'center'}>Name</Flex>
                                                    </Flex>
                                                </Td>
                                                <Td className='border'>Tranche</Td>
                                                <Td className='border'>20days</Td>
                                                <Td className='border'>NGN 1,000,000 </Td>
                                                <Td className='border' color={'#d82c0d'} cursor={'pointer'}>
                                                    Rejected
                                                </Td>
                                                <Td className='cta-buttons'>
                                                    <button className='cta-buttons--edit'>Edit</button>
                                                    <button className='cta-buttons--disapprove'>Disagree</button>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </CheckboxGroup>
                                </Table>
                            </div>
                        </Box>

                        {/* scrollable table */}
                    </section>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default AllClients;
