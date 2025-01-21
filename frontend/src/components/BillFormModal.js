import React, { useState, useEffect } from 'react';

const BillFormModal = ({ isOpen, onClose, onSubmit, currentBill }) => {
    const [bill, setBill] = useState({
        description: '',
        category: '',
        amount: '',
        date: '',
    });

    useEffect(() => {
        if (currentBill) {
            setBill({
                ...currentBill,
                date: new Date(currentBill.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
            });
        } else {
            setBill({ description: '', category: '', amount: '', date: '' });
        }
    }, [currentBill]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBill({ ...bill, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(bill);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{currentBill ? 'Edit Bill' : 'Add Bill'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={bill.description}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded w-full mb-4"
                        required
                    />
                    <select
                        name="category"
                        value={bill.category}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded w-full mb-4"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="FoodNDining">Food & Dining</option>
                        <option value="Utility">Utility</option>
                        <option value="Shopping">Shopping</option>
                        <option value="PersonalCare">Personal Care</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                    </select>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={bill.amount}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded w-full mb-4"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={bill.date}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded w-full mb-4"
                        required
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BillFormModal;
