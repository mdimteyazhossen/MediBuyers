import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For auto-table support
import DatePicker from "react-datepicker"; // For date picker
import "react-datepicker/dist/react-datepicker.css"; // Styles for the date picker

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch sales data (mocking API call here)
  useEffect(() => {
    fetch("https://y-pearl-nu.vercel.app/payments") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setSalesData(data));
  }, []);

  // Filtering based on date range
  const filteredData = useMemo(() => {
    return salesData.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        (!startDate || saleDate >= new Date(startDate)) &&
        (!endDate || saleDate <= new Date(endDate))
      );
    });
  }, [salesData, startDate, endDate]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Medicine Name",
        accessor: "medi", // Use 'medi' as the key for medicine name
      },
      {
        Header: "Seller Email",
        accessor: "seller", // Use 'seller' for the seller email
      },
      {
        Header: "Buyer Email",
        accessor: "buyerEmail", // Use 'buyerEmail' for the buyer email
      },
      {
        Header: "Total Price",
        accessor: (row) => (row.price * row.quantity).toFixed(2), // Calculating total price
      },
      {
        Header: "Date",
        accessor: "date", // Use 'date' field for the date
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format date nicely
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: filteredData,
  });

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Date"],
      ],
      body: rows.map((row) => {
        prepareRow(row);
        return row.cells.map((cell) => cell.value); // Get row data
      }),
    });
    doc.save("sales_report.pdf"); // Download the PDF
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sales Report</h2>

      {/* Date range filter */}
      <div className="mb-4">
        <label className="mr-4">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border p-2"
        />

        <label className="mx-4">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border p-2"
        />
      </div>

      {/* Table to display sales data */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-6">
        <table className="table w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-4 py-2 text-sm font-medium text-gray-600"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="px-4 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Button to download PDF */}
      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default SalesReport;
