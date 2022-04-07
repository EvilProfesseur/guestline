import { IImage } from "./IImage";
import { IRoom } from "./IRoom";

export interface IHotel {
    name: string,
    id: string,
    starRating:  '1' | '2' | '3' | '4' | '5',
    rooms?: IRoom[],
    address1: string,
    address2: string,
    description: string,
    postcode: string,
    town: string,
    country: string,
    countryCode: string,
    facilities: IFacility[],
    telephone: string,
    email: string,
    images: IImage[],
    checkInHours: number,
    checkInMinutes: number,
    checkOutHours: number,
    checkOutMinutes: number,
    position: IHotelPosition
}

export interface IFacility {
    code: string
}

export interface IHotelPosition {
    latitude: number,
    longitude: number,
    timezone: string
}
