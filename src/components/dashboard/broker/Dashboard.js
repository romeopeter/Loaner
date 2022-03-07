import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync } from '../../../redux/authSlice';
import NavMenu from '../NavMenu';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import newOrder from '../../../assets/images/newOrder.png';
import newClient from '../../../assets/images/newClient.png';
import Pagination from './pagination/Pagination';

// import Brokerdata from '../../../fake-backend/broker/DummyData';

import { Flex, Box, Button, Center, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
let PageSize = 10;
const BrokerDashboard = () => {
    const [loanRequest, setLoanRequest] = useState([]);
    useEffect(() => {
        axios
            .get('https://order-book-online.herokuapp.com/v1/loan_request/')
            .then((response) => setLoanRequest(response.data));
    }, []);

    // Dropdown
    const [isOpen, setOpen] = useState({ client: false, investor: false });
    const toggleDropdownClient = () =>
        isOpen.client ? setOpen({ ...isOpen, client: false }) : setOpen({ investor: false, client: true });
    const toggleDropdownInvestor = () =>
        isOpen.investor ? setOpen({ ...isOpen, investor: false }) : setOpen({ client: false, investor: true });

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return loanRequest.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, loanRequest]);
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
                        <div className=' bg-white px-16 py-10 shadow-md flex justify-start'>
                            <div className='dropdownbroker'>
                                <div className='dropdownbroker-header' onClick={toggleDropdownClient}>
                                    <h2 className='mr-2'>Clients</h2>
                                    <i className={`fa fa-caret-down ${isOpen.client && 'open'}`}></i>
                                </div>
                                <div className={`dropdownbroker-body ${isOpen.client && 'open'}`}>
                                    <Link to='/broker/dashboard/new-client' className='dropdownbroker-item '>
                                        New Client{' '}
                                    </Link>
                                    <Link to='/broker/dashboard/allclients' className='dropdownbroker-item '>
                                        Manage Clients{' '}
                                    </Link>
                                </div>
                            </div>
                            <div className='dropdownbroker'>
                                <div className='dropdownbroker-header' onClick={toggleDropdownInvestor}>
                                    <h2 className='mr-2'>Investors</h2>
                                    <i className={`fa fa-caret-down ${isOpen.investor && 'open'}`}></i>
                                </div>
                                <div className={`dropdownbroker-body ${isOpen.investor && 'open'}`}>
                                    <Link to='/broker/dashboard/uploadInvestor' className='dropdownbroker-item '>
                                        Upload Investors{' '}
                                    </Link>
                                </div>
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
                                                <Text fontSize='md'>New Offer</Text>
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
                                        <Th></Th>
                                        <Th>Name</Th>
                                        <Th>Tranche Status </Th>
                                        <Th>Tenure</Th>
                                        <Th>Size</Th>
                                        <Th>Status</Th>
                                        <Th>Action</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody className='body'>
                                    {currentTableData &&
                                        currentTableData.map((data, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Td></Td>
                                                    <Td></Td>
                                                    <Td textAlign={'center !important'}>
                                                        {' '}
                                                        <Box
                                                            w='50px'
                                                            h='50px'
                                                            borderRadius={'50%'}
                                                            bg={'#555'}
                                                            margin={'0px !important'}
                                                        ></Box>
                                                    </Td>
                                                    <Td textAlign={'center'}>
                                                        <Flex alignItems='center'>{data.deal_name}</Flex>
                                                    </Td>
                                                    <Td>{data.tranche_id.status}</Td>
                                                    <Td>
                                                        {data.tranche_id.timing.offer_start} -{' '}
                                                        {data.tranche_id.timing.offer_end}
                                                    </Td>
                                                    <Td>
                                                        {data.tranche_id.size.currency}
                                                        {data.tranche_id.size.par_value}
                                                    </Td>

                                                    {data.tranche_id.eligible_investors.length > 0 ? (
                                                        <Td style={{ color: '#008060' }}>Published</Td>
                                                    ) : (
                                                        <Td style={{ color: '#D82C0D' }}>Draft</Td>
                                                    )}
                                                    {data.tranche_id.eligible_investors.length > 0 ? (
                                                        <Td>
                                                            <Link
                                                                to={`/broker/dashboard/loan-offer-published/${data.id}`}
                                                            >
                                                                <button className='broker-cta'>View Offer</button>
                                                            </Link>
                                                        </Td>
                                                    ) : (
                                                        <Td>
                                                            <Link to={`/broker/dashboard/loan-offer-draft/${data.id}`}>
                                                                <button className='broker-cta'>View Draft</button>
                                                            </Link>
                                                        </Td>
                                                    )}
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
                            totalCount={loanRequest.length}
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
