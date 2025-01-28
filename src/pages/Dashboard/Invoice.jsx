import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import useAuth from '../../hooks/useAuth'; // Assuming this hook gives the logged-in user's data

const InvoicePage = () => {
  const { user } = useAuth(); // Assuming user data is available from useAuth hook
  const [invoiceData, setInvoiceData] = useState([]);

  // Fetch invoice data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/payments/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Invoice Data: ", data); // Debugging line to check data
        setInvoiceData(data);  // Set the fetched data to the state
      })
      .catch((error) => {
        console.error('Error fetching invoice data:', error);
      });
  }, [user.email]);

  // Function to generate and download the PDF
  const generatePDF = () => {
    if (invoiceData.length === 0) return; // Don't generate PDF if no data

    const doc = new jsPDF();

    // Title of the Invoice
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Invoice', 14, 70);

    // Buyer Information
    doc.setFontSize(14);
    doc.text(`Buyer: ${user.name || 'John Doe'}`, 14, 80);
    doc.text(`Email: ${user.email || 'email@example.com'}`, 14, 90);

    // Add a separator line
    doc.setLineWidth(0.5);
    doc.line(14, 95, 200, 95);

    // Table Header
    const startY = 105;
    doc.setFontSize(12);
    doc.text('Item', 14, startY);
    doc.text('Price', 100, startY);
    doc.text('Quantity', 140, startY);
    doc.text('Total', 180, startY);

    // Table rows with items data
    let yOffset = startY + 10;
    let grandTotal = 0;

    invoiceData.forEach((payment) => {
      const total = payment.price * payment.quantity;
      doc.text(payment.medi, 14, yOffset);  // Item Name
      doc.text(`$${payment.price}`, 100, yOffset);  // Item Price
      doc.text(`${payment.quantity}`, 140, yOffset);  // Item Quantity
      doc.text(`$${total}`, 180, yOffset);  // Total for this item
      grandTotal += total;
      yOffset += 10;  // Move to next row
    });

    // Total Amount Section
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: $${grandTotal}`, 14, yOffset + 10);

    // Add footer line
    doc.setLineWidth(0.5);
    doc.line(14, yOffset + 20, 200, yOffset + 20);

    // Download the PDF
    doc.save('invoice.pdf');
  };

  if (invoiceData.length === 0) {
    return <p>Loading invoice data...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="invoice-page bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <img
              src="https://i.ibb.co.com/CM47mvS/Screenshot-2025-01-28-144553.png" // Update this with your actual logo path
              alt="Website Logo"
              className="w-16 h-16"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Invoice</h2>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">Buyer Information:</p>
          <p>
            <strong>Name:</strong> {user.name || 'John Doe'}
          </p>
          <p>
            <strong>Email:</strong> {user.email || 'email@example.com'}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">Purchased Items:</p>
          <table className="table w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((payment, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{payment.medi}</td>
                  <td className="border px-4 py-2">${payment.price}</td>
                  <td className="border px-4 py-2">{payment.quantity}</td>
                  <td className="border px-4 py-2">${payment.price * payment.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">
            Total Amount: ${invoiceData.reduce((total, payment) => total + payment.price * payment.quantity, 0)}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={generatePDF}
            className="btn bg-gray-600 px-6 py-2 text-white rounded-full"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
