import ImageGallery from 'react-image-gallery';

import './hotel.scss';

import { StarRating } from "../starRating/starRating";
import { IHotelProps } from "./IHotelProps"
import { useAppSelector } from '../../helpers/hooks';

export const Hotel = (props: IHotelProps) => {
    const {name, address1, address2, starRating, rooms, id, images} = props.hotel;

    const totalAdults = useAppSelector(state => state.filters.adultsTotal);
    const totalChildren = useAppSelector(state => state.filters.childrenTotal);

    const filteredRooms = rooms ? rooms.filter(room => {
             return room.occupancy.maxAdults === totalAdults && room.occupancy.maxChildren === totalChildren;
        }) :
        []

    const galleryImages = images.map(img => ({
        original: img.url,
        originalAlt: img.alt
    }))

    return (
        <article className='hotel'>
            
            <header className='hotel__header'>
                
                <ImageGallery 
                    items={galleryImages} 
                    showBullets={true}
                    additionalClass='hotel__carousel'
                />

                <div className='hotel__data'>
                    <div className='hotel__basic-info'>
                        <h2 className='hotel__name'>{name}</h2>
                        <h3 className='hotel__address'>{address1}</h3>
                        <h3 className='hotel__address'>{address2}</h3>
                    </div>
                    <StarRating rating={parseInt(starRating)} hotelId={id}/>
                </div>
            </header>

            <ul className='hotel__rooms'>
                {filteredRooms.length > 0 ? 
                    filteredRooms.map(room => {
                        return (
                            <div className='hotel__room' key={`${id}-${room.name}`}>
                                <div className='hotel__room-basic-info'>
                                    <h4>{room.name}</h4>
                                    <h5>Adults: {room.occupancy.maxAdults}</h5>
                                    <h5>Children: {room.occupancy.maxChildren}</h5>
                                </div>
                                <div className='hotel__room-description'>{
                                    room.shortDescription ? 
                                        room.shortDescription :
                                        'No description available'
                                }</div>
                            </div>
                        ) 
                }) :
                <span className='hotel__no-rooms'>No rooms in this hotel match criteria</span>
            }
            </ul>

        </article>
    )
}
