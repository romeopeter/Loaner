import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";

import { 
	Flex,
	Box,
	FormControl,
	Select,
	Heading,
	Button,
    Checkbox,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    ButtonGroup,
} from '@chakra-ui/react';

const SelectInvestor = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isList, onListOpen, onListClose } = useDisclosure()


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
                    <Heading as="h1" size="lg" mb="10" color={"#fff"}>Select Investors</Heading>
                    <Flex bg="#fff" flexDirection={["column", "row"]} p={[4]}>
                        <Flex borderRight={"1px solid #333"} textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Select all investors</p>
                        </Flex>
                        <Box textAlign={"center"} p={[2]}>
                            <p style={{fontSize: "16px", fontWeight:"bold"}}>Select category</p>
                        </Box>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Ethics</p>
                        </Flex>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Beverages &amp; Alcohol</p>
                        </Flex>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Agriculture &amp; Food</p>
                        </Flex>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Healthcare</p>
                        </Flex>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]}>
                            <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Building Construction</p>
                        </Flex>
                    </Flex>
                    <FormControl mt={["10"]}>
                        <Select  bgColor={"#C4C4C4"} w={["50%", "30%"]} borderRadius={"0"} border={"none"} placeholder='Select Investor'>
                            <option value='option1'>John Doe </option>
                            <option value='option2'>John Doe</option>
                            <option value='option3'>John Doe</option>
                        </Select>
                    </FormControl>
                    <Flex color={"#fff"} flexDirection={["column", "row"]} mt={[10]}>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]} >
                                <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Do you want to save and send as now open?</p>
                        </Flex>
                        <Flex  textAlign={"center"} justifyContent={"center"} alignItems={"center"} p={[2]} >
                                <Checkbox outline={"1px solid #333"} align={"center"} borderRadius={"2px"} mr={"4"}/> <p style={{fontSize: "16px"}}>Do you want to save and send as coming soon?</p>
                        </Flex>
                    </Flex>
                    
                </Flex>
                
                <Flex minH={["15vh"]} mt={[10]} p={[10]} justifyContent={"flex-end"}>
					<Button   mr={[10]}  py={["6"]} px={[6,10]} bg={"#C4C4C4"} color={"#000"} _hover={{bg:"#C4C4C4"}} borderRadius={"0"} onClick={onListOpen}>Save list as Favourite</Button>
					<Button   py={["6"]} px={[6,10]} bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} borderRadius={"0"} onClick={onOpen}>Publish Loan</Button>
                </Flex>
                <Modal size="sm"isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered borderRadius={["0px"]}>
                <ModalOverlay />
                <ModalContent >
                <ModalBody width={"70%"} margin={"auto"} pb={[8]}>
                    <ModalHeader>Congratulations</ModalHeader>
                    <Text>Your loan has been published</Text>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                    <ButtonGroup>
                        <Button borderRadius={["0"]} mt={[6]} as={Link} to="/broker/dashboard" variant='ghost' bg={"#c4c4c4"} color={"#000"} _hover={{bg:"#c4c4c4"}} >View Offers</Button>
                        <Button borderRadius={["0"]} mt={[6]} as={Link} to="/broker/dashboard" variant='ghost' bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} >Go home</Button>
                    </ButtonGroup>
                    </Flex>
                </ModalBody>

          
                </ModalContent>
            </Modal>
            <Modal size="sm"isList={isList} onClose={onListClose} blockScrollOnMount={false} isCentered borderRadius={["0px"]}>
                <ModalOverlay />
                <ModalContent >
                <ModalBody width={"70%"} margin={"auto"} pb={[8]}>
                    <ModalHeader>Add List to favourites</ModalHeader>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                    <ButtonGroup>
                        <Button borderRadius={["0"]} mt={[6]} as={Link} to="/broker/dashboard" variant='ghost' bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}} >+ New list</Button>
                    </ButtonGroup>
                    </Flex>
                </ModalBody>

          
                </ModalContent>
            </Modal>
            </main>
        </OrderbookLayout>
      </>
  );
};

export default SelectInvestor;
