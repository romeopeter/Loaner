import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";
import LoanRequestData from '../../../data/broker/LoanRequest';
import { 
	Flex,
	Box,
	Text,
    Table,
    Tbody,
    Tr,
    Td,
	Heading,
    Image,
    Input,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

const AdminCompanies = () => {
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
            <Flex flexDirection={"row"} justifyContent={"space-between"} bg="#555" px={["4.2%"]} py={[10]} mb={[10]}>
                <Flex flex={2}>
                    <Heading  as="h1" size="lg" color={"#fff"} mr={[8]}>Issuers</Heading>
                    <Heading  as="h1" size="lg" color={"#fff"} opacity={[0.5]}>Investors</Heading>

                </Flex>
                <Input flex={1} bg="#C4C4C4"  borderRadius={0} outline={"none"} type="search" placeholder='search' />
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
                                    <ButtonGroup>
                                    <Button borderRadius={["0"]}  as={Link} to="/admin" variant='ghost' bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} w={"50%"} >View details</Button>
                                    <Button borderRadius={["0"]}  as={Link} to="/admin" border="1px solid #000" bg={"#fff"} color={"#000"} _hover={{bg:"#fff"}} >Add</Button>
                                    </ButtonGroup>
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

export default AdminCompanies;
