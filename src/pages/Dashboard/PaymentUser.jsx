import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';

const PaymentUser = () => {
    const { user } = useAuth();
    const [payment, setPayment] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/payments/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setPayment(data);
            })
    }, []);
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Payment History</h2>

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
                        </tr>
                    </thead>
                    <tbody>
                        {payment.map((payment, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                                <td className="px-4 py-2">{payment.medi}</td>
                                <td className="px-4 py-2">${payment.price}</td>
                                <td className="px-4 py-2">{payment.quantity}</td>
                                <td className="px-4 py-2">{payment.seller}</td>
                                <td className={`px-4 py-2 ${payment.status === 'paid' ? 'text-green-500' : 'text-orange-500'}`}>
                                    {payment.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentUser
