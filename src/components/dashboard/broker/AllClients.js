import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import bidRejected from '../../../assets/images/bidRejected.png';

import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

let PageSize = 10;
const AllClients = () => {
    const [clients, setClients] = useState([]);
    const [getValue, setGetValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedBid, setCheckedBid] = useState([]);
    const [selectFilter, setSelectFilter] = useState({
        value: undefined,
        modal: false,
        isLoading: undefined,
    });

    useEffect(() => {
        axios
            .get('/v1/users/')
            .then((res) => {
                setClients(res.data.reverse());
                setGetValue(res.data);
            })
            .catch((err) => {
                console.log(err.message);
                if (err.message === 'Network Error') {
                    setErrorMessage(err.message);
                } else {
                    setErrorMessage('Something went wrong, please try  again.');
                }
            });
    });
    console.log(clients);
    // Dropdown
    const [isOpen, setOpen] = useState({ client: false, investor: false });
    const toggleDropdownClient = () =>
        isOpen.client ? setOpen({ ...isOpen, client: false }) : setOpen({ investor: false, client: true });
    const toggleDropdownInvestor = () =>
        isOpen.investor ? setOpen({ ...isOpen, investor: false }) : setOpen({ client: false, investor: true });

    // pagination
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return clients.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, clients]);

    const handleApply = useCallback(
        (e) => {
            e.preventDefault();
            if (selectFilter.value === undefined) {
                setSelectFilter({ modal: false });
            } else setSelectFilter({ ...selectFilter, modal: true, successState: true });
        },
        [selectFilter]
    );

    // Checkbox action start
    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        value === 'Select action' ? setSelectFilter({ value: undefined }) : setSelectFilter({ value });
    };

    const handleCheck = (e, data) => {
        const { name, checked } = e.target;

        if (checked) {
            if (name === 'allSelect') {
                setCheckedBid(clients);
            } else {
                setCheckedBid([...checkedBid, data]);
            }
        } else {
            if (name === 'allSelect') {
                setCheckedBid([]);
            } else {
                let temp = checkedBid.filter((item) => item.id !== data.id);
                setCheckedBid(temp);
            }
        }
    };
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
                    <section>
                        {!getValue ? (
                            <div style={{ margin: '100px 10px' }}>
                                {(() => {
                                    if (errorMessage) {
                                        return (
                                            <p className='responseMessage'>
                                                <img
                                                    alt=''
                                                    src={bidRejected}
                                                    style={{ height: '30px', width: '30px' }}
                                                />
                                                {errorMessage}
                                            </p>
                                        );
                                    } else if (getValue) {
                                        if (clients.length === 0 && getValue.statusText === 'OK') {
                                            return <p className='responseMessage'>There are no clients at this time</p>;
                                        }
                                    } else {
                                        return (
                                            <div className='loader-div'>
                                                <p className='loader'></p>
                                                <p>Loading...</p>
                                            </div>
                                        );
                                    }
                                })()}
                            </div>
                        ) : (
                            <Box style={{ paddingBottom: '10%' }}>
                                <div className='tableScroll'>
                                    <Table size='sm' colorScheme={'blackAlpha'}>
                                        <Thead bg='#F0F0F0' h='80px'>
                                            <Tr
                                                // key={index}
                                                fontWeight={'extrabold'}
                                                fontSize={['1.9em']}
                                            >
                                                <Th></Th>
                                                <Th borderRight={'1px  solid #c4c4c4'}>
                                                    <input
                                                        type='checkbox'
                                                        className={`broker-checkbox  `}
                                                        name='allSelect'
                                                        checked={checkedBid?.length === clients?.length}
                                                        onChange={(e) => handleCheck(e, clients)}
                                                    />
                                                </Th>
                                                <Th borderRight={'1px  solid #c4c4c4'}>Name</Th>
                                                <Th borderRight={'1px  solid #c4c4c4'}>Type</Th>
                                                <Th borderRight={'1px  solid #c4c4c4'}>Category</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody className='body'>
                                            {currentTableData.map((data, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td></Td>
                                                        <Td borderRight={'1px  solid #c4c4c4'}>
                                                            {' '}
                                                            <input
                                                                name={data.id}
                                                                type='checkbox'
                                                                className='broker-checkbox'
                                                                checked={checkedBid.some(
                                                                    (item) => item?.id === data.id
                                                                )}
                                                                onChange={(e) => handleCheck(e, data)}
                                                            />
                                                        </Td>
                                                        <Td
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                            borderRight={'1px  solid #c4c4c4'}
                                                        >
                                                            {' '}
                                                            <Box
                                                                w='50px'
                                                                h='50px'
                                                                borderRadius={'50%'}
                                                                bg={'#555'}
                                                                mr={'10px'}
                                                            ></Box>
                                                            {data.first_name} {data.last_name}
                                                        </Td>

                                                        <Td borderRight={'1px  solid #c4c4c4'}>
                                                            {data.groups[0].name}
                                                        </Td>
                                                        <Td borderRight={'1px  solid #c4c4c4'}>{data.organization}</Td>
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </Table>
                                </div>
                                <Pagination
                                    className='pagination-bar'
                                    currentPage={currentPage}
                                    totalCount={clients.length}
                                    pageSize={PageSize}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </Box>
                        )}
                    </section>
                </main>
            </OrderbookLayout>
        </>
    );
};

export default AllClients;
