import React from 'react';

const BillsTable = ({ bills, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
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

export default BillsTable;
