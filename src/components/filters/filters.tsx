import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useState } from "react";

import './filters.scss';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

import { useAppSelector } from "../../helpers/hooks";
import { setAdults, setChildren, setRating } from "../../store/filters";


export const Filters = () => {
    const dispatch = useDispatch();
    const starRating = useAppSelector(state => state.filters.starRating);
    const totalAdults = useAppSelector(state => state.filters.adultsTotal);
    const totalChildren = useAppSelector(state => state.filters.childrenTotal);

    const [hoveredRating, setHoveredRating] = useState(0);

    const starClasses = (index: number) => classNames({
        filters__star: true,
        'filters__star--checked': hoveredRating !== 0 ? hoveredRating >= index : starRating >= index
    })

    return (
        <div className='filters'>
            <div className='filters__rating' onMouseLeave={() => setHoveredRating(0)}>
                {[1,2,3,4,5].map(i => <StarIcon 
                    className={starClasses(i)} 
                    onClick={() => dispatch(setRating(i)) } 
                    onMouseEnter={() => setHoveredRating(i)} 
                    key={`starRatingSelector${i}`}
                />)}
            </div>

            <div className='filters__adults filters__occupants'>
                Adults: 
                <span className='filters__modifier' onClick={() => dispatch(setAdults(totalAdults + 1))}>+</span>
                {totalAdults}
                <span className='filters__modifier' onClick={() => dispatch(setAdults(totalAdults - 1))}>-</span>
            </div>

            <div className='filters__children filters__occupants'>
                Children: 
                <span className='filters__modifier' onClick={() => dispatch(setChildren(totalChildren + 1))}>+</span>
                {totalChildren}
                <span className='filters__modifier' onClick={() => dispatch(setChildren(totalChildren - 1))}>-</span>
            </div>
        </div>
    )
}
