import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
} from "@chakra-ui/react";
import PostModal from "../broker/modals/PostModal";
import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import SubNavBar from "./layouts/SubNavBar";
import { useCSVReader } from "react-papaparse";

const UploadInvestor = () => {
  const { CSVReader } = useCSVReader();
  const [data, setData] = useState({
    data: "",
    uploadType: "",
  });
  const [apidata, setApidata] = useState({});
  const [responsedata, setResponsedata] = useState({
    status: undefined,
    isLoading: undefined,
    error: undefined,
    modal: false,
  });

  const onUploadAccepted = (results) => {
    const CSVData = results.data;
    let componentIsMounted = true;

    // Checks if upload user role matches upload type data
    if (CSVData[1][1].toLowerCase() === data.uploadType) {

        let arrOfObjects = convertCSVToJSON(CSVData);
        arrOfObjects.shift();

        console.log(arrOfObjects)

        if (componentIsMounted) setApidata(arrOfObjects);
    
        if (componentIsMounted) {
            setData(state => ({
                ...state,
                data: CSVData
            }));
        }

        // End execution if true
        return;
    }

    componentIsMounted = false;

    // Render modal with error if false
    setResponsedata({
        ...responsedata,
        modal: true,
        error: "File data does not match upload type."
    });
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
      user_list: [apidata[0]],
    };
    axios
      .post("/v1/registration/sign_up/in_bulk/", userObject)
      .then((response) => {
        response.statusText === "Created" &&
          setResponsedata({
            ...response,
            modal: true,
            status: "Upload Successful!",
          });
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Network Error") {
          setResponsedata({
            ...responsedata,
            modal: true,
            error: "Network Error",
          });
        } else {
          setResponsedata({
            ...responsedata,
            modal: true,
            error:
              "Wrong data format or Data already exists, upload a different file.",
          });
        }
      });
  };

  const changeUploadType = (e) => {
    setData((state) => ({ 
        ...state, 
        uploadType: e.target.value 
    }));
}

  return (
    <div>
      <DocumentHead title="New Client" />
      <OrderbookLayout PageNav={NavMenu}>
        {/* Sub-nav bar */}
        <SubNavBar />

        <CSVReader onUploadAccepted={onUploadAccepted}>
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
          }) => (
            <div className="csvReader">
              
              <div className="bulk-upload-container flex justify-evenly mb-10 border-2 py-1 rounded-lg bg-slate-100">
                <h1 className="my-0">Bulk upload</h1>
                <Select
                  name="uploadType"
                  placeholder="Select upload type"
                  w="200px"
                  variant="outline"
                  onChange={(e) => changeUploadType(e)}
                >
                  <option value="client">Clients</option>
                  <option value="investor">Investors</option>
                  <option value="broker">Brokers</option>
                </Select>
              </div>
              <div className="csvReader-accept" {...getRootProps()}>
                {acceptedFile ? (
                  acceptedFile.name
                ) : (
                  <p
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      width: "200px",
                      margin: "auto",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Browse Files
                  </p>
                )}
              </div>
              <ProgressBar />
              {acceptedFile ? (
                <div>
                  <Table
                    variant="simple"
                    className="tableScroll csvReader-table"
                  >
                    <TableCaption>{acceptedFile.name}</TableCaption>
                    <Thead>
                      <Tr>
                        {data.data !== "" && data.data.length > 0
                          ? data.data[0].map((header, index) => {
                              return (<Th className="border" key={index}>{header}</Th>
                            );
                          })
                          :null}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {apidata.length > 0 &&
                        apidata.map((body, index) => {
                          return (
                            <Tr key={index}>
                              <Td className="border">{body.email}</Td>
                              <Td className="border">{body.role}</Td>
                              <Td className="border">
                                {body.confirm_password}
                              </Td>
                              <Td className="border">{body.password}</Td>
                              <Td className="border">{body.last_login}</Td>
                              <Td className="border">{body.is_superuser}</Td>
                              <Td className="border">{body.first_name}</Td>
                              <Td className="border">{body.last_name}</Td>
                              <Td className="border">{body.is_staff}</Td>
                              <Td className="border">{body.title}</Td>
                              <Td className="border">{body.date_of_birth}</Td>
                              <Td className="border">{body.organization}</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                  <div className="csvReader-cta">
                    <button
                      className="csvReader-cta--upload"
                      type="button"
                      onClick={upload}
                    >
                      Upload
                    </button>

                    <button
                      className="csvReader-cta--remove"
                      type="button"
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
        <PostModal responsedata={responsedata} closeModal={closeModal} />
      </OrderbookLayout>
    </div>
  );
};

export default UploadInvestor;
