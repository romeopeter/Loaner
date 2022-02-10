import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";

import { 
	Flex,
	Text,
	Heading,
	Button,
    ButtonGroup,
    Box
} from '@chakra-ui/react';

const NewClientSave = () => {
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
                    <Heading as="h1" size="lg" mb="10" color={"#fff"}>New Client</Heading>
                    <Text color={"#fff"}>You have successfully created a new client . The details are below:</Text>
                    <Flex bg={"#fff"} p={[6]}>
                        <Box flex={1} p={[2]} borderRight={"1px solid #333"} >
                            <p style={{fontSize: "14px", }}>Client type</p>
                            <p style={{fontSize: "18px", fontWeight:"bold"}}>Client</p>
                        </Box>
                        <Box flex={1} p={[2]} borderRight={"1px solid #333"} >
                            <p style={{fontSize: "14px", }}>Firstname</p>
                            <p style={{fontSize: "18px", fontWeight:"bold"}}>Olamide</p>
                        </Box>
                        <Box flex={1} p={[2]} borderRight={"1px solid #333"} >
                            <p style={{fontSize: "14px", }}>Lastname</p>
                            <p style={{fontSize: "18px", fontWeight:"bold"}}>Attah</p>
                        </Box>
                        <Box flex={1} p={[2]} borderRight={"1px solid #333"} >
                            <p style={{fontSize: "14px", }}>Company</p>
                            <p style={{fontSize: "18px", fontWeight:"bold"}}>Rice value chain</p>
                        </Box>
                        <Box flex={1} p={[2]} >
                            <p style={{fontSize: "14px", }}>Email address</p>
                            <p style={{fontSize: "18px", fontWeight:"bold"}}>rcv@gmail.com</p>
                        </Box>
                    </Flex>
                    <ButtonGroup mt={[10]} p={[10]}>
                        <Button borderRadius={0} as={Link} to="/broker/dashboard/allclients" float={"right"}  py={["6"]} px={[6,10]} bg={"#555"} border={"1px solid #fff"} color={"#fff"} _hover={{bg:"#fff", color:"#555"}}>View all clients</Button>
                        <Button borderRadius={0} as={Link} to="/broker/dashboard/allclients" float={"right"}  py={["6"]} px={[6,10]} bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}}>Go home</Button>
                    </ButtonGroup>
                    
                </Flex>
               
            </main>
        </OrderbookLayout>
      </>
  );
};

export default NewClientSave;
