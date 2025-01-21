import axios from 'axios';

// Axios instance
const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});

// Fetch all bills
export const fetchBills = () => API.get('/bills');

// Add a new bill
export const addBill = (bill) => API.post('/bills', bill);

// Update an existing bill
export const updateBill = (id, bill) => API.put(`/bills/${id}`, bill);

// Delete a bill
export const deleteBill = (id) => API.delete(`/bills/${id}`);
