/* eslint-disable jsx-a11y/anchor-is-valid */
// Temp to create deadlinks
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import BidsModal from '../broker/modals/BidsModal';
import DeleteModal from '../broker/modals/DeleteModal';
import DisagreeModal from './modals/DisagreeModal';
import EditModal from './modals/EditModal';
import SelectModal from './modals/SelectModal';
import bidRejected from '../../../assets/images/bidRejected.png';
import NavMenu from '../NavMenu';
import Pagination from './pagination/Pagination';
import { Link, useParams } from 'react-router-dom';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import { AllBidsData } from '../../../data/broker/AllClients';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Divider } from '@chakra-ui/react';

let PageSize = 10;
const Bids = () => {
    let { id } = useParams();

    // Dropdown
    const [isOpen, setOpen] = useState({ client: false, investor: false });
    const toggleDropdownClient = () =>
        isOpen.client ? setOpen({ ...isOpen, client: false }) : setOpen({ investor: false, client: true });
    const toggleDropdownInvestor = () =>
        isOpen.investor ? setOpen({ ...isOpen, investor: false }) : setOpen({ client: false, investor: true });

    // Fetched data
    const [bidsData, setBidsData] = useState([]);
    const [dataState, setDataState] = useState({ isLoading: true, error: undefined });
    // Disagree modal state
    const [disModal, setDisModal] = useState({ modal: false, isLoading: undefined, error: undefined });
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
        dataApproved: undefined,
        dataRejected: undefined,
        dataDisagree: undefined,
        dataEditted: undefined,
    });

    // Handle status update approved
    const updatedataApproved = useCallback(() => {
        let data = notification.dataApproved;
        setNotification({
            ...notification,
            confirmation: true,
            isLoading: true,
        });
        const detail = {
            status: {
                name: 'approved',
                message: 'Please take heed to this',
            },
        };
        data &&
            axios
                .patch(`v1/bids/${data.id}/`, detail)
                .then(
                    (res) =>
                        res.statusText === 'OK' &&
                        setNotification({
                            ...notification,
                            confirmation: true,
                            isLoading: false,
                        })
                )
                .catch((err) => err && setNotification({ ...notification, isLoading: true }));
    }, [notification]);

    // Handle status update approved
    const updatedataRejected = useCallback(() => {
        let data = notification.dataRejected;
        setNotification({
            ...notification,
            confirmation: true,
            isLoading: true,
        });
        const detail = {
            status: {
                name: 'rejected',
                message: 'Rejected',
            },
        };
        data &&
            axios
                .patch(`v1/bids/${data.id}/`, detail)
                .then(
                    (res) =>
                        res.statusText === 'OK' &&
                        setNotification({
                            ...notification,
                            confirmation: true,
                            isLoading: false,
                        })
                )
                .catch((err) => err && setNotification({ ...notification, isLoading: true }));
    }, [notification]);

    const disagreeForm = useCallback(
        (values) => {
            setDisModal({ isLoading: true, ...disModal });
            let data = notification.dataDisagree;
            const detail = {
                status: {
                    name: 'disagreed',
                    message: values.textArea,
                },
            };
            data &&
                axios
                    .patch(`v1/bids/${data.id}/`, detail)
                    .then((response) => {
                        console.log(response);
                        response.statusText === 'OK' && setDisModal({ ...disModal, isLoading: false });
                    })
                    .catch((err) => {
                        err && setDisModal({ isLoading: false, error: 'Something Went Wrong' });
                    });
        },
        [notification.dataDisagree, disModal]
    );

    console.log(bidsData);

    //  Call Fetched data
    useEffect(() => {
        axios
            .get(`v1/bids/`)
            .then((response) => {
                setBidsData(response.data.reverse());
                response.statusText === 'OK' && setDataState({ error: '', isLoading: false });
            })
            .catch((e) => setDataState({ error: 'Something Went Wrong', isLoading: false }));
    }, [updatedataApproved, updatedataRejected, disagreeForm, deleteModal, editModal, id]);

    // delete bid
    const handleDelete = () => {
        setDeleteModal({ ...deleteModal, isLoading: true });
        let data = deleteModal.data;
        axios
            .delete(`v1/bids/${data.id}/`, data)
            .then((response) => response.status === 204 && setDeleteModal({ modal: false, isLoading: false }));
    };

    // Checkbox action
    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        value === 'Select action' ? setSelectFilter({ value: undefined }) : setSelectFilter({ value });
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
        if (selectFilter.value === undefined) {
            setSelectFilter({ modal: false });
        } else setSelectFilter({ ...selectFilter, modal: true, successState: true });
    };

    // pagination
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return bidsData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, bidsData]);

    // TABS
    const [tabActive, setTabActive] = useState({ prorated: true, manual: false, ordered: false });
    const prorated = () => {
        setTabActive({ manual: false, ordered: false, prorated: true });
        let newData = bidsData;
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

    // Modals
    const openModalApproved = (data) => {
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
    const closeSelectModal = () => {
        setSelectFilter({ ...selectFilter, modal: false });
    };

    return (
        <div>
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
                <main className='bids'>
                    <div className='bids-heading'>
                        <h1> {bidsData.length > 1 && bidsData[0].loan_request.tranche_name}</h1>

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
                        <div className={`${className} mid-nav--dropdown`}>
                            <select onChange={handleChange}>
                                <option defaultValue={'Select action'}> Select action</option>
                                <option value='approve all'>Approve all</option>
                                <option value='reject all'>Reject all</option>
                            </select>

                            <button className='mid-nav-button' onClick={handleApply}>
                                Apply
                            </button>
                        </div>

                        <Link to={`/broker/dashboard/bids/addnewbid/${id}`}>
                            <button className='mid-nav--addNewBid'>Add New Bid</button>
                        </Link>
                    </div>
                    <section style={{ paddingBottom: '10%' }}>
                        <Box>
                            <div className='tableScroll'>
                                {(() => {
                                    if (dataState.isLoading) {
                                        return <p className='loader' style={{ margin: '100px auto' }}></p>;
                                    } else if (dataState.error) {
                                        return (
                                            <p
                                                className='responseMessage'
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                    margin: '100px auto',
                                                }}
                                            >
                                                <img
                                                    alt=''
                                                    src={bidRejected}
                                                    style={{ height: '30px', width: '30px' }}
                                                />
                                                Something went wrong, please try again.{' '}
                                            </p>
                                        );
                                    } else if (bidsData.length === 0) {
                                        return (
                                            <p
                                                className='responseMessage'
                                                style={{
                                                    alignItems: 'center',
                                                    margin: '100px auto',
                                                }}
                                            >
                                                There are currently no bids available.
                                                <br /> Add a new bid.
                                            </p>
                                        );
                                    } else {
                                        return (
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
                                                                        <Checkbox
                                                                            data={data}
                                                                            className='broker-checkbox'
                                                                        />
                                                                    </Td>
                                                                    <Td className='border'>
                                                                        <Flex>
                                                                            <Box
                                                                                w='40px'
                                                                                h='40px'
                                                                                borderRadius={'50%'}
                                                                                bg={'#555555'}
                                                                                // m={['auto']}
                                                                                mr={[4]}
                                                                            ></Box>

                                                                            <Flex alignSelf={'center'}>
                                                                                {data.owner.first_name}{' '}
                                                                                {data.owner.last_name}
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Td>
                                                                    <Td className='border'>{data.tranche}</Td>
                                                                    <Td className='border'>
                                                                        {data.loan_request.duration} Days
                                                                    </Td>
                                                                    <Td className='border'>NGN {data.amount}</Td>

                                                                    {(() => {
                                                                        if (data && data.status) {
                                                                            return (
                                                                                <Td className='border'>
                                                                                    {data.status[0].name}
                                                                                </Td>
                                                                            );
                                                                        } else {
                                                                            return <Td className='border'>-</Td>;
                                                                        }
                                                                    })()}

                                                                    {/**CTA BUTTONS */}
                                                                    <Td className='cta-buttons'>
                                                                        {(() => {
                                                                            if (
                                                                                data.status &&
                                                                                data.status[0].name === 'approved'
                                                                            ) {
                                                                                return (
                                                                                    <div>
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                openModalEdit(data);
                                                                                            }}
                                                                                            className='cta-buttons--edit'
                                                                                        >
                                                                                            Edit
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                openDeleteModal(data)
                                                                                            }
                                                                                            className='cta-buttons--delete'
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            if (
                                                                                data.status &&
                                                                                data.status[0].name === 'rejected'
                                                                            ) {
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
                                                                                                openModalEdit(data);
                                                                                            }}
                                                                                            className='cta-buttons--edit'
                                                                                        >
                                                                                            Edit
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                openDeleteModal(data)
                                                                                            }
                                                                                            className='cta-buttons--delete'
                                                                                        >
                                                                                            Delete
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
                                                                                            onClick={() =>
                                                                                                openDeleteModal(data)
                                                                                            }
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
                                        );
                                    }
                                })()}
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
                            updatedataApproved={updatedataApproved}
                            updatedataRejected={updatedataRejected}
                            bidsData={bidsData}
                            selectFilter={selectFilter}
                        />
                        <DisagreeModal
                            disModal={disModal}
                            closeModalDisagree={closeModalDisagree}
                            notification={notification}
                            disagreeForm={disagreeForm}
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
