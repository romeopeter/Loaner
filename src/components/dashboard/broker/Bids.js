/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks

import React, { useState, useMemo } from 'react';
import Axios from 'axios';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import BidsModal from '../broker/modals/BidsModal';
import DisagreeModal from './modals/DisagreeModal';
import NavMenu from '../NavMenu';
import Pagination from './pagination/Pagination';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

import { AllBidsData } from '../../../data/broker/AllClients';

import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Divider } from '@chakra-ui/react';

let PageSize = 5;
const Bids = () => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return AllBidsData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    // ----------------------

    const onCheckboxChange = (checkboxes) => {
        // do something
    };
    const [notification, setNotification] = useState({
        confirmation: false,
        isLoading: undefined,
        statusText: '',
        approved: undefined,
        rejected: undefined,
    });
    const handleYes = () => {
        setNotification({
            ...notification,
            confirmation: true,
            isLoading: true,
        });

        setTimeout(() => {
            setNotification({
                ...notification,
                confirmation: true,
                isLoading: false,
            });
        }, 3000);
    };

    // modal state
    const [state, setState] = useState({ modal: false, successState: false });

    // Disagree modal state
    const [disModal, setDisModal] = useState({ modal: false });

    const openModalApproved = () => {
        setState({ modal: true, successState: true });
        setNotification({ ...notification, statusText: 'Approved', approved: true });
    };
    const openModalRejected = () => {
        setState({ modal: true, successState: false });
        setNotification({ ...notification, statusText: 'Rejected', rejected: true });
    };
    const openModalDisagree = () => {
        setDisModal({ modal: true });
    };
    const closeModalDisagree = () => {
        setDisModal({ modal: false });
    };
    const closeModal = () => {
        setState({ ...state, modal: false });
    };

    // disable for bid rejection
    const disabled = notification.isLoading === false && notification.rejected;

    //remove bid
    const remove = (data) => {
        AllBidsData.filter((res) => res.id !== data.id);
    };

    const [bids, setBids] = useState([]);
    // const some = () => {
    //     Axios.get('https://order-book-online.herokuapp.com/v1/bids/').then((response) => {
    //         console.log(response);
    //     });
    // };

    // https://order-book-online.herokuapp.com/v1/bids/

    return (
        <div>
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
                        <Link to='/broker/dashboard/bids/addnewbid'>
                            <button className='mid-nav--addNewBid'>Add New Bid</button>
                        </Link>
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

                                                <Th className='border'>Tranche</Th>
                                                <Th className='border'>Duration</Th>
                                                <Th className='border'>Amount</Th>
                                                <Th className='border'>Status</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {currentTableData.map((data, index) => {
                                                return (
                                                    <Tr key={data.id}>
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
                                                        <Td className='border'>{data.tranche}</Td>
                                                        <Td className='border'>{data.duration}</Td>
                                                        <Td className='border'>{data.amount}</Td>
                                                        {notification.isLoading === false ? (
                                                            <Td className='border'>{notification.statusText}</Td>
                                                        ) : (
                                                            <Td className='border'>-</Td>
                                                        )}
                                                        <Td className='cta-buttons'>
                                                            {notification.isLoading === false &&
                                                            notification.approved ? (
                                                                <div>
                                                                    <button
                                                                        onClick={openModalApproved}
                                                                        className='cta-buttons--approve'
                                                                        disabled={true}
                                                                    >
                                                                        Approve
                                                                    </button>

                                                                    <button
                                                                        onClick={openModalRejected}
                                                                        className='cta-buttons--reject'
                                                                        disabled={true}
                                                                    >
                                                                        Reject
                                                                    </button>

                                                                    <button style={{ marginRight: '10px' }}>
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={openModalDisagree}
                                                                        disabled={true}
                                                                        className='cta-buttons--disagree'
                                                                    >
                                                                        Disagree
                                                                    </button>
                                                                    <button
                                                                        onClick={() => remove(data)}
                                                                        disabled={true}
                                                                        className='cta-buttons--delete'
                                                                    >
                                                                        <DeleteIcon />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <button
                                                                        onClick={openModalApproved}
                                                                        className='cta-buttons--approve'
                                                                    >
                                                                        Approve
                                                                    </button>

                                                                    <button
                                                                        onClick={openModalRejected}
                                                                        className='cta-buttons--reject'
                                                                        disabled={disabled}
                                                                    >
                                                                        Reject
                                                                    </button>

                                                                    <button
                                                                        onClick={() => {
                                                                            console.log(data.id);
                                                                        }}
                                                                        className='cta-buttons--edit'
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={openModalDisagree}
                                                                        disabled={disabled}
                                                                        className='cta-buttons--disagree'
                                                                    >
                                                                        Disagree
                                                                    </button>
                                                                    <button
                                                                        onClick={() => remove(data)}
                                                                        className='cta-buttons--delete'
                                                                    >
                                                                        <DeleteIcon />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </CheckboxGroup>
                                </Table>
                            </div>
                            <Pagination
                                className='pagination-bar'
                                currentPage={currentPage}
                                totalCount={AllBidsData.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Box>
                        <BidsModal
                            closeModal={closeModal}
                            state={state}
                            notification={notification}
                            handleYes={handleYes}
                        />
                        <DisagreeModal disModal={disModal} closeModalDisagree={closeModalDisagree} />
                    </section>
                </main>
            </OrderbookLayout>
        </div>
    );
};

export default Bids;
