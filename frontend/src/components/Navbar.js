import React from 'react';

const Navbar = ({ filterCategory, setFilterCategory, sortOption, setSortOption, onAddClick }) => {
    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Bill Management</h1>
            <div className="flex gap-4 items-center">
                {/* Filter by Category */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-white text-black px-4 py-2 rounded"
                >
                    <option value="">All Categories</option>
                    <option value="FoodNDining">Food & Dining</option>
                    <option value="Utility">Utility</option>
                    <option value="Shopping">Shopping</option>
                    <option value="PersonalCare">Personal Care</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                </select>

                {/* Sort Options */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white text-black px-4 py-2 rounded"
                >
                    <option value="">Sort By</option>
                    <option value="amount-asc">Amount (Low to High)</option>
                    <option value="amount-desc">Amount (High to Low)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                    <option value="date-desc">Date (Newest First)</option>
                </select>

                {/* Add Item Button */}
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
