import React, { useState, useEffect } from 'react';
import BillList from './components/BillList';
import BillForm from './components/BillForm';
import { fetchBills, addBill, updateBill, deleteBill } from './services/Api'; 

const App = () => {
  const [bills, setBills] = useState([]);
  const [currentBill, setCurrentBill] = useState(null);

  const loadBills = async () => {
    const response = await fetchBills();
    setBills(response.data);
  };

  const handleAddOrUpdate = async (bill) => {
    if (bill._id) {
      const response = await updateBill(bill._id, bill);
      setBills(
        bills.map((b) => (b._id === bill._id ? response.data : b))
      );
    } else {
      const response = await addBill(bill);
      setBills([...bills, response.data]);
    }
  };

  const handleDelete = async (id) => {
    await deleteBill(id);
    setBills(bills.filter((b) => b._id !== id));
  };

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Bill Management</h1>
      <BillForm
        onSubmit={handleAddOrUpdate}
        currentBill={currentBill}
        setCurrentBill={setCurrentBill}
      />
      <BillList
        bills={bills}
        onEdit={setCurrentBill}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
