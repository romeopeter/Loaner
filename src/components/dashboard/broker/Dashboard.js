import React, { useState, useMemo } from 'react';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync } from '../../../redux/authSlice';
import NavMenu from '../NavMenu';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import newOrder from '../../../assets/images/newOrder.png';
import newClient from '../../../assets/images/newClient.png';
import Pagination from './pagination/Pagination';

import Brokerdata from '../../../fake-backend/broker/DummyData';

import { Flex, Box, Button, Center, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
let PageSize = 5;
const BrokerDashboard = () => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return Brokerdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    // ----------------------

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.user);

    const { user: currentUser } = authUser;

    if (!currentUser) {
        return <Navigate replace to='login' />;
    }

    // eslint-disable-next-line no-unused-vars
    const handleSignOut = () => {
        dispatch(signOutAsync());
        navigate('/');
    };

    return (
        <div>
            <DocumentHead title='Dashboard' />
            <OrderbookLayout PageNav={NavMenu} className='broker'>
                <header id='orderbook-header' className='broker-orderbook-header'>
                    <Flex flexDirection={['column']} className='broker-header'>
                        <div id='loan-invest-dropdown' className=' bg-white px-16 py-10 shadow-md flex justify-start'>
                            <div id='loan' className='dropdown-container mr-5'>
                                <Link to='/broker/dashboard/allclients'>Clients </Link>
                                <i className='fa fa-caret-down' aria-hidden='true'></i>
                                <div id='load-dropdown'></div>
                            </div>
                            <div id='loan' className='dropdown-container mr-5'>
                                Loans <i className='fa fa-caret-down' aria-hidden='true'></i>
                                <div id='load-dropdown'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-x-6'>
                            <div className='broker-orderbook-intro'>
                                <h1 className='pt-2'>Hello, {currentUser.first_name}</h1>
                                <h2
                                    className='mb-4'
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: '700',
                                    }}
                                >
                                    Welcome to your dashboard
                                </h2>
                                <p className='font-md'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation.
                                </p>

                                <Button
                                    className='btn'
                                    bg={'#002276'}
                                    color={'#fff'}
                                    _hover={{ bg: '#002276' }}
                                    borderRadius={'0'}
                                    as={Link}
                                    to='/profile'
                                >
                                    Update my profile
                                </Button>
                            </div>
                            <div style={{ background: '#555' }}>
                                <div className='broker-mid'>
                                    <h2 className='ml-20 pl-10 quickAccess'>Quick access</h2>

                                    <div className='broker-mid2'>
                                        <Link to='/broker/dashboard/new-client' className='mr-16'>
                                            <Flex>
                                                <Center
                                                    w={['35px']}
                                                    h={['35px']}
                                                    borderRadius={'50%'}
                                                    bg={'#fff'}
                                                    className='mr-2'
                                                >
                                                    <img alt='' src={newClient} />
                                                </Center>
                                                <Text fontSize='md'>New Client</Text>
                                            </Flex>
                                        </Link>

                                        <Link to='/broker/dashboard/create-offer'>
                                            <Flex>
                                                <Center
                                                    w={['35px']}
                                                    h={['35px']}
                                                    borderRadius={'50%'}
                                                    bg={'#fff'}
                                                    className='mr-2'
                                                >
                                                    <img alt='' src={newOrder} />
                                                </Center>
                                                <Text fontSize='md'>New Order</Text>
                                            </Flex>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Flex>
                </header>
                <section style={{ backgroundColor: '#E5E5E5', paddingBottom: '10%' }}>
                    <Box>
                        <Text className='myOffers ml-6' px={['28']} py={['6']}>
                            My offers
                        </Text>
                        <div className='tableScroll'>
                            <Table size='sm' colorScheme={'blackAlpha'}>
                                <Thead>
                                    <Tr
                                        // key={index}
                                        fontWeight={'extrabold'}
                                        fontSize={['1.9em']}
                                    >
                                        <Th></Th>
                                        <Th></Th>
                                        <Th>Name</Th>
                                        <Th>Tranche </Th>
                                        <Th>Tenure</Th>
                                        <Th>Size</Th>
                                        <Th>Status</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody className='body'>
                                    {currentTableData.map((data, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td>
                                                    <Flex alignItems='center'>
                                                        <input className='broker-checkbox' type={'checkbox'} />
                                                        <Box
                                                            w='50px'
                                                            h='50px'
                                                            textAlign={'center'}
                                                            borderRadius={'50%'}
                                                            bg={'#555'}
                                                            mx={['4']}
                                                        ></Box>
                                                        {data.offerName}
                                                    </Flex>
                                                </Td>
                                                <Td>{data.tranche}</Td>
                                                <Td>{data.tenure}</Td>
                                                <Td>{data.size}</Td>
                                                <Td>
                                                    <Box
                                                        bg='#555'
                                                        color='#fff'
                                                        textAlign={'center'}
                                                        p={['2']}
                                                        borderRadius={'5px'}
                                                        w='100px'
                                                    >
                                                        {data.status}
                                                    </Box>
                                                </Td>
                                                <Td></Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                        <Pagination
                            className='pagination-bar'
                            currentPage={currentPage}
                            totalCount={Brokerdata.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </Box>

                    {/* scrollable table */}
                </section>
            </OrderbookLayout>
        </div>
    );
};

export default BrokerDashboard;
