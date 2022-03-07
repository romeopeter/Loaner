import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Text, Heading, Image, Button } from '@chakra-ui/react';

const LoanOfferDraft = () => {
    let { id } = useParams();
    console.log(id);
    return (
        <>
            <DocumentHead title='Loan Draft' />
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
                <main>
                    <Flex flexDirection={'column'} bg='#555' py={[10]} minH={['80vh', '70vh']}>
                        <Heading px={['4.7%']} as='h1' size='lg' color={'#fff'} mb={[6, 10]}>
                            Loan Requests
                        </Heading>
                        <Box w={['96%', '90%']} margin={'auto'} bg={'#fff'} minH={['70vh', '70vh']} mb={[6, 10]}>
                            <Flex flexDirection={['column', 'row']} p={[8]}>
                                <Box flex={1} mr={[0, 10]}>
                                    <Image
                                        w='100%'
                                        src='https://res.cloudinary.com/sophire/image/upload/v1643039524/orderbook/Downloader_9_djpbtv.png'
                                    />
                                    <Box my={[4]}>
                                        <Text as='u' fontWeight={'bold'}>
                                            Rice Value Chain (Project Finance)
                                        </Text>
                                    </Box>
                                    <p style={{ fontSize: '15px' }}>Payment schedule</p>
                                    <Flex my={[6]}>
                                        <Box
                                            bg='#C4C4C4'
                                            textAlign={'center'}
                                            px={[4]}
                                            py={[2]}
                                            fontWeight={'bold'}
                                            mr={[8]}
                                        >
                                            <p style={{ fontSize: '16px' }}>Sep 2021 - 9%</p>
                                        </Box>
                                        <Box bg='#C4C4C4' textAlign={'center'} px={[4]} py={[2]} fontWeight={'bold'}>
                                            <p style={{ fontSize: '16px' }}>Dec 2021 - 9%</p>
                                        </Box>
                                    </Flex>
                                    <Box
                                        bg='#C4C4C4'
                                        textAlign={'center'}
                                        px={[4]}
                                        py={[2]}
                                        fontWeight={'bold'}
                                        mb={[8]}
                                    >
                                        <p style={{ fontSize: '16px' }}>Mar 2022 - 9%</p>
                                    </Box>
                                    <Box bg='#C4C4C4' textAlign={'center'} px={[4]} py={[2]} fontWeight={'bold'}>
                                        <p style={{ fontSize: '17px' }}>Jun 2022 - 9% + 100% Capital</p>
                                    </Box>
                                    <Box mt={[8]}>
                                        <Flex justifyContent={'center'} alignItems={'center'} mb={[6]}>
                                            <p style={{ fontSize: '16px', opacity: 0.6 }}>Contact information </p>
                                            <Box h={['2px']} flex={1} bg={'#000'} ml={[6]}></Box>
                                        </Flex>
                                        <Flex fontSize={'13px'}>
                                            <Box mr={[2]} flex={1}>
                                                Address:
                                            </Box>
                                            <Box flex={2}>25 Lorem ipsum road, ipsum street, Lagos state</Box>
                                        </Flex>
                                        <Flex my={[8]} fontSize={'13px'}>
                                            <Box mr={[2]} flex={1}>
                                                Address:
                                            </Box>
                                            <Box flex={2}>25 Lorem ipsum road, ipsum street, Lagos state</Box>
                                        </Flex>
                                        <Flex fontSize={'13px'}>
                                            <Box mr={[2]} flex={1}>
                                                Address:
                                            </Box>
                                            <Box flex={2}>25 Lorem ipsum road, ipsum street, Lagos state</Box>
                                        </Flex>
                                    </Box>
                                </Box>
                                <Box flex={2}>
                                    <p style={{ fontSize: '15px' }}>
                                        Rice is the most consumed commodity. Total global rice expenditure in 2020 was
                                        $350 billion. To put in perspective, totoal global crude oil in 2020 was just
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
                                        consumed commodity. Total global rice expenditure in 2020 was $350 billion. To
                                        put in perspective, totoal global crude oil in 2020 was just four times that
                                        amount at $1.3 trillion. Rice is the most consumed commodity. Total global rice
                                        expenditure in 2020 was $350 billion. To put in perspective, totoal global crude
                                        oil in 2020 was just four times that amount at $1.3 trillion. Rice is the most
                                        consumed commodity. Total global rice expenditure in 2020 was $350 billion. To
                                        put in perspective, totoal global crude oil in 2020 was just four times that
                                        amount at $1.3 trillion. Rice is the most consumed commodity. Total global rice
                                        expenditure in 2020 was $350 billion. To put in perspective, totoal global crude
                                        oil in 2020 was just four times that amount at $1.3 trillion.
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
                                    <Flex flexDirection={['column', 'row']} my={[8]} pb={[6]}>
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
                                    <Flex
                                        flexDirection={['column', 'row']}
                                        justifyContent={'flex-end'}
                                        w={['70%']}
                                        float={['right']}
                                        marginTop={['100px']}
                                    >
                                        <Button
                                            flex={1}
                                            border={'1px solid #000'}
                                            bg={'#fff'}
                                            mt='10'
                                            px={['6']}
                                            color={'#000'}
                                            _hover={{ bg: '#fff' }}
                                            borderRadius={'0'}
                                        >
                                            Edit draft
                                        </Button>
                                        <Button
                                            flex={1}
                                            bg={'#C4C4C4'}
                                            mt='10'
                                            px={['6']}
                                            color={'#000'}
                                            _hover={{ bg: '#C4C4C4' }}
                                            borderRadius={'0'}
                                            mx={[0, 10]}
                                        >
                                            Save draft
                                        </Button>
                                        <Button
                                            flex={1}
                                            bg={'#008060'}
                                            mt='10'
                                            px={['6']}
                                            color={'#fff'}
                                            _hover={{ bg: '#008060' }}
                                            borderRadius={'0'}
                                            as={Link}
                                            to='/broker/dashboard/loan-offer/select-investor'
                                        >
                                            Next
                                        </Button>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default LoanOfferDraft;
