import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Box,
  Button,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { signOutAsync } from '../../../redux/authSlice';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import newOrder from '../../../assets/images/newOrder.png';
import newClient from '../../../assets/images/newClient.png';
import Pagination from './pagination/Pagination';
import bidRejected from '../../../assets/images/bidRejected.png';
import NavMenu from '../NavMenu';
import SubNavBar from './layouts/SubNavBar';
import {humanNumber} from "../../../utils/HRN";

let PageSize = 10;
const BrokerDashboard = () => {
  // Used in pagination
  const [loanRequest, setLoanRequest] = useState([]);

  // Used for conditional rendering
  const [getValue, setGetValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('/v1/loan_request/')
      .then((response) => {
        setLoanRequest(response.data.reverse());
        setGetValue(response);
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('Something went wrong, please try  again.');
        }
      });

    window.scroll(0, 0);
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return loanRequest.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, loanRequest]);

  // ----------------------

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  const { user: currentUser } = authUser;

  if (!currentUser) {
    return <Navigate replace to='login' />;
  }

  // eslint-disable-next-line no-unused-vars
  const handleSignOut = () => {
    dispatch(signOutAsync());
    navigate('/');
  };

  return (
    <div>
      <DocumentHead title='Dashboard' />
      <OrderbookLayout PageNav={NavMenu} className='broker'>
        <header id='orderbook-header' className='broker-orderbook-header'>
          <Flex flexDirection={['column']} className='broker-header'>
            {/* Sub-navbar */}
            <SubNavBar />

            <div className='grid grid-cols-1 gap-x-6'>
              <div className='broker-orderbook-intro'>
                <h1 className='pt-2'>Hello, {currentUser.first_name}</h1>
                <h2
                  className='mb-4'
                  style={{
                    fontSize: '1.3em',
                    fontWeight: '700',
                  }}
                >
                  Welcome to your dashboard
                </h2>
                <p className='font-md'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation.
                </p>

                <Button
                  className='btn'
                  bg={'#002276'}
                  color={'#fff'}
                  _hover={{ bg: '#002276' }}
                  borderRadius={'0'}
                  as={Link}
                  to='/account-settings'
                >
                  Update my profile
                </Button>
              </div>
              <div style={{ background: '#555' }}>
                <div className='broker-mid'>
                  <h2 className='ml-20 pl-10 quickAccess'>Quick access</h2>

                  <div className='broker-mid2'>
                    <Link to='/broker/dashboard/new-client' className='mr-16'>
                      <Flex>
                        <Center
                          w={['35px']}
                          h={['35px']}
                          borderRadius={'50%'}
                          bg={'#fff'}
                          className='mr-2'
                        >
                          <img alt='' src={newClient} />
                        </Center>
                        <Text fontSize='md'>New Client</Text>
                      </Flex>
                    </Link>

                    <Link to='/broker/dashboard/create-offer'>
                      <Flex>
                        <Center
                          w={['35px']}
                          h={['35px']}
                          borderRadius={'50%'}
                          bg={'#fff'}
                          className='mr-2'
                        >
                          <img alt='' src={newOrder} />
                        </Center>
                        <Text fontSize='md'>New Offer</Text>
                      </Flex>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Flex>
        </header>
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
                  if (
                    loanRequest.length === 0 &&
                    getValue.statusText === 'OK'
                  ) {
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
                      <p>Loading...</p>
                    </div>
                  );
                }
              })()}
            </div>
          ) : (
            <Box style={{ paddingBottom: '10%' }}>
              <Text className='myOffers ml-6 font-bold' px={['28']} py={['6']}>
                My offers
              </Text>
              <div className='tableScroll'>
                <Table size='sm' colorScheme={'blackAlpha'}>
                  <Thead h='80px'>
                    <Tr
                      // key={index}
                      fontWeight={'extrabold'}
                      fontSize={['1.9em']}
                    >
                      <Th></Th>
                      <Th></Th>
                      <Th>Name</Th>
                      <Th>Tranche Status </Th>
                      <Th>Tenure</Th>
                      <Th>Size</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody className='body'>
                    {currentTableData.map((data, index) => {
                      return (
                        <Tr key={index}>
                          <Td></Td>

                          <Td textAlign={'center !important'}>
                            {' '}
                            <Box
                              w='50px'
                              h='50px'
                              borderRadius={'50%'}
                              bg={'#555'}
                              margin={'0px !important'}
                            ></Box>
                          </Td>
                          <Td textAlign={'center'}>
                            <Flex alignItems='center'>{data.deal_name}</Flex>
                          </Td>
                          <Td>{data.tranche_id.status}</Td>
                          <Td>
                            {data.tranche_id.timing.offer_start} -{' '}
                            {data.tranche_id.timing.offer_end}
                          </Td>
                          <Td>
                            {data.tranche_id.size.currency}{" "}
                            {humanNumber(data.tranche_id.size.par_value)}
                          </Td>

                          {data.tranche_id.eligible_investors.length > 0 ? (
                            <Td style={{ color: '#008060' }}>Published</Td>
                          ) : (
                            <Td style={{ color: '#D82C0D' }}>Draft</Td>
                          )}
                          {data.tranche_id.eligible_investors.length > 0 ? (
                            <Td>
                              <Link
                                to={`/broker/dashboard/loan-offer-published/${data.deal_type.toLowerCase()}/${data.id}`}
                              >
                                <button className='broker-cta'>
                                  View Offer
                                </button>
                              </Link>
                            </Td>
                          ) : (
                            <Td>
                              <Link
                                to={`/broker/dashboard/loan-offer-draft/${data.id}/${data.deal_type.toLowerCase()}`}
                              >
                                <button className='broker-cta'>
                                  View Draft
                                </button>
                              </Link>
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
        </section>
      </OrderbookLayout>
    </div>
  );
};

export default BrokerDashboard;
