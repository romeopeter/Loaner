import React, { useState, useEffect } from 'react';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';

import { getOffer } from '../../../services/loan.service';
import SubNavBar from './layouts/SubNavBar';
import Arrow from '../../../assets/images/Arrow.png';
import offerImage from '../../../assets/images/offerImage.png';

import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Button } from '@chakra-ui/react';

const LoanOfferDraft = () => {
    let { id, dealType } = useParams();
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

        return () => componentIsMounted = false;
    }, [id, dealType]);

    return (
        <>
            <DocumentHead title='Loan Draft' />
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
                                        <h3 className='mb-4'> {data.deal_name}</h3>
                                        <div id='schedule-payment' className='hidden md:block'>
                                            <p>Payment Schedule</p>
                                            <div className='grid grid-cols-12 gap-4' style={{ fontSize: '13px' }}>
                                                <div className='col-span-6'>Sep 2022 - 9%</div>
                                                <div className='col-span-6'>Dec 2022 - 9%</div>
                                                <div className='col-span-12'>Mar 2022 - 9%</div>
                                                <div className='col-span-12'>Jun 2022 - 9% + 100% Capital</div>
                                            </div>
                                            <div id='address'>
                                                <span>Contact information:</span> <hr />
                                                <address>
                                                    <p>
                                                        <span>Address:</span> 25 lorem ipsum road, Ipsum street, Lagos
                                                        State
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
                                        <p style={{ fontWeight: '700', fontSize: '18px' }} className=' sm:mt-5'>
                                            Description
                                        </p>
                                        <p
                                            className="pb-3"
                                            style={{
                                                textAlign: 'justify',
                                                height: 200,
                                                overflowY: "scroll",
                                                fontSize: '15px',
                                                lineHeight: '2',
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
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.deal_name}</p>
                                            </Box>
                                            <Box mx={[0, 10]} my={[10, 0]}>
                                                <p style={{ fontSize: '15px' }}>Type of offer</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.deal_type}</p>
                                            </Box>
                                            <Box>
                                                <p style={{ fontSize: '15px' }}>Loan amount</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{Math.round(data.tranche_id.size.minimum_subscription.amount)}</p>
                                            </Box>
                                            <Box mx={[0, 10]} my={[10, 0]}>
                                                <p style={{ fontSize: '15px' }}>Tranche</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    Tranche {data.tranche_id.id}
                                                </p>
                                            </Box>
                                            <Box>
                                                <p style={{ fontSize: '15px' }}>Tenure</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    {data.tranche_id.timing.offer_start} to{' '}
                                                    {data.tranche_id.timing.offer_end}
                                                </p>
                                            </Box>
                                        </Flex>
                                        <Flex flexDirection={['column', 'row']} className='lg:mb-5'>
                                            <Box>
                                                <p style={{ fontSize: '15px' }}>Size</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    {' '}
                                                    {data.tranche_id.size.currency}
                                                    {data.tranche_id.size.par_value}
                                                </p>
                                            </Box>
                                            <Box mx={[0, 10]} my={[10, 0]}>
                                                <p style={{ fontSize: '15px' }}>Offer opens</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    {' '}
                                                    {data.tranche_id.timing.offer_start}
                                                </p>
                                            </Box>
                                            <Box>
                                                <p style={{ fontSize: '15px' }}>Offer closes</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    {' '}
                                                    {data.tranche_id.timing.offer_end}
                                                </p>
                                            </Box>
                                            <Box mx={[0, 10]} my={[10, 0]}>
                                                <p style={{ fontSize: '15px' }}>Settlement date</p>
                                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                    {' '}
                                                    {data.tranche_id.timing.settlement_date}
                                                </p>
                                            </Box>
                                        </Flex>

                                        <Flex
                                            flexDirection={['column', 'row']}
                                            justifyContent={'flex-end'}
                                            w={['70%']}
                                            float={['right']}
                                            margin={['50px 0px']}
                                        >
                                            <Button
                                                border={'1px solid #000'}
                                                bg={'#fff'}
                                                px={['6']}
                                                color={'#000'}
                                                _hover={{ bg: '#d1d1d1', border: 'none' }}
                                                borderRadius={'0'}
                                                w={'120px'}
                                                mt={['10px']}
                                                mr={["10px"]}
                                                as={Link}
                                                to={`/broker/dashboard/edit-loan-offer/${id}/${dealType.toLocaleLowerCase()}`}
                                            >
                                                Edit draft
                                            </Button>
                                            {/* <Button
                                                bg={'#C4C4C4'}
                                                px={['6']}
                                                color={'#000'}
                                                _hover={{ bg: '#d1d1d1' }}
                                                borderRadius={'0'}
                                                mx={[0, 10]}
                                                mt={['10px']}
                                                w={'120px'}
                                                as={Link}
                                                to='/broker/dashboard/all-offers/'
                                            >
                                                Save draft
                                            </Button> */}
                                            <Button
                                                bg={'#008060'}
                                                px={['6']}
                                                color={'#fff'}
                                                _hover={{ bg: '#008077' }}
                                                borderRadius={'0'}
                                                w={'120px'}
                                                mt={['10px']}
                                                as={Link}
                                                to={`/broker/dashboard/loan-offer/${id}/${dealType.toLocaleLowerCase()}/select-investor`}
                                            >
                                                Next
                                            </Button>
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </OrderbookLayout>
        </>
    );
};

export default LoanOfferDraft;
