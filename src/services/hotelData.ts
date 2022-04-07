import { DataState } from "../enums/dataState"
import { IHotel } from "../interfaces/IHotel";
import { IRoom } from "../interfaces/IRoom";
import { setHotelDataState, setHotels, setRooms } from "../store/hotels"
import { AppDispatch } from "../store/store";

export const getHotelData = () => async (dispatch: AppDispatch) => {
    dispatch(setHotelDataState(DataState.loading));
    fetch('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG', {
        method: 'GET'
    })
        .then(response => response.json())
        .then((data: IHotel[]) => {
            dispatch(setHotels(data));
            dispatch(getRoomData(data.map(hotel => hotel.id)));
        });
}

export const getRoomData = (hotelIds: string[]) => async (dispatch: AppDispatch) => {
    hotelIds.forEach((hotelId) => {  
        fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data: {rooms: IRoom[]}) => dispatch(
                setRooms({
                    id: hotelId, 
                    changes: { rooms: data.rooms } 
                })
            ));
    })
}
