import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from './filters';
import hotelsReducer, { hotelsAdapter } from './hotels';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        hotels: hotelsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {
    selectAll: selectAllHotels,
} = hotelsAdapter.getSelectors<RootState>(state => state.hotels)
