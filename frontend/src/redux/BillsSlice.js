import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBills, addBill, updateBill, deleteBill } from '../services/Api';

// Thunks for async actions
export const getBills = createAsyncThunk('bills/getBills', async (_, { rejectWithValue }) => {
    try {
        const response = await fetchBills();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const createBill = createAsyncThunk('bills/createBill', async (bill, { rejectWithValue }) => {
    try {
        const response = await addBill(bill);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const editBill = createAsyncThunk('bills/editBill', async ({ id, bill }, { rejectWithValue }) => {
    try {
        const response = await updateBill(id, bill);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const removeBill = createAsyncThunk('bills/removeBill', async (id, { rejectWithValue }) => {
    try {
        await deleteBill(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Bills
            .addCase(getBills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBills.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = action.payload;
            })
            .addCase(getBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Bill
            .addCase(createBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bills.push(action.payload);
            })
            .addCase(createBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Edit Bill
            .addCase(editBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = state.bills.map((bill) =>
                    bill._id === action.payload._id ? action.payload : bill
                );
            })
            .addCase(editBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove Bill
            .addCase(removeBill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = state.bills.filter((bill) => bill._id !== action.payload);
            })
            .addCase(removeBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default billsSlice.reducer;
