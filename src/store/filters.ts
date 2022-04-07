import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        starRating: 4,
        adultsTotal: 2,
        childrenTotal: 0,
    },
    reducers: {
        setRating: (state, action) => {state.starRating = action.payload},
        setAdults: (state, action) => {state.adultsTotal = action.payload >= 0 ? action.payload : 0},
        setChildren: (state, action) => {state.childrenTotal = action.payload >= 0 ? action.payload : 0},
    }
});

export const { setRating, setAdults, setChildren } = filtersSlice.actions;

export default filtersSlice.reducer;
