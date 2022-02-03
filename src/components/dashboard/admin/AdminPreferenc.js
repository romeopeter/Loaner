import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";
import { 
	Flex,
	Box,
    Table,
    Tbody,
    Tr,
    Td,
    Th,

	Heading,
	Button,
    ButtonGroup,
  
} from '@chakra-ui/react';

const AdminPreference = () => {
  return (
      <>
      <DocumentHead title="Admin currencies" />
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
                <Heading flex={2} as="h1" size="lg" color={"#fff"}>Preferences</Heading>
                {/* <Input flex={1} bg="#C4C4C4"  borderRadius={0} outline={"none"} type="search" placeholder='search' /> */}
            </Flex>
            <Box mb={10}>
                {/* {
                    adminCurrenyData.map((data, index) => {
                    return ( */}
                        <Table size='sm' display={['none','table']} colorScheme={"blackAlpha"}>
                            <Tbody>
                                <Tr>
                                    <Th>
                                        Deal type
                                    </Th>
                                    <Th>
                                        Coupon frequency
                                    </Th>
                                    <Th>
                                        Data count types
                                    </Th>
                                    <Th>
                                        Denomination
                                    </Th>
                                    <Th>
                                        Rating
                                    </Th>
                                    <Th>
                                        
                                    </Th>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Flex  my={[4]} >
                                            <Box w="30px" h="30px" borderRadius={"5px"} mr={[4]} border={"2px solid #555"}></Box>
                                            <p style={{textAlign:"center"}}>Comercial paper</p>
                                        </Flex>
                                    </Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td>
                                        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}   >
                                            <ButtonGroup>
                                                <Button borderRadius={["0"]}  as={Link} to="/admin" variant='ghost' bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} w={"60%"} >Edit</Button>
                                                <Button borderRadius={["0"]}  as={Link} to="/admin" border="1px solid #000" bg={"#fff"} color={"#000"} _hover={{bg:"#fff"}} >Add</Button>
                                            </ButtonGroup>
                                        </Flex>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        
                        
                        {/* );
                    })
                } */}
            </Box>

        </main>
      </OrderbookLayout>
      </>
  );
};

export default AdminPreference;
