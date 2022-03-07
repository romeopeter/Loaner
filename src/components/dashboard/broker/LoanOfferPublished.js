import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Arrow from '../../../assets/images/Arrow.png';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
// import Button from '../../Button';
import NavMenu from '../NavMenu';
import offerImage from '../../../assets/images/offerImage.png';
import { AllBidsData } from '../../../data/broker/AllClients';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LoanOfferPublished = () => {
    const pageName = 'Loan Published';

    const [bidsData, setBidsData] = useState([]);

    //  Call Fetched data
    useEffect(() => {
        setBidsData(AllBidsData);
    }, []);
    const [isOpen, setOpen] = useState({ client: false, investor: false });
    const toggleDropdownClient = () =>
        isOpen.client ? setOpen({ ...isOpen, client: false }) : setOpen({ investor: false, client: true });
    const toggleDropdownInvestor = () =>
        isOpen.investor ? setOpen({ ...isOpen, investor: false }) : setOpen({ client: false, investor: true });

    return (
        <div>
            <DocumentHead title={pageName} />
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
                <section id='orderbook-show-bids' style={{ padding: '60px' }}>
                    <div id='offer'>
                        <h3 id='header' style={{ marginBottom: '0px' }}>
                            Rice Value Chain
                        </h3>
                        <div id='the-offer'>
                            <div className='mb-8'>
                                <Link to='/broker/dashboard/'>
                                    <img alt='' src={Arrow} style={{ background: '#c4c4c4', padding: '12px' }} />
                                </Link>
                            </div>
                            <div className='grid grid-cols-12 '>
                                <div id='offer-header' className='col-span-12 lg:col-span-4'>
                                    <img src={offerImage} alt='' className='w-full' />
                                    <h3>Rice Value Chain ( Project Finance )</h3>
                                    <div id='schedule-payment' className='hidden md:block'>
                                        <p>Payment Schedule</p>
                                        <div className='grid grid-cols-12 gap-4' style={{ fontSize: '13px' }}>
                                            <div className='col-span-6'>Sep 2022 - 9%</div>
                                            <div className='col-span-6'>Dec 2022 - 9%</div>
                                            <div className='col-span-12'>Mar 2022 - 9%</div>
                                            <div className='col-span-12'>Jun 2022 - 9% + 100% Capital</div>
                                        </div>
                                        <div id='address'>
                                            <span>Contact information:</span> <hr />
                                            <address>
                                                <p>
                                                    <span>Address:</span> 25 lorem ipsum road, Ipsum street, Lagos State
                                                </p>
                                                <p>
                                                    <span>Phone:</span> +234 706 192 4567
                                                </p>
                                                <p>
                                                    <span>Email:</span> lorem@loremipsum.com
                                                </p>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-5  col-span-12 lg:col-span-8'>
                                    <p style={{ fontWeight: '700', fontSize: '18px' }} className=' sm:mt-5'>
                                        Description
                                    </p>
                                    <p style={{ textAlign: 'justify', height: '250px !important', fontSize: '15px' }}>
                                        Rice is the most consumed commodity. Total global rice expenditure in 2020 was
                                        $350 billion. To put in perspective, total global crude oil in 2020 was just
                                        four times that amount at $1.3 trillion. Rice is the most consumed commodity.
                                        Total global rice expenditure in 2020 was $350 billion. To put in perspective,
                                        totoal global crude oil in 2020 was just four times that amount at $1.3
                                        trillion. Rice is the most consumed commodity. Total global rice expenditure in
                                        2020 was $350 billion. To put in perspective, totoal global crude oil in 2020
                                        was just four times that amount at $1.3 trillion. Rice is the most consumed
                                        commodity. Total global rice expenditure in 2020 was $350 billion. To put in
                                        perspective, totoal global crude oil in 2020 was just four times that amount at
                                        $1.3 trillion. Rice is the most consumed commodity. Total global rice
                                        expenditure in 2020 was $350 billion. To put in perspective, totoal global crude
                                        oil in 2020 was just four times that amount at $1.3 trillion. Rice is the most
                                        consumed commodity. Total global rice expenditure in 2020 was $350 billion.
                                    </p>

                                    <Flex
                                        flexDirection={['column', 'row']}
                                        my={[8]}
                                        py={[6]}
                                        borderTop={['1px  solid black']}
                                        borderBottom={['1px  solid black']}
                                    >
                                        <Box>
                                            <p style={{ fontSize: '15px' }}>Name</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Olamide Attah</p>
                                        </Box>
                                        <Box mx={[0, 10]} my={[10, 0]}>
                                            <p style={{ fontSize: '15px' }}>Type of offer</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Commercial paper</p>
                                        </Box>
                                        <Box>
                                            <p style={{ fontSize: '15px' }}>Loan amount</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>NGN 5 billion</p>
                                        </Box>
                                        <Box mx={[0, 10]} my={[10, 0]}>
                                            <p style={{ fontSize: '15px' }}>Tranche</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Tranche 1</p>
                                        </Box>
                                        <Box>
                                            <p style={{ fontSize: '15px' }}>Tenure</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>180 Days</p>
                                        </Box>
                                    </Flex>
                                    <Flex flexDirection={['column', 'row']} className='lg:mb-5'>
                                        <Box>
                                            <p style={{ fontSize: '15px' }}>Size</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>NGN 5 billion</p>
                                        </Box>
                                        <Box mx={[0, 10]} my={[10, 0]}>
                                            <p style={{ fontSize: '15px' }}>Offer opens</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>15/1/2022</p>
                                        </Box>
                                        <Box>
                                            <p style={{ fontSize: '15px' }}>Offer closes</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>25/1/2022</p>
                                        </Box>
                                        <Box mx={[0, 10]} my={[10, 0]}>
                                            <p style={{ fontSize: '15px' }}>Settlement date</p>
                                            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>10/02/2022</p>
                                        </Box>
                                    </Flex>
                                    <Link to='/broker/dashboard/bids/'>
                                        <button
                                            className='my-5'
                                            style={{
                                                padding: '7px',
                                                border: '1px solid #555',
                                                float: 'right',
                                            }}
                                        >
                                            View List of All Bids
                                        </button>
                                    </Link>
                                    <div style={{ clear: 'both' }}></div>
                                    <section className='mb-5'>
                                        <Box className='p-2' style={{ border: '1px solid #c4c4c4' }}>
                                            <div
                                                className='tableScroll'
                                                style={{
                                                    paddingBottom: '10%',
                                                    height: '400px',
                                                    overflowY: 'scroll',
                                                }}
                                            >
                                                {bidsData.length < 1 && <p>There are currently no bids available</p>}
                                                <Table size='sm' colorScheme={'blackAlpha'}>
                                                    <Thead bg='#F0F0F0' h='80px'>
                                                        <Tr
                                                            // key={index}
                                                            fontWeight={'extrabold'}
                                                            fontSize={['1.9em']}
                                                        >
                                                            <Th className='border'>Name </Th>

                                                            <Th className='border'>Tranche</Th>
                                                            <Th className='border'>Duration</Th>
                                                            <Th className='border'>Amount</Th>
                                                            <Th className='border'>Status</Th>
                                                        </Tr>
                                                    </Thead>

                                                    <Tbody>
                                                        {bidsData.map((data, index) => {
                                                            return (
                                                                <Tr key={data.id}>
                                                                    <Td className='border'>
                                                                        <Flex>
                                                                            <Box
                                                                                w='50px'
                                                                                h='50px'
                                                                                borderRadius={'50%'}
                                                                                bg={'#555555'}
                                                                                // m={['auto']}
                                                                                mr={[4]}
                                                                            ></Box>
                                                                            <Flex alignSelf={'center'}>
                                                                                {data.clientName}
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Td>
                                                                    <Td className='border'>{data.tranche}</Td>
                                                                    <Td className='border'>{data.duration}</Td>
                                                                    <Td className='border'>{data.amount}</Td>

                                                                    {(() => {
                                                                        if (
                                                                            data &&
                                                                            data.status &&
                                                                            !data.statusUpdated
                                                                        ) {
                                                                            return (
                                                                                <Td className='border'>
                                                                                    {data.status}
                                                                                </Td>
                                                                            );
                                                                        }

                                                                        if (data.statusUpdated) {
                                                                            return (
                                                                                <Td className='border'>
                                                                                    {data.statusUpdated}
                                                                                </Td>
                                                                            );
                                                                        } else {
                                                                            return <Td className='border'>-</Td>;
                                                                        }
                                                                    })()}
                                                                </Tr>
                                                            );
                                                        })}
                                                    </Tbody>
                                                </Table>
                                            </div>
                                        </Box>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </OrderbookLayout>
        </div>
    );
};

export default LoanOfferPublished;
