import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import offerImage from '../../../assets/images/offerImage.png';
import bidRejected from '../../../assets/images/bidRejected.png';

import { Flex, Box, Table, Tbody, Tr, Td, Heading, Image, Center } from '@chakra-ui/react';

let PageSize = 10;
const AllLoans = () => {
    const [loanRequest, setLoanRequest] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return loanRequest.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, loanRequest]);
    // ----------------------

    // Used for conditional rendering
    const [getValue, setGetValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        axios
            .get('/v1/loan_request/')
            .then((response) => {
                console.log(response.data);
                setLoanRequest(response.data.reverse());
                setGetValue(response);
            })
            .catch((err) => setErrorMessage(err));

        window.scroll(0, 0);
    }, []);
    // Dropdown
    const [isOpen, setOpen] = useState({ client: false, investor: false });
    const toggleDropdownClient = () =>
        isOpen.client ? setOpen({ ...isOpen, client: false }) : setOpen({ investor: false, client: true });
    const toggleDropdownInvestor = () =>
        isOpen.investor ? setOpen({ ...isOpen, investor: false }) : setOpen({ client: false, investor: true });

    return (
        <>
            <DocumentHead title='New Client' />
            <OrderbookLayout PageNav={NavMenu}>
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
                <main>
                    <Flex flexDirection={'column'} bg='#555' px={['4.2%']} py={[10]}>
                        <Heading as='h1' size='lg' color={'#fff'}>
                            All Offers
                        </Heading>
                    </Flex>
                    <section style={{ paddingBottom: '10%', marginTop: '3%' }}>
                        {!getValue ? (
                            <div style={{ margin: '120px 20px' }}>
                                {(() => {
                                    if (errorMessage) {
                                        return (
                                            <div>
                                                <p
                                                    className='responseMessage'
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <img
                                                        alt=''
                                                        src={bidRejected}
                                                        style={{ height: '30px', width: '30px' }}
                                                    />
                                                    Something went wrong, please try again.{' '}
                                                </p>
                                            </div>
                                        );
                                    } else if (getValue) {
                                        if (loanRequest.length === 0 && getValue.statusText === 'OK') {
                                            return (
                                                <p className='responseMessage'>
                                                    There are no loan requests at this time
                                                </p>
                                            );
                                        }
                                    } else {
                                        return (
                                            <div className='loader-div'>
                                                <p className='loader'></p>
                                                <p>Fetching Offers</p>
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        ) : (
                            <Box>
                                <div style={{ overflowX: 'scroll' }}>
                                    <Table size='sm' display={['table']} colorScheme={'blackAlpha'}>
                                        <Tbody>
                                            {currentTableData.map((data, index) => {
                                                return (
                                                    <Tr key={index} borderBottom={'1px solid black'}>
                                                        <Td></Td>
                                                        <Td w={'50px'}>
                                                            <Flex>
                                                                <Box w='60px' h='60px' borderRadius={'50%'} bg={'#333'}>
                                                                    <Image
                                                                        w='60px'
                                                                        h='60px'
                                                                        borderRadius={'50%'}
                                                                        src={offerImage}
                                                                    />
                                                                </Box>
                                                            </Flex>
                                                        </Td>
                                                        <Td
                                                            borderRight={'1px  solid #c4c4c4'}
                                                            style={{ minWidth: '250px' }}
                                                        >
                                                            {' '}
                                                            <Box style={{ fontWeight: 'bold' }}>
                                                                <u>{data.deal_name} </u>
                                                                <u> ({data.deal_type})</u>
                                                            </Box>
                                                        </Td>

                                                        <Td
                                                            borderRight={'1px  solid #c4c4c4'}
                                                            style={{ minWidth: '500px', lineHeight: '2' }}
                                                        >
                                                            Deal owner - {data.deal_owner} <br /> Lorem ipsum dolor sit
                                                            amet consectetur adipisicing elit. Maxime mollitia,
                                                            molestiae quas vel sint commodi repudiandae consequuntur
                                                            voluptatum laborum numquam blanditiis harum quisquam eius
                                                            sed odit fugiat iusto.
                                                        </Td>

                                                        {data.tranche_id.eligible_investors.length > 0 ? (
                                                            <Td color={'#008060'} style={{ minWidth: '250px' }}>
                                                                <Center>
                                                                    <Link
                                                                        to={`/broker/dashboard/loan-offer-published/${data.id}`}
                                                                    >
                                                                        <button>View Details</button>
                                                                    </Link>
                                                                </Center>
                                                            </Td>
                                                        ) : (
                                                            <Td color={'#008060'} style={{ minWidth: '250px' }}>
                                                                <Center>
                                                                    <Link
                                                                        to={`/broker/dashboard/loan-offer-draft/${data.id}`}
                                                                    >
                                                                        <button>View Details</button>
                                                                    </Link>
                                                                </Center>
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
                        )}

                        {/* scrollable table */}
                    </section>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default AllLoans;
