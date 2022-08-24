import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Center, Divider } from "@chakra-ui/react";

import OrderbookLayout from "../../../OrderbookLayout";
import DocumentHead from "../../../DocumentHead";
import NavMenu from "../../NavMenu";
import Pagination from "../pagination/Pagination";
import SubNavBar from "../layouts/SubNavBar";
import bidRejected from "../../../../assets/images/bidRejected.png";

import BidsModal from "../../broker/modals/BidsModal";
import DeleteModal from "../../broker/modals/DeleteModal";
import DisagreeModal from "../modals/DisagreeModal";
import EditModal from "../modals/EditModal";
import SelectModal from "../modals/SelectModal";

import Prorated from "../bids/Prorated";
import OrderedListing from "../bids/OrderedListing";
import ManualListing from "./manualList/ManualListing";
import DropRejectedBids from "./manualList/DropRejectedBids";

import { getBid } from "../../../../services/bid.service";
import { getOffer } from "../../../../services/loan.service";

import { humanNumber } from "../../../../utils/HRN";

let PageSize = 10;
const Bids = () => {
  let alert = useAlert();
  let { id } = useParams();

  // Offer data
  const [loanOffer, setLoanOffer] = useState();

  // Fetched bids data
  const [bidsData, setBidsData] = useState([]);
  const [dataState, setDataState] = useState({
    isLoading: true,
    error: undefined,
  });

  // Checkbox
  const [checkedBid, setCheckedBid] = useState([]);

  // Disagree modal state
  const [disModal, setDisModal] = useState({
    modal: false,
    isLoading: undefined,
    error: undefined,
  });

  // Edit Modal
  const [editModal, setEditModal] = useState({ modal: false });

  //  Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  //  delete modal state
  const [deleteModal, setDeleteModal] = useState({
    modal: false,
    data: undefined,
    isLoading: undefined,
  });

  // Approve & Reject modal success state
  const [state, setState] = useState({ modal: false, successState: false });

  // Select Filter state
  const [selectFilter, setSelectFilter] = useState({
    value: undefined,
    modal: false,
    isLoading: undefined,
  });

  // notification state
  const [notification, setNotification] = useState({
    isLoading: undefined,
    dataApproved: undefined,
    dataRejected: undefined,
    dataDisagree: undefined,
    dataEditted: undefined,
  });

  // Handle status update approved
  const updatedataApproved = useCallback(() => {
    let data = notification.dataApproved;
    setNotification({
      ...notification,
      isLoading: true,
    });

    const detail = {
      status: {
        name: "approved",
        message: "Please take heed to this",
      },
    };

    data &&
      axios
        .patch(`v1/bids/${data.id}/`, detail)
        .then((res) => {
          res.data.current_status &&
            setNotification({
              ...notification,
              isLoading: false,
            });
        })
        .catch(
          (err) => err && setNotification({ ...notification, isLoading: true })
        );
  }, [notification]);

  // Handle status update approved
  const updatedataRejected = useCallback(() => {
    let data = notification.dataRejected;
    setNotification({
      ...notification,

      isLoading: true,
    });

    const detail = {
      status: {
        name: "rejected",
        message: "Rejected",
      },
    };
    data &&
      axios
        .patch(`v1/bids/${data.id}/`, detail)
        .then((res) => {
          console.log(res);
          res.data.current_status &&
            setNotification({
              ...notification,

              isLoading: false,
            });
        })
        .catch(
          (err) => err && setNotification({ ...notification, isLoading: true })
        );
  }, [notification]);

  // handle disagree form
  const disagreeForm = useCallback(
    (values) => {
      setDisModal({ isLoading: true, ...disModal });
      let data = notification.dataDisagree;
      const detail = {
        status: {
          name: "disagreed",
          message: values.textArea,
        },
      };
      data &&
        axios
          .patch(`v1/bids/${data.id}/`, detail)
          .then((response) => {
            console.log(response);
            response.statusText === "OK" &&
              setDisModal({ ...disModal, isLoading: false });
          })
          .catch((err) => {
            err &&
              setDisModal({ isLoading: false, error: "Something Went Wrong" });
          });
    },
    [notification.dataDisagree, disModal]
  );

  // delete bid
  const handleDelete = () => {
    setDeleteModal({ ...deleteModal, isLoading: true });
    let data = deleteModal.data;
    axios
      .delete(`v1/bids/${data.id}/`, data)
      .then((response) => {
        response.status === 204 &&
          setDeleteModal({ ...deleteModal, modal: false, isLoading: false });
      })
      .catch((error) => {
        if (error) {
          setDeleteModal({ ...deleteModal, modal: false, isLoading: false });
          alert.error("You are not allowed to delete this bid");
        }
      });
  };

  // console.log(bidsData);
  const handleApply = useCallback(
    (e) => {
      e.preventDefault();
      if (selectFilter.value === undefined) {
        setSelectFilter({ modal: false });
      } else
        setSelectFilter({ ...selectFilter, modal: true, successState: true });
    },
    [selectFilter]
  );

  // Checkbox action start
  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    value === "Select action"
      ? setSelectFilter({ value: undefined })
      : setSelectFilter({ value });
  };

  const handleCheck = (e, data) => {
    const { name, checked } = e.target;

    if (checked) {
      if (name === "allSelect") {
        setCheckedBid(bidsData);
      } else {
        setCheckedBid([...checkedBid, data]);
      }
    } else {
      if (name === "allSelect") {
        setCheckedBid([]);
      } else {
        let temp = checkedBid.filter((item) => item.id !== data.id);
        setCheckedBid(temp);
      }
    }
  };

  const className = checkedBid.length < 2 ? "disable" : "";

  let disableApproved;
  bidsData.some((bid) => {
    return (disableApproved = bid.current_status === "approved");
  });

  // checbox action end

  //  Call Fetched data
  useEffect(() => {
    let componentIsMounted = true;

    (async function getOfferBid() {
      try {
        const res = await getBid(id);

        if (res.statusText === "OK") {
          if (componentIsMounted) {
            setBidsData(res.data);
            setDataState({ error: "", isLoading: false });
          }
        }
      } catch (err) {
        if (err.message === "Network Error") {
          setDataState({ error: "Network Error", isLoading: false });
        } else {
          setDataState({
            error: "Something went wrong, please try again.",
            isLoading: false,
          });
        }
      }
    })();
    return () => (componentIsMounted = false);
  }, [
    updatedataApproved,
    updatedataRejected,
    disagreeForm,
    deleteModal,
    editModal,
    id,
    handleApply,
  ]);

  useEffect(() => {
    let componentIsMounted = true;

    (async function () {
      const loanRequest = bidsData[0]["loan_request"];
      const dealType =
        loanRequest.deal_type === "Commercial Paper" ? "cp" : "bond";

      try {
        const res = await getOffer(dealType, id);

        if (res.statusText === "OK") {
          if (componentIsMounted) setLoanOffer(res.data);
        }
      } catch (err) {
        if (err.message === "Network Error") {
          setDataState({ error: "Network Error", isLoading: false });
        } else {
          setDataState({
            error: "Something went wrong, please try again.",
            isLoading: false,
          });
        }
      }
    })();

    return () => (componentIsMounted = false);
  }, [bidsData, id]);

  // pagination
  const paginationData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return bidsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, bidsData]);

  // TABS
  const [bidsTab, setBidsTab] = useState({
    prorated: true,
    manual: false,
    ordered: false,
  });
  const prorated = () => {
    setBidsTab({ manual: false, ordered: false, prorated: true });
    setBidsData(bidsData);
  }; 
  const manualListing = () => {
    setBidsTab({ ordered: false, prorated: false, manual: true });
    setBidsData(bidsData);
  };

  const orderedListing = () => {
    setBidsTab({ manual: false, prorated: false, ordered: true });
    setBidsData(bidsData);
  };

  const proratedActive = bidsTab.prorated ? "active" : "";
  const manualActive = bidsTab.manual ? "active" : "";
  const orderedActive = bidsTab.ordered ? "active" : "";

  // Modals
  const openModalApproved = (data) => {
    setState({ modal: true, successState: true });
    setNotification({ ...notification, dataApproved: data });
  };
  const openModalRejected = (data) => {
    setState({ modal: true, successState: false });
    setNotification({ ...notification, dataRejected: data });
  };
  const openModalEdit = (data) => {
    setEditModal({ modal: true });
    setNotification({ ...notification, dataEditted: data });
  };
  const closeModalEdit = () => {
    setEditModal({ modal: false });
  };
  const closeModal = () => {
    setState({ ...state, modal: false });

    setTimeout(() => {
      setNotification({
        ...notification,
        dataApproved: undefined,
        dataRejected: undefined,
        isLoading: undefined,
      });
    }, 1000);

    setCheckedBid([]);
  };
  const openModalDisagree = (data) => {
    setDisModal({ modal: true });
    setNotification({ ...notification, dataDisagree: data });
  };
  const closeModalDisagree = () => {
    setDisModal({ modal: false });
  };
  const openDeleteModal = (data) => {
    setDeleteModal({ modal: true, data: data });
  };
  const closeDeleteModal = () => {
    setDeleteModal({ modal: false });
  };
  const closeSelectModal = () => {
    setSelectFilter({ ...selectFilter, modal: false });

    setTimeout(() => {
      setSelectFilter({ isLoading: undefined, value: undefined });
    }, 1000);
    setCheckedBid([]);
  };

  return (
    <div>
      <DocumentHead title="Bids" />
      <OrderbookLayout PageNav={NavMenu}>
        {/* Sub-navbar */}
        <SubNavBar />

        <main className="bids">
          <div className="bids-heading">
            <h1>
              {" "}
              {bidsData.length > 0 && bidsData[0].loan_request.tranche_name}
            </h1>

            <div className="bids-heading--links">
              <Center className="bids-heading--mod">
                <button onClick={prorated} className={`${proratedActive}`}>
                  Prorated
                </button>
                <Divider orientation="vertical" />
                <button onClick={manualListing} className={`${manualActive}`}>
                  Manual Listing
                </button>
                <Divider orientation="vertical" />
                <button onClick={orderedListing} className={`${orderedActive}`}>
                  Ordered Listing
                </button>
              </Center>
            </div>
          </div>

          <div className="expected-offer-amount">
            {(() => {
              if (loanOffer !== undefined) {
                const amount =
                  loanOffer.tranche_id.size.minimum_subscription.amount;

                return (
                  <div className="mb-5">
                  <p
                    className="text-center pt-5"
                    style={{ fontSize: 17, color: "#555" }}
                  >
                    Amount expected by client: NGR {humanNumber(amount)}
                  </p>
                  <span className="block border-b border-gray-300 my-0 mx-auto w-96"></span>
                  </div>
                );
              }
            })()}
          </div>

          <div className={`mid-nav ${bidsTab.manual && "hidden"}`}>
            <div className={`${className} mid-nav--dropdown`}>
              <select onChange={handleChange}>
                <option defaultValue={"Select action"}> Select action</option>
                <option value="approve all">Approve all</option>
                <option value="reject all">Reject all</option>
              </select>

              <button
                className="mid-nav-button"
                title="Select an action to apply"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>

            <div style={{ display: "flex" }}>
              <Link to={`/broker/dashboard/bids/payment/${id}`}>
                <button
                  disabled={!disableApproved}
                  className="mid-nav--viewPayment"
                >
                  View Payment
                </button>
              </Link>
              <Link
                to={`/broker/dashboard/bids/addnewbid/${id}`}
                style={{ marginLeft: "20px" }}
              >
                <button className="mid-nav--addNewBid">Add New Bid</button>
              </Link>
            </div>
          </div>

          <section style={{ paddingBottom: "10%" }}>
            <Box>
              <div className="tableScroll">
                {(() => {
                  if (dataState.isLoading) {
                    return (
                      <p
                        className="loader"
                        style={{ margin: "100px auto" }}
                      ></p>
                    );
                  }

                  if (dataState.error) {
                    return (
                      <p className="responseMessage">
                        <img
                          alt=""
                          src={bidRejected}
                          style={{ height: "30px", width: "30px" }}
                        />
                        {dataState.error}
                      </p>
                    );
                  }

                  if (bidsData.length === 0) {
                    return (
                      <p
                        className="responseMessage"
                        style={{
                          alignItems: "center",
                          margin: "100px auto",
                        }}
                      >
                        No bids available. Add a new bid.
                      </p>
                    );
                  }

                  if (bidsTab.prorated) {
                    return (
                      <Prorated
                        tableStateObj={{
                          bidsData,
                          checkedBid,
                          paginationData,
                          loanOffer,
                        }}
                        tableFuncObj={{
                          handleCheck,
                          openModalApproved,
                          openModalRejected,
                          openModalDisagree,
                          openModalEdit,
                          openDeleteModal,
                        }}
                      />
                    );
                  }

                  if (bidsTab.ordered) {
                    return (
                      <OrderedListing
                        tableStateObj={{ bidsData, checkedBid, paginationData }}
                        tableFuncObj={{
                          handleCheck,
                          openModalApproved,
                          openModalRejected,
                          openModalDisagree,
                          openModalEdit,
                          openDeleteModal,
                        }}
                      />
                    );
                  }
                })()}
              </div>

              {(() => {
                if (bidsTab.manual) {
                  return (
                    <>
                    <p className="text-center py-3 text-lg text-gray-500">Drag the bids you want to reject to table below.</p>
                    <div
                      className="tableScroll shadow-sm mx-5 py-5 p-2 rounded-md border-2 border-blue-600"
                      style={{ height: 350 }}
                    >
                      <ManualListing
                        tableStateObj={{
                          bidsData,
                          checkedBid,
                          paginationData,
                          loanOffer,
                        }}
                        tableFuncObj={{
                          handleCheck,
                          openModalApproved,
                          openModalRejected,
                          openModalDisagree,
                          openModalEdit,
                          openDeleteModal,
                        }}
                      />
                    </div>
                    </>
                  );
                }
              })()}

              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={bidsData.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />

              {(() => {
                if (bidsTab.manual) {
                  return <DropRejectedBids bidsData={bidsData} />
                }
              })()}
            </Box>

            <BidsModal
              closeModal={closeModal}
              state={state}
              notification={notification}
              updatedataApproved={updatedataApproved}
              updatedataRejected={updatedataRejected}
              bidsData={bidsData}
              selectFilter={selectFilter}
            />
            <DisagreeModal
              disModal={disModal}
              closeModalDisagree={closeModalDisagree}
              notification={notification}
              disagreeForm={disagreeForm}
            />
            <DeleteModal
              handleDelete={handleDelete}
              closeDeleteModal={closeDeleteModal}
              deleteModal={deleteModal}
            />
            <EditModal
              data={notification.dataEditted}
              closeModal={closeModalEdit}
              editModal={editModal}
              notification={notification}
            />
            <SelectModal
              selectFilter={selectFilter}
              setSelectFilter={setSelectFilter}
              closeSelectModal={closeSelectModal}
              bidsData={bidsData}
              checkbox={checkedBid}
            />
          </section>
        </main>
      </OrderbookLayout>
    </div>
  );
};

export default Bids;
