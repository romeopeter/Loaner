import React, { useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import UploadInvestorModal from '../broker/modals/UploadInvestorModal';
import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { useCSVReader } from 'react-papaparse';

const UploadInvestor = () => {
    const { CSVReader } = useCSVReader();
    const [tabledata, setTabledata] = useState({});
    const [apidata, setApidata] = useState({});
    const [responsedata, setResponsedata] = useState({
        status: undefined,
        isLoading: undefined,
        error: undefined,
        modal: false,
    });

    const onUploadAccepted = (results) => {
        setTabledata(results.data);
        let arrOfObjects = convertCSVToJSON(results.data);
        arrOfObjects.shift();
        setApidata(arrOfObjects);
    };

    function convertCSVToJSON(str) {
        const titles = str[0];
        const rows = str;
        return rows.map((row) => {
            return titles.reduce((object, curr, i) => {
                object[curr] = row[i];
                return object;
            }, {});
        });
    }
    const closeModal = () => {
        setResponsedata({ ...responsedata, modal: false });
    };
    const upload = () => {
        setResponsedata({ ...responsedata, isLoading: true, modal: true });
        const userObject = {
            user_list: apidata,
        };
        axios
            .post('/v1/registration/sign_up/in_bulk/', userObject)
            .then((response) => {
                response.statusText === 'Created' &&
                    setResponsedata({ ...response, modal: true, status: 'Upload Successful!' });
            })
            .catch(
                (err) =>
                    err &&
                    setResponsedata({
                        ...responsedata,
                        modal: true,
                        error: 'Wrong data format or Data already exists, upload a different file.',
                    })
            );
    };

    return (
        <div>
            <DocumentHead title='New Client' />
            <OrderbookLayout PageNav={NavMenu}>
                <CSVReader onUploadAccepted={onUploadAccepted}>
                    {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                        <div className='csvReader'>
                            <h1>Bulk Uploads (Investor)</h1>
                            <div className='csvReader-accept' {...getRootProps()}>
                                {acceptedFile ? (
                                    acceptedFile.name
                                ) : (
                                    <p
                                        style={{
                                            color: 'grey',
                                            fontSize: '15px',
                                            width: '200px',
                                            margin: 'auto',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Browse Files
                                    </p>
                                )}
                            </div>
                            <ProgressBar />
                            {acceptedFile ? (
                                <div>
                                    <Table variant='simple' className='tableScroll csvReader-table'>
                                        <TableCaption>{acceptedFile.name}</TableCaption>
                                        <Thead>
                                            <Tr>
                                                {tabledata.length > 0
                                                    ? tabledata[0].map((header, index) => {
                                                          return (
                                                              <Th className='border' key={index}>
                                                                  {header}
                                                              </Th>
                                                          );
                                                      })
                                                    : null}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {apidata.length > 0 &&
                                                apidata.map((body, index) => {
                                                    return (
                                                        <Tr key={index}>
                                                            <Td className='border'>{body.email}</Td>
                                                            <Td className='border'>{body.role}</Td>
                                                            <Td className='border'>{body.confirm_password}</Td>
                                                            <Td className='border'>{body.password}</Td>
                                                            <Td className='border'>{body.last_login}</Td>
                                                            <Td className='border'>{body.is_superuser}</Td>
                                                            <Td className='border'>{body.first_name}</Td>
                                                            <Td className='border'>{body.last_name}</Td>
                                                            <Td className='border'>{body.is_staff}</Td>
                                                            <Td className='border'>{body.title}</Td>
                                                            <Td className='border'>{body.date_of_birth}</Td>
                                                            <Td className='border'>{body.organization}</Td>
                                                        </Tr>
                                                    );
                                                })}
                                        </Tbody>
                                    </Table>
                                    <div className='csvReader-cta'>
                                        <button className='csvReader-cta--upload' type='button' onClick={upload}>
                                            Upload
                                        </button>

                                        <button
                                            className='csvReader-cta--remove'
                                            type='button'
                                            {...getRemoveFileProps()}
                                        >
                                            Remove CSV
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
                </CSVReader>
                <UploadInvestorModal responsedata={responsedata} closeModal={closeModal} />
            </OrderbookLayout>
        </div>
    );
};

export default UploadInvestor;
// useEffect(() => {
//     axios
//         .get('https://order-book-online.herokuapp.com/v1/users/')

//         .then((response) => {
//             console.log(response);
//         })
//         .catch((err) => console.log(err));
// }, []);
