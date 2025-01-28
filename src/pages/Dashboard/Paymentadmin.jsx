import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for API calls

const PaymentAdmin = () => {
    const [payments, setPayments] = useState([]);  // State to hold payment data

    // Fetch payment data when the component mounts
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://y-pearl-nu.vercel.app/payments');
                setPayments(response.data); // Set the payments state
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    // Function to update payment status to 'paid'
    const updatePaymentStatus = async (paymentId) => {
        try {
            const response = await axios.put(`https://y-pearl-nu.vercel.app/payment/admin/${paymentId}`, { status: 'paid' });
            console.log(response.data.message);  // Log success message
            // Update the payment status in the local state after the update
            setPayments((prevPayments) =>
                prevPayments.map((payment) =>
                    payment._id === paymentId ? { ...payment, status: 'paid' } : payment
                )
            );
        } catch (error) {
            console.error('Error updating payment status:', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Payment Management</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-sm font-medium text-gray-600">Transaction ID</th>
                            <th className="text-left text-sm font-medium text-gray-600">Item</th>
                            <th className="text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="text-left text-sm font-medium text-gray-600">Quantity</th>
                            <th className="text-left text-sm font-medium text-gray-600">Seller</th>
                            <th className="text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={`${payment.transactionId}-${index}`}>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                                <td className="px-4 py-2">{payment.medi}</td>
                                <td className="px-4 py-2">${payment.price}</td>
                                <td className="px-4 py-2">{payment.quantity}</td>
                                <td className="px-4 py-2">{payment.seller}</td>
                                <td className={`px-4 py-2 ${payment.status === 'paid' ? 'text-green-500' : 'text-orange-500'}`}>
                                    {payment.status}
                                </td>
                                <td className="px-4 py-2">
                                    {payment.status === 'pending' && (
                                        <button
                                            onClick={() => updatePaymentStatus(payment._id)} // Call function on button click
                                            className="btn bg-gray-600 rounded-lg text-white px-4 py-2"
                                        >
                                            Accept Payment
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentAdmin;
