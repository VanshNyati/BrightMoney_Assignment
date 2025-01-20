const express = require('express');
const {
    getAllBills,
    addBill,
    updateBill,
    deleteBill,
} = require('../controllers/BillController');

const router = express.Router();

router.get('/', getAllBills);        // Get all bills
router.post('/', addBill);          // Add a new bill
router.put('/:id', updateBill);     // Update a bill by ID
router.delete('/:id', deleteBill);  // Delete a bill by ID

module.exports = router;
