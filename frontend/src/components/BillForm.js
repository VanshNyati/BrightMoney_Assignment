import React, { useState, useEffect } from 'react';

const BillForm = ({ onSubmit, currentBill, setCurrentBill }) => {
    const [bill, setBill] = useState({
        description: '',
        category: '',
        amount: '',
        date: '',
    });

    useEffect(() => {
        if (currentBill) {
            setBill(currentBill);
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
        setCurrentBill(null);
        setBill({ description: '', category: '', amount: '', date: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">{currentBill ? 'Edit Bill' : 'Add Bill'}</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={bill.description}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded w-full"
                    required
                />
                <select
                    name="category"
                    value={bill.category}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded w-full"
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
                    className="border px-4 py-2 rounded w-full"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={bill.date}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded w-full"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {currentBill ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

export default BillForm;
