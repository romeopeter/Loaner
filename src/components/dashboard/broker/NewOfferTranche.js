import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";

import { 
	Flex,
	Box,
	Text,
	FormControl,
	Input,
	Select,
	Heading,
	Button,
} from '@chakra-ui/react';



const NewOfferTranche = () => {
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
                  <Heading as="h1" size="lg" color={"#fff"}>New Offer</Heading>
                  <Text color={"#fff"}>Tranche terms</Text>
              </Flex>
              <Flex flexDirection={["column", "row"]}>
                  <Box bg="#555" flex={"1"} px={["5%"]} pb={[10]}>
                        <FormControl >
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Status'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} my={[10]} placeholder='Tranch name'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Text color={"#fff"} my={[6]}>Tranch size</Text>
                            <Flex flexDirection={["column", "row"]} >
                                <Box flex={"1"} mr={[0,10]}>
                                    <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='currency'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                    </Select>
							        <Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Par value" mt={[10]}/>
                                </Box>
                                <Box flex={"1"} >
                                    <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Value'>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                    </Select>
                                    <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Mini subscription' mt={[10]}>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                    </Select>
                                </Box>
                            </Flex>
                            <Text color={"#fff"} my={[6]}>Tranch size</Text>
							<Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Day Count'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"}my={[10]}  placeholder='Offer Type'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Offer Type'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                        <Text color={"#fff"} opacity={"0.9"} my={[8]}>Tranche terms</Text>
						<Button mt="10" p={["6"]} bg={"#fff"} color={"#000"} _hover={{bg:"#fff"}} w="100%" as={Link} to="/broker/dashboard/new-offer/summary">Next</Button>

                  </Box>
                  <Box bg="#fff" flex={2} p={[10]}>
                        <Text>Loan Offer summary</Text>
                        <Text>View your loan summary here</Text>
                  </Box>
              </Flex>
        </main>
        </OrderbookLayout>
      </>
  );
};

export default NewOfferTranche;
