import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import BillsTable from './components/BillsTable';
import BillFormModal from './components/BillFormModal';
import { getBills, createBill, editBill, removeBill } from './redux/BillsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  // Fetch bills on initial load
  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  // Open modal to add or edit bills
  const handleAddClick = () => {
    setCurrentBill(null);
    setModalOpen(true);
  };

  const handleEditClick = (bill) => {
    setCurrentBill(bill);
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentBill(null);
  };

  // Handle form submission
  const handleFormSubmit = (bill) => {
    if (bill._id) {
      // Edit existing bill
      dispatch(editBill({ id: bill._id, bill }));
    } else {
      // Add new bill
      dispatch(createBill(bill));
    }
  };

  // Handle bill deletion
  const handleDeleteClick = (id) => {
    dispatch(removeBill(id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar onFilterClick={() => alert('Filter functionality to be added!')} onAddClick={handleAddClick} />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6">
        {loading && <p>Loading bills...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <BillsTable bills={bills} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        )}
      </div>

      {/* Modal */}
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
