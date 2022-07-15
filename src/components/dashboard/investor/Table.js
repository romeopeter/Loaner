import React from "react";
import { useTable } from "react-table";

import Button from "../../Button";
import offerImage from "../../../assets/images/offerImage.png";

export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table className="bg-white table-fixed w-full" {...getTableProps()}>
      <thead className="bg-gray-300">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header") === "Name" && (
                  <div className="w-full">
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="checkbox rounded float-left ml-5"
                      title="checkbox"
                    />
                    <h6 className="inline-block">{column.render("Header")}</h6>
                  </div>
                )}
                {column.render("Header") === "Description" &&
                  column.render("Header")}
                {column.render("Header") === "TableBtn" && ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={`${cell.column.id === "name" && "offer-name"} ${
                      cell.column.id === "description" && "offer-description"
                    } ${cell.column.id === "tableBtn" && "offer-btn"}`}
                    key={index}
                  >
                    {cell.column.id === "name" && (
                      <div className="flex items-center">
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
                        <h6>{cell.render("Cell")}</h6>
                      </div>
                    )}

                    {cell.column.id === "description" && (
                      <p className="text-left">{cell.render("Cell")}</p>
                    )}

                    {cell.column.id === "tableBtn" && (
                      <div className="flex justify-center items-center">
                        <Button
                         title="View details"
                         link={`/investor/dashboard/offers/${
                           cell.render("Cell").props.value
                         }/open`}
                         buttonClass="bg-green-600 rounded hover:bg-white successful-btn"
                        />
                     </div>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
