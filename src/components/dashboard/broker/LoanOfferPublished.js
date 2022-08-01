import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import DocumentHead from '../../DocumentHead';
import OrderbookLayout from '../../OrderbookLayout';
import NavMenu from '../NavMenu';
import { getOffer } from '../../../services/loan.service';
import { getBid } from '../../../services/bid.service';
import Arrow from '../../../assets/images/Arrow.png';
import SubNavBar from './layouts/SubNavBar';
import offerImage from '../../../assets/images/offerImage.png';

const LoanOfferPublished = () => {
  const pageName = 'Loan Published';
  let { id, dealType } = useParams();

  const [bidsData, setBidsData] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);

    let componentIsMounted = true;
    (async function getLoanOffer() {
      const res = await getOffer(dealType, id);
      
      if (res.statusText === "OK") {
       if (componentIsMounted) setData(res.data);
      }
    })();
    
    (async function getLoanOfferBid() {
      const res = await getBid(id);
      if (res.statusText === "OK") {
        if (componentIsMounted) setBidsData(res.data);
      }
    })();

    return () => componentIsMounted = false;
  }, [id, dealType]);

  return (
    <div>
      <DocumentHead title={pageName} />
      <OrderbookLayout PageNav={NavMenu}>

        {/* Sub navbar */}
        <SubNavBar />

        {!data ? (
          <p className='loader' style={{ margin: '100px auto' }}></p>
        ) : (
          <section id='orderbook-show-bids' style={{ padding: '60px' }}>
            <div id='offer'>
              <h3 id='header' style={{ marginBottom: '0px' }}>
                {data.deal_name}
              </h3>
              <div id='the-offer'>
                <div className='mb-8'>
                  <Link to='/broker/dashboard/all-offers/'>
                    <img alt='' src={Arrow} className='backArrow' />
                  </Link>
                </div>
                <div className='grid grid-cols-12 '>
                  <div id='offer-header' className='col-span-12 lg:col-span-4'>
                    <img src={offerImage} alt='' className='w-full' />
                    <h3>
                      {' '}
                      {data.deal_name} (Availability - {data.availability})
                    </h3>
                    <div id='schedule-payment' className='hidden md:block'>
                      <p>Payment Schedule</p>
                      <div
                        className='grid grid-cols-12 gap-4'
                        style={{ fontSize: '13px' }}
                      >
                        <div className='col-span-6'>
                          {' '}
                          {data.tranche_id.timing.offer_start} - 9%
                        </div>
                        <div className='col-span-6'>
                          {' '}
                          {data.tranche_id.timing.offer_end} - 9%
                        </div>
                        <div className='col-span-12'>
                          {' '}
                          {data.tranche_id.timing.maturity_date} - 9%
                        </div>
                        <div className='col-span-12'>
                          {' '}
                          {data.tranche_id.timing.settlement_date} - 9% + 100%
                          Capital
                        </div>
                      </div>
                      <div id='address'>
                        <span>Contact information:</span> <hr />
                        <address>
                          <p>
                            <span>Address:</span> 25 lorem ipsum road, Ipsum
                            street, Lagos State
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
                    <p
                      style={{ fontWeight: '700', fontSize: '18px' }}
                      className='pb-3 sm:mt-5'
                    >
                      Description
                    </p>
                    <p
                      style={{
                        textAlign: 'justify',
                        maxHeight: 200,
                        fontSize: '15px',
                        overflowY: "scroll"
                      }}
                    >
                      {data.description !== null ? data.description : "No description"}
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
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {data.deal_name}
                        </p>
                      </Box>
                      <Box mx={[0, 10]} my={[10, 0]}>
                        <p style={{ fontSize: '15px' }}>Type of offer</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {data.deal_type}
                        </p>
                      </Box>
                      <Box>
                        <p style={{ fontSize: '15px' }}>Loan amount</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {' '}
                          {data.tranche_id.size.currency} 5 Billion
                        </p>
                      </Box>
                      <Box mx={[0, 10]} my={[10, 0]}>
                        <p style={{ fontSize: '15px' }}>Tranche</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          Tranche {data.tranche_id.ratings.id}
                        </p>
                      </Box>
                      <Box>
                        <p style={{ fontSize: '15px' }}>Tenure</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          180 Days
                        </p>
                      </Box>
                    </Flex>
                    <Flex flexDirection={['column', 'row']} className='lg:mb-5'>
                      <Box>
                        <p style={{ fontSize: '15px' }}>Size</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {' '}
                          {data.tranche_id.size.currency}{' '}
                          {data.tranche_id.size.par_value}
                        </p>
                      </Box>
                      <Box mx={[0, 10]} my={[10, 0]}>
                        <p style={{ fontSize: '15px' }}>Offer opens</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {' '}
                          {data.tranche_id.timing.offer_start}
                        </p>
                      </Box>
                      <Box>
                        <p style={{ fontSize: '15px' }}>Offer closes</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {' '}
                          {data.tranche_id.timing.offer_end}
                        </p>
                      </Box>
                      <Box mx={[0, 10]} my={[10, 0]}>
                        <p style={{ fontSize: '15px' }}>Settlement date</p>
                        <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
                          {' '}
                          {data.tranche_id.timing.settlement_date}
                        </p>
                      </Box>
                    </Flex>
                    <Link to={`/broker/dashboard/bids/${id}`}>
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
                      <Box style={{ border: '1px solid #c4c4c4' }}>
                        <div className='tableScroll' style={{}}>
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
                              </Tr>
                            </Thead>

                            <Tbody>
                              {(() => {
                                if (bidsData.length === 0) {
                                  return (
                                    <Tr className='responseMessage'>
                                      <Td>
                                        There are currently no bids available
                                      </Td>
                                    </Tr>
                                  );
                                } else {
                                  const list = bidsData;
                                  const size = 4;
                                  const items = list.slice(0, size);
                                  return items.map((data, index) => {
                                    return (
                                      <Tr key={data.id}>
                                        <Td className='border'>
                                          <Flex>
                                            <Box
                                              w='35px'
                                              h='35px'
                                              borderRadius={'50%'}
                                              bg={'#555555'}
                                              mr={[4]}
                                            ></Box>
                                            <Flex alignSelf={'center'}>
                                              {data.owner.first_name}{' '}
                                              {data.owner.last_name}
                                            </Flex>
                                          </Flex>
                                        </Td>
                                        <Td className='border'>
                                          {data.tranche}
                                        </Td>
                                        <Td className='border'>
                                          {data.loan_request.duration} Days
                                        </Td>
                                        <Td className='border'>
                                          {data.amount}
                                        </Td>
                                      </Tr>
                                    );
                                  });
                                }
                              })()}
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
        )}
      </OrderbookLayout>
    </div>
  );
};

export default LoanOfferPublished;
