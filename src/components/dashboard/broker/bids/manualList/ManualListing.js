import React, { useMemo, useCallback } from "react";

import AllBids from "./AllBids";
import { humanNumber } from "../../../../../utils/HRN";

export default function ManualListing({ tableStateObj, tableFuncObj }) {
  const { bidsData, paginationData } = tableStateObj;

  const tableColumn = useMemo(
    () => ["name", "tranche", "duration", "amount", "status"],
    []
  );

  console.log(paginationData);

  const tableData = useMemo(() => {
    return paginationData.map((data, index) => {
      return {
        id: data.id,
        name: `${data.owner.first_name} ${data.owner.last_name}`,
        tranche: data.loan_request.tranche_name,
        duration: `${data.loan_request.duration} days`,
        amount: humanNumber(data.amount),
        status: data.current_status,
      };
    });
  }, [paginationData]);

  const disableApproved = useCallback(() => bidsData.some((bid) => bid.status === "approved"),[bidsData]);

  return (
    <>
      <AllBids 
        tableData={tableData} 
        tableColumn={tableColumn} 
        tableStateObj={tableStateObj} 
        tableFuncObj={tableFuncObj}
        disableApproved={disableApproved}
      />
    </>
  );
}
