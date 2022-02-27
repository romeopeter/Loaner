import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

import OrderbookLayout from '../../OrderbookLayout';
import DocumentHead from '../../DocumentHead';
import NavMenu from '../NavMenu';
import { useCSVReader } from 'react-papaparse';

const UploadInvestor = () => {
    const { CSVReader } = useCSVReader();
    const [data, setData] = useState({});

    const onUploadAccepted = (results) => {
        setData(results.data);
    };
    const upload = () => {
        // send data to api
    };
    return (
        <>
            <DocumentHead title='New Client' />
            <OrderbookLayout PageNav={NavMenu}>
                <CSVReader onUploadAccepted={onUploadAccepted}>
                    {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                        <>
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
                                    <>
                                        <Table variant='simple' className='tableScroll'>
                                            <TableCaption>{acceptedFile.name}</TableCaption>
                                            <Thead>
                                                <Tr>
                                                    {data.length > 0
                                                        ? data[0].map((header, index) => {
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
                                                <Tr>
                                                    {data.length > 0
                                                        ? data[1].map((body, index) => {
                                                              return (
                                                                  <Td className='border' key={index}>
                                                                      {body}
                                                                  </Td>
                                                              );
                                                          })
                                                        : null}
                                                </Tr>
                                                <Tr>
                                                    {data.length > 0
                                                        ? data[2].map((body, index) => {
                                                              return (
                                                                  <Td className='border' key={index}>
                                                                      {body}
                                                                  </Td>
                                                              );
                                                          })
                                                        : null}
                                                </Tr>

                                                <Tr>
                                                    {data.length > 0
                                                        ? data[3].map((body, index) => {
                                                              return (
                                                                  <Td className='border' key={index}>
                                                                      {body}
                                                                  </Td>
                                                              );
                                                          })
                                                        : null}
                                                </Tr>

                                                <Tr>
                                                    {data.length > 0
                                                        ? data[4].map((body, index) => {
                                                              return (
                                                                  <Td className='border' key={index}>
                                                                      {body}
                                                                  </Td>
                                                              );
                                                          })
                                                        : null}
                                                </Tr>

                                                <Tr>
                                                    <Td>...</Td>
                                                </Tr>
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
                                    </>
                                ) : null}
                            </div>
                        </>
                    )}
                </CSVReader>
            </OrderbookLayout>
        </>
    );
};

export default UploadInvestor;
