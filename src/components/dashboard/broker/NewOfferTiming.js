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



const NewOfferTiming = () => {
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
                  <Text color={"#fff"}>Timing</Text>
              </Flex>
              <Flex flexDirection={["column", "row"]}>
                  <Box bg="#555" flex={"1"} px={["5%"]} pb={[10]}>
                        <FormControl >
                            <Flex flexDirection={["column", "row"]} >
                                <Box flex={"1"} mr={[0,10]}>
                                    <Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Offer start"/>
							        <Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Allotment date" mt={[10]}/>
                                </Box>
                                <Box flex={"1"} >
                                    <Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Offer end"/>
							        <Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Settlement date" mt={[10]}/>
                                </Box>
                            </Flex>
							
							<Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Maturity Date" my={[10]}/>
							<Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Use of proceeds" />
							<Input  type='text' bgColor={"#C4C4C4"} borderRadius={"0"} placeholder="Tax consideration" my={[10]}/>
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} placeholder='Eligible Investors'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select  bgColor={"#C4C4C4"} borderRadius={"0"} border={"none"} my={[10]} placeholder='Rating'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                        <Text color={"#fff"} opacity={"0.9"} my={[8]}>Tranche terms</Text>
						<Button mt="10" p={["6"]} bg={"#fff"} color={"#000"} _hover={{bg:"#fff"}} w="100%" as={Link} to="/broker/dashboard/new-offer-tranche">Next</Button>

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

export default NewOfferTiming;
