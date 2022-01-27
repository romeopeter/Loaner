import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { Link } from "react-router-dom";

import { 
	Flex,
	Box,
	FormControl,
	FormLabel,
    Input,
	Select,
	Heading,
	Button,
} from '@chakra-ui/react';

const NewClientSuccess = () => {
  return (
      <>
      <DocumentHead title="NeN Client" />
        <OrderbookLayout PageNav={NavMenu}>
            <div
                id="loan-invest-dropdoNn"
                className="bg-Nhite px-16 py-10 shadoN-md flex justify-start"
            >
                <div id="loan" className="dropdoNn-container mr-5">
                    Clients{" "}
                    <i
                        className="fa fa-caret-doNn"
                        aria-hidden="true"
                    ></i>
                    <div id="load-dropdoNn"></div>
                </div>
                <div id="loan" className="dropdoNn-container mr-5">
                    Loans{" "}
                    <i
                        className="fa fa-caret-doNn"
                        aria-hidden="true"
                    ></i>
                    <div id="load-dropdoNn"></div>
                </div>
                <div id="investor" className="dropdoNn-container">
                    Investor{" "}
                    <i
                        className="fa fa-caret-doNn"
                        aria-hidden="true"
                    ></i>
                    <div id="investor-dropdoNn"></div>
                </div>
            </div>
            <main>
                <Flex flexDirection={"column"} bg="#555" px={["4.2%"]} py={[10]}>
                    <Heading as="h1" size="lg" mb="10" color={"#fff"}>New Client</Heading>
                    
                </Flex>
                <Box minH={["15vh"]} mt={[10]} p={[10]}>
					<Button as={Link} to="/broker/dashboard/allclients" float={"right"}  py={["6"]} px={[6,10]} bg={"#008060"} color={"#fff"} _hover={{bg:"#008060"}}>Create Client</Button>
                </Box>
            </main>
        </OrderbookLayout>
      </>
  );
};

export default NewClientSuccess;
