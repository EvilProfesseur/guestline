import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './hotelList.scss';
import logo from '../../assets/logo-white.png';

import { getHotelData } from "../../services/hotelData";
import { selectAllHotels } from "../../store/store";
import { Filters } from "../filters/filters"
import { Hotel } from "../hotel/hotel"
import { useAppSelector } from "../../helpers/hooks";
import { throttle } from "../../helpers/throttle";
import classNames from "classnames";

export const HotelList = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(selectAllHotels);
    const starRating = useAppSelector(state => state.filters.starRating);

    const [scrollPos, setScrollPos] = useState(0);

    useEffect(
        function getHotels() {
            dispatch(getHotelData());
        }, [dispatch]
    )

    useEffect(
        function controlHeaderPos() {
            const onScroll = () => throttle(() => setScrollPos(window.scrollY), 16);
            
            document.addEventListener('scroll', onScroll);

            return () => document.removeEventListener('scroll', onScroll);
        }
    )

    const filteredHotels = hotels
        .filter(hotel => parseInt(hotel.starRating) === starRating)
        .map(hotel => (
            <Hotel 
                hotel={hotel} 
                key={hotel.id}
            />)
        )

    const logoClasses = classNames({
        'hotel-list__logo': true,
        'hotel-list__logo--scaled': scrollPos > 90
    })
    
    return (
        <div className="hotel-list">
            <header className='hotel-list__header'>
                <div className='hotel-list__bg' style={{transform: `translateY(-${scrollPos > 300 ? 300 : scrollPos}px)`}}></div>
                <img className={logoClasses} src={logo} alt='Guestline logo' />
            </header>
            <Filters />

            <section className='hotel-list__hotels'>
                {filteredHotels.length > 0 ? 
                    filteredHotels : 
                    <div className='hotel-list__no-hits'>No hotels found</div>}
            </section>
        </div>
    )
}
