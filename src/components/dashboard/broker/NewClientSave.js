import React, { useState } from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from 'react-router-dom';

import { Flex, Text, Heading, Button, ButtonGroup, Box } from '@chakra-ui/react';

const NewClientSave = () => {
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
                        <Heading as='h1' size='lg' mb='10' color={'#fff'}>
                            New Client
                        </Heading>
                        <Text color={'#fff'}>You have successfully created a new client . The details are below:</Text>
                        <Flex bg={'#fff'} p={[6]}>
                            <Box flex={1} p={[2]} borderRight={'1px solid #333'}>
                                <p style={{ fontSize: '14px' }}>Client type</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Client</p>
                            </Box>
                            <Box flex={1} p={[2]} borderRight={'1px solid #333'}>
                                <p style={{ fontSize: '14px' }}>Firstname</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Olamide</p>
                            </Box>
                            <Box flex={1} p={[2]} borderRight={'1px solid #333'}>
                                <p style={{ fontSize: '14px' }}>Lastname</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Attah</p>
                            </Box>
                            <Box flex={1} p={[2]} borderRight={'1px solid #333'}>
                                <p style={{ fontSize: '14px' }}>Company</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Rice value chain</p>
                            </Box>
                            <Box flex={1} p={[2]}>
                                <p style={{ fontSize: '14px' }}>Email address</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>rcv@gmail.com</p>
                            </Box>
                        </Flex>
                        <ButtonGroup mt={[10]} p={[10]}>
                            <Button
                                borderRadius={0}
                                as={Link}
                                to='/broker/dashboard/allclients'
                                float={'right'}
                                py={['6']}
                                px={[6, 10]}
                                bg={'#555'}
                                border={'1px solid #fff'}
                                color={'#fff'}
                                _hover={{ bg: '#fff', color: '#555' }}
                            >
                                View all clients
                            </Button>
                            <Button
                                borderRadius={0}
                                as={Link}
                                to='/broker/dashboard'
                                float={'right'}
                                py={['6']}
                                px={[6, 10]}
                                bg={'#008060'}
                                color={'#fff'}
                                _hover={{ bg: '#008060' }}
                            >
                                Go home
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default NewClientSave;
