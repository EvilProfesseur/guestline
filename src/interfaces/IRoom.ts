import { IImage } from "./IImage"

export interface IRoom {
    id: string,
    name: string,
    occupancy: IRoomOccupancy,
    shortDescription: string,
    longDescription: string,
    disabledAccess: boolean,
    bedConfiguration: string,
    images: IImage[]
}

export interface IRoomOccupancy {
    maxAdults: number,
    maxChildren: number,
    maxOverall: number
}
