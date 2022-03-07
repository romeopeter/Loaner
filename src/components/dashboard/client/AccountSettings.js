import React from 'react';
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';

// import Button from '../../Button';

const AccountSettings = () => {
    const pageName = 'Profile';
    return (
        <>
            <DocumentHead title={pageName} />
            <OrderbookLayout PageNav={NavMenu}>
                <section>
                    <div id='loan-invest-dropdown' className='bg-white px-16 py-10 shadow-md flex justify-start'>
                        <div id='loan' className='dropdown-container mr-5'>
                            Loans <i className='fa fa-caret-down' aria-hidden='true'></i>
                            <div id='load-dropdown'></div>
                        </div>
                        <div id='investor' className='dropdown-container'>
                            Investor <i className='fa fa-caret-down' aria-hidden='true'></i>
                            <div id='investor-dropdown'></div>
                        </div>
                    </div>
                    <Flex flexDirection={['column', 'column', 'row', 'row']}>
                        <Box bg='#555555' flex={['1']} pt={['10']}>
                            <Flex id='avatar' w={['15em']} h={'15em'} bg='#fff' margin={'auto'}>
                                {/* <Image/> */}
                            </Flex>
                        </Box>
                        <Flex flexDirection={['column']} flex={['3']} p={['10']}>
                            <h1 className='text-2xl font-bold mb-4'>Profile Settings</h1>
                            <Tabs align={'end'} colorScheme={'#002275'} minH={'70vh'} isLazy>
                                <TabList>
                                    <Tab>Personal Info</Tab>
                                    <Tab>Change Avatar</Tab>
                                    <Tab>Change Password</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <FormControl>
                                            <Flex mt={['10']} flexDirection={['column', 'row']}>
                                                <Box flex={'1'} mr={['0', '10']}>
                                                    <FormLabel htmlFor='email'>First Name</FormLabel>
                                                    <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                    <FormLabel htmlFor='email' mt={['10']}>
                                                        Mobile No
                                                    </FormLabel>
                                                    <Input
                                                        type='tel'
                                                        mb={['10']}
                                                        bgColor={'#C4C4C4'}
                                                        borderRadius={'0'}
                                                    />
                                                    <FormLabel htmlFor='text'>Country </FormLabel>
                                                    <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                </Box>
                                                <Box flex={'1'}>
                                                    <FormLabel htmlFor='name'>Last Name</FormLabel>
                                                    <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                    <FormLabel htmlFor='email' mt={['10']}>
                                                        Email{' '}
                                                    </FormLabel>
                                                    <Input
                                                        type='email'
                                                        mb={['10']}
                                                        bgColor={'#C4C4C4'}
                                                        borderRadius={'0'}
                                                    />
                                                    <FormLabel htmlFor='text'>State</FormLabel>
                                                    <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                </Box>
                                            </Flex>
                                            <Box mt={['10']}>
                                                <FormLabel htmlFor='address'>Address</FormLabel>
                                                <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                <FormLabel htmlFor='website'>Website Url </FormLabel>
                                                <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                            </Box>
                                            <Box mt={['10']}>
                                                <Heading
                                                    color={'#002276'}
                                                    fontSize='1.4em'
                                                    fontWeight='medium'
                                                    textAlign={'left'}
                                                >
                                                    Basic Information
                                                </Heading>
                                                <Flex flexDirection={['column', 'row']}>
                                                    <Box flex={'1'} mr={['0', '10']}>
                                                        <FormLabel htmlFor='address'>Date</FormLabel>
                                                        <Input type='date' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                    </Box>
                                                    <Box flex={'1'}>
                                                        <FormLabel htmlFor='website'>Gender </FormLabel>
                                                        <Input type='text' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </FormControl>
                                        <Button
                                            mt='10'
                                            p={['6']}
                                            bg={'#008060'}
                                            color={'#fff'}
                                            _hover={{ bg: '#008060' }}
                                        >
                                            Save changes
                                        </Button>
                                    </TabPanel>
                                    <TabPanel>
                                        <Flex justifyContent={'flex-start'} flexDirection={['column']}>
                                            <Box
                                                id='avatar-container'
                                                boxShadow={'2xl'}
                                                w={['10em']}
                                                h={['10em']}
                                            ></Box>
                                            <ButtonGroup color={'#fff'} mt={['10']}>
                                                <Button bg='#008060' borderRadius={'0'} _hover={{ bg: '#008060' }}>
                                                    Change Avatar
                                                </Button>
                                                <Button bg='#D82C0D' borderRadius={'0'} _hover={{ bg: '#D82C0D' }}>
                                                    Delete Avatar
                                                </Button>
                                            </ButtonGroup>
                                        </Flex>
                                        <Button
                                            bottom='-200'
                                            p={['6']}
                                            bg={'#008060'}
                                            color={'#fff'}
                                            _hover={{ bg: '#008060' }}
                                        >
                                            Save changes
                                        </Button>
                                    </TabPanel>
                                    <TabPanel>
                                        <Box mt={['10']}>
                                            <FormLabel htmlFor='password'>Old Password</FormLabel>
                                            <Input type='password' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                            <FormLabel htmlFor='website'>New Password </FormLabel>
                                            <Input type='password' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                            <FormLabel htmlFor='website'>Confirm New Password </FormLabel>
                                            <Input type='password' bgColor={'#C4C4C4'} borderRadius={'0'} />
                                        </Box>
                                        <Button
                                            bottom='-200'
                                            p={['6']}
                                            bg={'#008060'}
                                            color={'#fff'}
                                            _hover={{ bg: '#008060' }}
                                        >
                                            Update password
                                        </Button>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Flex>
                    </Flex>
                </section>
            </OrderbookLayout>
        </>
    );
};

export default AccountSettings;
