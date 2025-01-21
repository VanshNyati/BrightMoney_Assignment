import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './BillsSlice';

const store = configureStore({
    reducer: {
        bills: billsReducer,
    },
});

export default store;
