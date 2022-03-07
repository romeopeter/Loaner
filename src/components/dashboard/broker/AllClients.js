import React, { useState } from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from 'react-router-dom';

import AllClientsData from '../../../fake-backend/broker/AllClients';

import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

const AllClients = () => {
    const onCheckboxChange = (checkboxes) => {
        // do something
    };
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
                            All Clients
                        </Heading>
                    </Flex>

                    <div px={['4.2%']} className='mid-nav'>
                        <div className='mid-nav--dropdown'>
                            <select>
                                <option defaultValue={'Select action'}> Select action</option>
                                <option value='approve all'>Approve all</option>
                                <option value='reject all'>Reject all</option>
                            </select>

                            <button className='mid-nav-button'>Apply</button>
                        </div>
                    </div>
                    <section style={{ paddingBottom: '10%' }}>
                        <Box>
                            <div className='tableScroll'>
                                <Table size='sm' colorScheme={'blackAlpha'}>
                                    <CheckboxGroup onChange={onCheckboxChange}>
                                        <Thead bg='#F0F0F0' h='80px'>
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

                                                <Th className='border'>Type</Th>
                                                <Th className='border'>Category</Th>
                                                <Th className='border'>Organization</Th>
                                                <Th className='border'></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {AllClientsData.map((data, index) => {
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
                                                                    bg={'#555555'}
                                                                    // m={['auto']}
                                                                    mr={[4]}
                                                                ></Box>
                                                                <Flex alignSelf={'center'}>{data.clientName}</Flex>
                                                            </Flex>
                                                        </Td>
                                                        <Td className='border'>{data.clientType}</Td>
                                                        <Td className='border'>{data.category}</Td>
                                                        <Td className='border'>{data.org}</Td>
                                                        <Td className='border' color={'#008060'} cursor={'pointer'}>
                                                            {data.details}
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
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
