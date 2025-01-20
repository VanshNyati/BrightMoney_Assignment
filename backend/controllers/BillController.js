const Bill = require('../models/Bill');

// Get all bills
const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new bill
const addBill = async (req, res) => {
    const { description, category, amount, date } = req.body;

    try {
        const newBill = new Bill({ description, category, amount, date });
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a bill
const updateBill = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBill = await Bill.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json(updatedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bill
const deleteBill = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBill = await Bill.findByIdAndDelete(id);
        if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllBills,
    addBill,
    updateBill,
    deleteBill,
};
