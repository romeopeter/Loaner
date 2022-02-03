import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { 
	Flex,
	Box,
	Heading,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

const Terms = () => {
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
                <Heading flex={2} as="h1" size="lg" color={"#fff"}>Terms of use</Heading>
            </Flex>
            <Box mb={10} px={["4.2%"]}>
                <p>
                    We know it's tempting to skip these Terms of Use, but it's important to establish what you can expect from us as you use Orderbook services and what we expect from you.<br/>
                </p>
                <p>
                    These Terms of Use reflect the way Orderbook works, the laws that apply to our company and certain things we've always believed to be true. As a result, these Terms of Use help define orderbook's relationship with you as you interact with our services. For example, these terms include the fillowing topic headings:
                </p>
                <br/>
                <ul style={{listStyleType: "square"}}>
                    <li >What you can expect from us, which describes how we provide and develop our services.</li>
                    <li>What we expect from you, which establishes certain rules for using our services.</li>
                    <li>
                        Content in Orderbook services, which describes the intellectual property rights to the content you find in our services - whether that content belongs to you, Orderbook, or others.
                    </li>
                    <li>
                        In case of problems or disagreements, which describes other legal rights you have and what to expect in case someone violates these terms.
                    </li>
                </ul>
                <br/>
                <p>
                    Understanding these terms is important because, to use our service, you must accept these terms.
                </p>
                <br/>
                <p>
                    Besides these terms, we also publish a privacy policy. Although it's not part of these terms, we encourage you to read it better understand how you can update, manage, export, and delete your information
                </p>
                <br/>
                <ButtonGroup color={"#fff"} mt={["10"]}>
                    <Button bg="#008060" borderRadius={"0"} _hover={{bg:"#008060"}}>Not right now...</Button>
                    <Button bg="#D82C0D" borderRadius={"0"} _hover={{bg:"#D82C0D"}}>I agree with terms</Button>
			    </ButtonGroup>

            </Box>
           
        </main>
      </OrderbookLayout>
      </>
  );
};

export default Terms;



