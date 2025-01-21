import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import BillsTable from './components/BillsTable';
import BillFormModal from './components/BillFormModal';
import TimeSeriesChart from './components/TimeSeriesChart';
import { getBills, createBill, editBill, removeBill } from './redux/BillsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  const handleAddClick = () => {
    setCurrentBill(null);
    setModalOpen(true);
  };

  const handleEditClick = (bill) => {
    setCurrentBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentBill(null);
  };

  const handleFormSubmit = (bill) => {
    if (bill._id) {
      dispatch(editBill({ id: bill._id, bill }));
    } else {
      dispatch(createBill(bill));
    }
  };

  const handleDeleteClick = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      dispatch(removeBill(id));
    }
  };

  // Filter and sort bills
  const filteredBills = bills
    .filter((bill) => (filterCategory ? bill.category === filterCategory : true))
    .sort((a, b) => {
      if (!sortOption) return 0;
      const [key, order] = sortOption.split('-');
      const valueA = key === 'date' ? new Date(a[key]) : a[key];
      const valueB = key === 'date' ? new Date(b[key]) : b[key];
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onAddClick={handleAddClick}
      />

      <div className="container mx-auto px-4 py-4">
        <h3 className="text-lg font-bold">Total Spent: ₹{filteredBills.reduce((total, bill) => total + bill.amount, 0)}</h3>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading && <p>Loading bills...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <BillsTable bills={filteredBills} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            <TimeSeriesChart bills={filteredBills} />
          </>
        )}
      </div>

      <BillFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        currentBill={currentBill}
      />
    </div>
  );
};

export default App;
