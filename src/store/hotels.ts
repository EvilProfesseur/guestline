import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataState } from "../enums/dataState";
import { IHotel } from "../interfaces/IHotel";

export const hotelsAdapter = createEntityAdapter<IHotel>();

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: hotelsAdapter.getInitialState({
        dataState: DataState.ready
    }),
    reducers: {
        setHotels: hotelsAdapter.setAll,
        setRooms: hotelsAdapter.updateOne,
        setHotelDataState: (state, action: PayloadAction<DataState>) => {
            return {
                ...state,
                dataState: action.payload
            }
        },
    }
})

export const { setHotels, setRooms, setHotelDataState } = hotelsSlice.actions;

export default hotelsSlice.reducer
