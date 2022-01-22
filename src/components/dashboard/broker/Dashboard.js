import React from 'react';
import Button from '../../Button';

import NavMenu from '../NavMenu';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';

import headerBanner from '../../../assets/images/headerBanner.png';
import setBgImage from '../../../utils/setBgImage';

import Brokerdata from '../../../data/broker/DummyData';

import { 
	Flex,
	Box,
	Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
const BrokerDashboard = () => {
    return (
        <>
        <DocumentHead   title="Dashboard" />
        <OrderbookLayout PageNav={NavMenu}>
            <header id="orderbook-header" style={setBgImage(headerBanner)}>
                <Flex flexDirection={["column"]}>
                <div
                    id="loan-invest-dropdown"
                    className="bg-white px-16 py-10 shadow-md flex justify-start"
                >
                    <div id="loan" className="dropdown-container mr-5">
                        Clients{" "}
                        <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                        ></i>
                        <div id="load-dropdown"></div>
                    </div>
                    <div id="loan" className="dropdown-container mr-5">
                        Loans{" "}
                        <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                        ></i>
                        <div id="load-dropdown"></div>
                    </div>
                    <div id="investor" className="dropdown-container">
                        Investor{" "}
                        <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                        ></i>
                        <div id="investor-dropdown"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6">
                    <div id="orderbook-intro">
                        <h1 className="mt-0">
                        Hello, Ola
                        </h1>
                        <h3>Welcome to your dashboard</h3>
                        <p className="font-md">
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation.
                        </p>
                        <Button
                            title="Update my profile"
                            link="#"
                            buttonClass="intro-cta"
                        />
                    </div>
                    <Flex color={"#fff"} justifyContent={"space-between"} bg="#555" position={"sticky"} mt={"3.5em"} py={['6']} px={["10"]} flexDirection={["column", "row"]}>
                        <h2 style={{fontSize: "1.3em", marginLeft:"2%"}} >Quick access</h2>
                        <Flex flexDirection={["column","row"]} mr={["50px"]} >
                            <Flex mr={["10"]}>
                                <Box w={["30px"]} h={["30px"]} borderRadius={"50%"} bg={"#fff"} m="auto"></Box><Text ml={["2"]}>New Client</Text>
                            </Flex>
                            <Flex>
                                <Box w={["30px"]} h={["30px"]} borderRadius={"50%"} bg={"#fff"} m="auto"></Box><Text ml={["2"]}>New Order</Text>
                            </Flex>

                        </Flex>
                    </Flex>
                </div>
                </Flex>
            </header>
            <section style={{backgroundColor:"#E5E5E5", paddingBottom:"10%"}} >
                <Box w={["90vw"]} m="auto">
                <Text  py={["6"]}>My offers</Text>
                <Table size='sm' display={['none','table']} colorScheme={"blackAlpha"} >
                            <Thead>
                                <Tr
                                // key={index}
                                fontWeight={"extrabold"}
                                fontSize={["1.9em"]}
                                >
                                <Th>Name</Th>
                                <Th >Tranche </Th>
                                <Th >Tenure</Th>
                                <Th >Size</Th>
                                <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {
                                Brokerdata.map((data, index) => {
                            return (
                                <Tr key={index} 
                                >
                                    <Td>
                                        <Flex>
                                            <Box w="30px" h="30px" borderRadius={"5px"} border={"2px solid #555"}></Box>
                                            <Box w="30px" h="30px" borderRadius={"50%"} bg={"#555"} mx={["6"]}></Box>
                                            {data.offerName}
                                        </Flex>
                                        
                                    </Td>
                                    <Td>{data.tranche}</Td>
                                    <Td>{data.tenure}</Td>
                                    <Td>{data.size}</Td>
                                    <Td>
                                        <Box bg="#555" color="#fff" textAlign={"center"} p={["2"]} borderRadius={"5px"} w="70%">
                                        {data.status}
                                        </Box>
                                    </Td>


                                </Tr>

                            );
                                })
                            }
                    
                            
                        </Tbody>
                        
                    </Table>
                </Box>
                

            </section>
        </OrderbookLayout>
            
        </>
    )
}

export default BrokerDashboard