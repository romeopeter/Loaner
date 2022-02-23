import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";
import AllClientsData from '../../../fake-backend/broker/AllClients';

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
	Heading,
} from '@chakra-ui/react';

const AllClients = () => {
  return (
    <>
        <DocumentHead title="New Client" />
        <OrderbookLayout PageNav={NavMenu}>
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
            <main>
              <Flex flexDirection={"column"} bg="#555" px={["4.2%"]} py={[10]}>
                  <Heading as="h1" size="lg" color={"#fff"}>All Clients</Heading>
              </Flex>
            <section style={{ paddingBottom:"10%", marginTop:"3%"}} >
                <Box w={["94vw"]} m="auto">
                <Table size='sm' display={['none','table']} colorScheme={"blackAlpha"}>
                            <Thead bg="#C4C4C4">
                                <Tr
                                // key={index}
                                fontWeight={"extrabold"}
                                fontSize={["1.9em"]}
                                >
                                <Th>Name</Th>
                                <Th >Type</Th>
                                <Th >Category</Th>
                                <Th >Organization</Th>
                                <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {
                                AllClientsData.map((data, index) => {
                            return (
                                <Tr key={index} 
                                
                                >
                                    <Td>
                                        <Flex>
                                            <Box w="30px" h="30px" borderRadius={"5px"} my={[4]} border={"2px solid #555"}></Box>
                                            <Box w="30px" h="30px" borderRadius={"50%"} bg={"#C4C4C4"} m={["auto"]} ></Box>
                                            <Flex alignSelf={"center"}>{data.clientName}</Flex>
                                        </Flex>
                                        
                                    </Td>
                                    <Td>{data.clientType}</Td>
                                    <Td>{data.category}</Td>
                                    <Td>{data.org}</Td>
                                    <Td color={"#008060"} cursor={"pointer"}>
                                        {data.details}
                                    </Td>


                                </Tr>

                            );
                                })
                            }
                    
                            
                        </Tbody>
                        
                    </Table>
                </Box>
                
                {/* scrollable table */}
            </section>
            </main>
        </OrderbookLayout>
      </>
  );
};

export default AllClients;
