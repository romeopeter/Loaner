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
    ButtonGroup,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';



const LoanSummary = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                  <Heading as="h1" size="lg" color={"#fff"}>New Client</Heading>
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
						<Button mt="10" p={["6"]} bg={"#fff"} color={"#000"} _hover={{bg:"#fff"}} w="100%" as={Link} to="/broker/dashboard/new-offer/summary">View Summary</Button>

                  </Box>
                
                  <Box bg="#fff" flex={2} >
                    <Box  bg="#C4C4C4" w={["40px"]} h={["40px"]} textAlign={"center"}>
                        <Text as={Link} to="/broker/dashboard/new-offer-tranche"><i className="fa fa-arrow-left" aria-hidden="true"></i></Text>
                    </Box>
                    <Box w={["80%"]} margin={["auto"]} p={[10]} >
                    <Text fontSize="30px"fontWeight={"bold"}>Loan Offer summary</Text>
                    <Box mt={[8]}>
                        <Text >Name</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>Olamide Attah</Text>
                    </Box>
                    <Box mt={[6]}>
                        <Text >Type of offer</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>Commercial Paper</Text>
                    </Box>
                    <Box mt={[6]}>
                        <Text >Loan amount</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>NGN 5 billion</Text>
                    </Box>
                    <Box mt={[6]}>
                        <Text >Tranche</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>Tranche 1</Text>
                    </Box>
                    <Box mt={[6]}>
                        <Text >Tenor</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>180 Days</Text>
                    </Box>
                    <Box mt={[6]}>
                        <Text >Size</Text>
                        <Text fontWeight={"bold"} borderBottom={"1px solid black"}>NGN 5 billion</Text>
                    </Box>
                    <Flex mt={[10]} flex={"1"}>
                        <Box  borderRight={"1px solid #333"} >
                            <Text >Offer 0pens</Text>
                            <Text fontWeight={"bold"} pr={[8]}>15/01/2022</Text>
                        </Box>
                        <Box mx={[6]} borderRight={"1px solid #333"} >
                            <Text >Offer closes</Text>
                            <Text fontWeight={"bold"} pr={[8]}>25/01/2022</Text>
                        </Box>
                        <Box  borderRight={"1px solid #333"} >
                            <Text >Setlement date</Text>
                            <Text fontWeight={"bold"} pr={[8]}>10/02/2022</Text>
                        </Box>
                    </Flex>
                    <ButtonGroup spacing={6} w="100%">
						<Button mt="10" p={["6"]} bg={"#C4C4C4"} color={"#000"} _hover={{bg:"#C4C4C4"}} w="100%" as={Link} to="/broker/dashboard/new-offer/summary">Save as draft</Button>
						<Button mt="10" p={["6"]} bg={"#002276"} color={"#fff"} _hover={{bg:"#002276"}}  w="100%" as={Link} to="/broker/dashboard/new-offer/summary">Share</Button>
                    </ButtonGroup>
					<Button mt="6" p={["6"]} bg={"#AAAAAA"} color={"#fff"} _hover={{bg:"#AAAAAA"}}  w="100%" onClick={onOpen}>Publish</Button>
                    </Box>
                    
                  </Box>
              </Flex>
              <Modal size="sm"isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered borderRadius={["0px"]}>
                <ModalOverlay />
                <ModalContent >
                <ModalBody width={"70%"} margin={"auto"} pb={[8]}>
                    <ModalHeader>Congratulations</ModalHeader>
                    <Text>Your loan has been published</Text>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                    <Button mt={[6]} as={Link} to="/broker/dashboard" variant='ghost' bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} >Go home</Button>
                    </Flex>
                </ModalBody>

          
                </ModalContent>
            </Modal>
        </main>
        </OrderbookLayout>
        
      </>
  );
};

export default LoanSummary;
