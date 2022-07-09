import React from "react";

export default function TestComponent() {
  return (
    <table className="bg-white table-auto w-full">
      <tbody>
        {approvedBids.length === 0 ? (
          <p
            className="py-5 text-center text-3xl text-gray-400 h-40 flex justify-center items-center"
            style={{ fontSize: "1.875rem" }}
          >
            No bid has been approved yet
            <i class="fa fa-times ml-2" aria-hidden="true"></i>
          </p>
        ) : (
          approvedBids.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="offer-name">
                  <div>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="checkbox rounded"
                      title="checkbox"
                    />
                    <img
                      src={offerImage}
                      alt=""
                      className="rounded h-10 w-10 hidden sm:block"
                    />
                    <span>{item["loan_request"]["tranche_name"]}</span>
                  </div>
                </td>
                <td className="offer-description">
                  <p className="text-center" style={{ textAlign: "center" }}>
                    {item["loan_request"]["tranche_name"]} description
                  </p>
                </td>
                <td className="table-btn">
                  <Button
                    title="View details"
                    buttonClass="bg-green-600 rounded-md hover:bg-white successful-btn"
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
