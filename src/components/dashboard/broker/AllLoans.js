import React from 'react';
import { Link } from "react-router-dom";

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import LoanRequestData from '../../../fake-backend/broker/LoanRequest';
import { 
	Flex,
	Box,
	Text,
    Table,
    Tbody,
    Tr,
    Td,
	Heading,
    Image
} from '@chakra-ui/react';

const AllLoans = () => {
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
                  <Heading as="h1" size="lg" color={"#fff"}>Loan Requests</Heading>
              </Flex>
            <section style={{ paddingBottom:"10%", marginTop:"3%"}} >
                <Box w={["94vw"]} m="auto">
                <Table size='sm' display={['none','table']} colorScheme={"blackAlpha"}>
                           
                            <Tbody>
                            {
                                LoanRequestData.map((data, index) => {
                            return (
                                <Tr key={index} 
                                borderBottom={"1px solid black"}
                                >
                                    <Td>
                                        <Flex>
                                            <Box w="30px" h="30px" borderRadius={"5px"} my={[4]} border={"2px solid #555"}></Box>
                                            <Box w="60px" h="60px" borderRadius={"50%"} bg={"#C4C4C4"} m={["auto"]} >
                                                <Image w="60px" h="60px" borderRadius={"50%"} src={data.imageUrl} />
                                            </Box>
                                        </Flex>
                                        
                                    </Td>
                                    <Td borderRight={"1px  solid black"} ><Text as={"u"} fontWeight={"bold"}>{data.offerName}</Text>
                                    <Box><Text as={"u"} fontWeight={"bold"}>({data.category})</Text></Box>
                                    </Td>
                                    <Td borderRight={"1px  solid black"} maxW={"300px"} px={[8]}>{data.desc}</Td>
                                    <Td color={"#008060"} cursor={"pointer"} textAlign={"center"}>
                                        <Text  as={Link} to='/broker/dashboard/loan-offer/'>{data.details}</Text>
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

export default AllLoans;
