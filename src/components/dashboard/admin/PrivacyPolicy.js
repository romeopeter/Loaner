import React from 'react';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { 
	Flex,
	Box,
	Heading,
} from '@chakra-ui/react';

const PrivacyPolicy = () => {
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
                <Heading flex={2} as="h1" size="lg" color={"#fff"}>Privacy Policy</Heading>
            </Flex>
            <Box mb={10} px={["4.2%"]}>
                <p>
                    By visiting www.orderbook.com you are accepting and consenting to the practices described in this policy.<br/>
                </p>
                <p>
                    When we use the term “Generation”, “we” and “us” below, we are referring to Orderbook LTD, a limited liability partnership formed in England as well as its affiliates throughout the world including: Orderbook US LLP, a United States based limited liability partnership.
                </p>
                <br/>
                <p>
                 Privacy Notice
                </p>
                <br/>   
                <ul style={{listStyleType: "square"}}>
                    <li style={{fontSize:"18px"}}>Privacy of your information</li>
                </ul>
                <br/>
                <p>
                We appreciate that you, or a third party on your behalf, has provided us with your personal information.  Obtaining personal information from our individual and corporate clients is central to our goal of providing exceptional service.  However, we understand that in receiving this information, you expect us to treat it in an appropriate manner.

                This policy is designed to provide you with further details on the type of information that we may collect about you, the purposes we might use that information for and the actions we take to safeguard your information.
                </p>
                <br/>
                <ul style={{listStyleType: "square"}}>
                    <li style={{fontSize:"18px"}}>Where we may collect information from</li>
                </ul>
                <br/>
                <p>
                    We will gather information from a number of sources.  Typically, it is primarily drawn from applications to open an account with Orderbook directly or with one of the funds operated by it (a “Orderbook Fund”). As a fund investor, you may but will not necessarily be a client of Generation directly.  If you are unclear as to your status as a client of Generation, please contact our General Counsel.
                </p>
                <br/>
                <p>
                    We will also collect information from you if you contact us directly, for example if you submit a query via our website. After an account is established and/or as our business relationship develops, we may gather further information from you as you transact with us or the Generation Funds or make servicing requests of us.
                </p>
                <br/>
                <p>
                    In addition to the information provided directly by you, we may gather information about you from third parties for the purposes of providing our services.  This includes other persons that you may instruct to assist you with your dealings with Generation or a Generation Fund, for example, your professional advisers, custodian or investment manager.  We may also seek information from credit and individual reporting agencies about you.  Third parties may be asked to undertake due diligence about you to assist us in respect of our responsibilities to combat financial crime, to ensure we are in compliance with applicable sanctions regimes, as well as helping us establish and maintain client relationships which we believe are in the best interests of both Generation and its clients.
                </p>
                <br/>
                <p>
                    In line with market practice in the financial services industry, we may record communications with you, including monitoring your e-mails.  We will do this in a proportionate manner and always in accordance with applicable laws and regulations designed to protect your privacy in this sensitive area. Typically we would not access your information regularly in this way.  Rather, it will be used for compliance, internal control or security purposes to help us comply with our legal and regulatory obligations and as evidence of transactions.
                </p>
                <br/>
                <p>
                    Lastly, we may use close circuit television and recording systems in our offices to protect our staff and physical assets.  The owners of the buildings we occupy may operate similar systems.  As a result, your physical image may be captured by us on our premises.
                </p>
                <br/>
            </Box>

        </main>
      </OrderbookLayout>
      </>
  );
};

export default PrivacyPolicy;
