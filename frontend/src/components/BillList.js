import React from 'react';

const BillList = ({ bills, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Bills</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Description</th>
                        <th className="border px-4 py-2 text-left">Category</th>
                        <th className="border px-4 py-2 text-right">Amount</th>
                        <th className="border px-4 py-2 text-left">Date</th>
                        <th className="border px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill._id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{bill.description}</td>
                            <td className="border px-4 py-2">{bill.category}</td>
                            <td className="border px-4 py-2 text-right">₹{bill.amount}</td>
                            <td className="border px-4 py-2">{new Date(bill.date).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    onClick={() => onEdit(bill)}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(bill._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillList;
