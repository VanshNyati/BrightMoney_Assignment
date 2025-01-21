import React from 'react';

const Navbar = ({ onFilterClick, onAddClick }) => {
    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Bill Management</h1>
            <div className="flex gap-4">
                <button
                    onClick={onFilterClick}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Filter
                </button>
                <button
                    onClick={onAddClick}
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Item
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
