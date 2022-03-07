/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks
import React, { useState, useMemo, useEffect } from 'react';
// import axios from 'axios';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import BidsModal from '../broker/modals/BidsModal';
import DeleteModal from '../broker/modals/DeleteModal';
import DisagreeModal from './modals/DisagreeModal';
import EditModal from './modals/EditModal';
import SelectModal from './modals/SelectModal';
import NavMenu from '../NavMenu';
import Pagination from './pagination/Pagination';
import { Link } from 'react-router-dom';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import { AllBidsData } from '../../../data/broker/AllClients';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Divider } from '@chakra-ui/react';

let PageSize = 10;
const Bids = () => {
    // Fetched data
    const [bidsData, setBidsData] = useState([]);
    // Disagree modal state
    const [disModal, setDisModal] = useState({ modal: false });
    // Edit Modal
    const [editModal, setEditModal] = useState({ modal: false });
    //  Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    //  delete modal state
    const [deleteModal, setDeleteModal] = useState({ modal: false, data: undefined, isLoading: undefined });
    // Approve & Reject modal success state
    const [state, setState] = useState({ modal: false, successState: false });
    // Select Filter state
    const [selectFilter, setSelectFilter] = useState({ value: undefined, modal: false, successState: false });
    // notification state
    const [notification, setNotification] = useState({
        confirmation: false,
        isLoading: undefined,
        approved: undefined,
        rejected: undefined,
        disagreed: undefined,
        dataApproved: undefined,
        dataRejected: undefined,
        dataDisagree: undefined,
        dataEditted: undefined,
    });

    //  Call Fetched data
    useEffect(() => {
        setBidsData(AllBidsData);
    }, []);

    // ///////////////////////////////////////

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
            updatedataApproved(notification.dataApproved);
            updatedataRejected(notification.dataRejected);
            updatedataApprovedSecond(notification.dataApproved);
        }, 1000);
    };

    // Handle status update
    const updatedataApproved = (data) => {
        if (data) return (data.status = 'Approved');
    };
    const updatedataApprovedSecond = (data) => {
        if (data && data.status === 'Rejected') return (data.statusUpdated = 'Approved');
    };
    const updatedataRejected = (data) => {
        if (data) return (data.status = 'Rejected');
    };
    const updatedataDisagree = (data) => {
        if (data) return (data.status = 'Disagreed');
    };

    // Modals
    const openModalApproved = (data) => {
        setState({ modal: true, successState: true });
        setNotification({ ...notification, approved: true, dataApproved: data });
    };
    const openModalApprovedUpdated = (data) => {
        setState({ modal: true, successState: true });
        setNotification({ ...notification, approved: true, dataApproved: data });
    };
    const openModalRejected = (data) => {
        setState({ modal: true, successState: false });
        setNotification({ ...notification, rejected: true, dataRejected: data });
    };
    const openModalEdit = (data) => {
        setEditModal({ modal: true });
        setNotification({ ...notification, dataEditted: data });
    };
    const closeModalEdit = () => {
        setEditModal({ modal: false });
    };
    const closeModal = () => {
        setState({ ...state, modal: false });
        setNotification({ ...notification, confirmation: false });
    };
    const openModalDisagree = (data) => {
        setDisModal({ modal: true });
        setNotification({ ...notification, dataDisagree: data });
    };
    const closeModalDisagree = () => {
        setDisModal({ modal: false });
    };
    const openDeleteModal = (data) => {
        setDeleteModal({ modal: true, data: data });
    };
    const closeDeleteModal = () => {
        setDeleteModal({ modal: false });
    };

    //remove bid
    const remove = (data) => {
        let newData = bidsData.filter((res) => res.id !== data.id);
        console.log(newData);
        setBidsData(newData);
    };
    const handleDelete = () => {
        setDeleteModal({ ...deleteModal, isLoading: true });
        setTimeout(() => {
            setDeleteModal({ modal: false, isLoading: false });
            return remove(deleteModal.data);
        }, 3000);
    };

    // Checkbox action
    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSelectFilter({ value });
    };
    const [checkbox, setCheckbox] = useState([]);
    const onCheckboxChange = (checkboxes) => {
        setCheckbox(checkboxes);
    };
    
    // disables the select dropdown unless the user selects more than one item
    const filtered = checkbox.filter((c) => c.checked);
    const className = filtered.length < 2 ? 'disable' : '';

    const handleApply = (e) => {
        e.preventDefault();
        setSelectFilter({ ...selectFilter, modal: true, successState: true });
    };
    const closeSelectModal = () => {
        setSelectFilter({ ...selectFilter, modal: false });
    };

    // pagination
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return bidsData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, bidsData]);

    // TABS
    const [tabActive, setTabActive] = useState({ prorated: false, manual: false, ordered: false });
    const prorated = () => {
        setTabActive({ manual: false, ordered: false, prorated: true });
        let newData = AllBidsData.filter((list) => list.id > 5);
        setBidsData(newData);
    };
    const manualListing = () => {
        setTabActive({ ordered: false, prorated: false, manual: true });
        let newData = AllBidsData.filter((list) => list.id % 2 === 0);
        setBidsData(newData);
    };
    const orderedListing = () => {
        setTabActive({ manual: false, prorated: false, ordered: true });
        let newData = AllBidsData.filter((list) => list.id < 5);
        setBidsData(newData);
    };
    const proratedActive = tabActive.prorated ? 'active' : '';
    const manualActive = tabActive.manual ? 'active' : '';
    const orderedActive = tabActive.ordered ? 'active' : '';

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
                                <button onClick={prorated} className={`${proratedActive}`}>
                                    Prorated
                                </button>
                                <Divider orientation='vertical' />
                                <button onClick={manualListing} className={`${manualActive}`}>
                                    Manual Listing
                                </button>
                                <Divider orientation='vertical' />
                                <button onClick={orderedListing} className={`${orderedActive}`}>
                                    Ordered Listing
                                </button>
                            </Center>
                        </div>
                    </div>
                    <div className='mid-nav'>
                        <form className={`${className} mid-nav--dropdown`}>
                            <select onChange={handleChange}>
                                <option defaultValue={'Select action'}> Select action</option>
                                <option value='approve all'>Approve all</option>
                                <option value='reject all'>Reject all</option>
                            </select>

                            <button className='mid-nav-button' onClick={handleApply}>
                                Apply
                            </button>
                        </form>
                        <Link to='/broker/dashboard/bids/addnewbid'>
                            <button className='mid-nav--addNewBid'>Add New Bid</button>
                        </Link>
                    </div>
                    <section style={{ paddingBottom: '10%' }}>
                        <Box>
                            <div className='tableScroll'>
                                {bidsData.length < 1 && <p>There are currently no bids available</p>}
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
                                                            <Checkbox data={data} className='broker-checkbox' />
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
                                                        <Td className='border'>{data.duration} Days</Td>
                                                        <Td className='border'>NGN {data.amount}</Td>

                                                        {(() => {
                                                            if (data && data.status && !data.statusUpdated) {
                                                                return <Td className='border'>{data.status}</Td>;
                                                            }
                                                            if (data && selectFilter === 'approve all') {
                                                                return <Td className='border'>{data.status}</Td>;
                                                            }
                                                            if (data && selectFilter === 'reject all') {
                                                                return <Td className='border'>{data.status}</Td>;
                                                            }
                                                            if (data.statusUpdated) {
                                                                return <Td className='border'>{data.statusUpdated}</Td>;
                                                            } else {
                                                                return <Td className='border'>-</Td>;
                                                            }
                                                        })()}

                                                        {/**CTA BUTTONS */}
                                                        <Td className='cta-buttons'>
                                                            {(() => {
                                                                if (
                                                                    data.status === 'Approved' ||
                                                                    data.statusUpdated === 'Approved'
                                                                ) {
                                                                    return (
                                                                        <button
                                                                            onClick={() => {
                                                                                openModalEdit(data);
                                                                            }}
                                                                            style={{ marginRight: '10px' }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    );
                                                                }
                                                                if (data.status === 'Rejected') {
                                                                    return (
                                                                        <div>
                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalApprovedUpdated(data);
                                                                                }}
                                                                                className='cta-buttons--approve'
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalEdit(data);
                                                                                }}
                                                                                style={{ marginRight: '10px' }}
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <div>
                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalApproved(data);
                                                                                }}
                                                                                className='cta-buttons--approve'
                                                                            >
                                                                                Approve
                                                                            </button>

                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalRejected(data);
                                                                                }}
                                                                                className='cta-buttons--reject'
                                                                            >
                                                                                Reject
                                                                            </button>

                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalEdit(data);
                                                                                }}
                                                                                className='cta-buttons--edit'
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    openModalDisagree(data);
                                                                                }}
                                                                                className='cta-buttons--disagree'
                                                                            >
                                                                                Disagree
                                                                            </button>
                                                                            <button
                                                                                onClick={() => openDeleteModal(data)}
                                                                                className='cta-buttons--delete'
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                }
                                                            })()}
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
                                totalCount={bidsData.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Box>
                        <BidsModal
                            closeModal={closeModal}
                            state={state}
                            notification={notification}
                            handleYes={handleYes}
                            bidsData={bidsData}
                            selectFilter={selectFilter}
                        />
                        <DisagreeModal
                            updatedataDisagree={updatedataDisagree}
                            disModal={disModal}
                            closeModalDisagree={closeModalDisagree}
                            notification={notification}
                        />
                        <DeleteModal
                            handleDelete={handleDelete}
                            closeDeleteModal={closeDeleteModal}
                            deleteModal={deleteModal}
                        />
                        <EditModal
                            data={notification.dataEditted}
                            closeModal={closeModalEdit}
                            editModal={editModal}
                            notification={notification}
                        />
                        <SelectModal
                            selectFilter={selectFilter}
                            closeSelectModal={closeSelectModal}
                            bidsData={bidsData}
                            checkbox={checkbox}
                        />
                    </section>
                </main>
            </OrderbookLayout>
        </div>
    );
};

export default Bids;
