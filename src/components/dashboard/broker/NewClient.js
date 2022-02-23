import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from 'react-router-dom';

import { Flex, Box, FormControl, FormLabel, Input, Select, Heading, Button } from '@chakra-ui/react';

const NewClient = () => {
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
                <main>
                    <Flex flexDirection={'column'} bg='#555' px={['4.2%']} py={[10]}>
                        <Heading as='h1' size='lg' mb='10' color={'#fff'}>
                            New Client
                        </Heading>
                        <FormControl>
                            <Flex flexDirection={['column', 'row']}>
                                <Box flex={'1'}>
                                    <FormLabel htmlFor='select' />
                                    <Select
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='Select category'
                                    >
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </Box>
                                <Box flex={'1'} mx={['0', '10']}>
                                    <FormLabel htmlFor='first name' />
                                    <Input
                                        type={'text'}
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='First name'
                                    />
                                </Box>
                                <Box flex={'1'}>
                                    <FormLabel htmlFor='select' />
                                    <Input
                                        type={'text'}
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='Last name'
                                    />
                                </Box>
                            </Flex>
                            <Flex flexDirection={['column', 'row']} my={[10]}>
                                <Box flex={'1'}>
                                    <FormLabel htmlFor='select' />
                                    <Input
                                        type={'text'}
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='Company'
                                    />
                                </Box>
                                <Box flex={'1'} mx={['0', '10']}>
                                    <FormLabel htmlFor='select' />
                                    <Input
                                        type='email'
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='Email address'
                                    />
                                </Box>
                                <Box flex={'1'}>
                                    <FormLabel htmlFor='select' />
                                    <Input
                                        type={'password'}
                                        bgColor={'#C4C4C4'}
                                        borderRadius={'0'}
                                        border={'none'}
                                        placeholder='Password'
                                    />
                                </Box>
                            </Flex>
                            {/* <Flex flexDirection={["column", "row"]} >
                            <Box flex={"1"} >
                                <FormLabel htmlFor='select'/>
                                <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Select type of offer'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </Box>
                            <Box flex={"1"} mx={["0","10"]}>
                                <FormLabel htmlFor='select'/>
                                <Select   bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"}  placeholder='Select type of offer'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </Box>
                            <Box flex={"1"} >
                                <FormLabel htmlFor='select'/>
                                <Select  textAlign={"center"} bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"}  placeholder='Select type of offer'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </Box>
                        </Flex> */}
                        </FormControl>
                    </Flex>
                    <Box minH={['15vh']} mt={[10]} p={[10]}>
                        <Button
                            as={Link}
                            to='/broker/dashboard/new-client-save'
                            float={'right'}
                            py={['6']}
                            px={[6, 10]}
                            bg={'#008060'}
                            color={'#fff'}
                            _hover={{ bg: '#008060' }}
                        >
                            Create Client
                        </Button>
                    </Box>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default NewClient;
