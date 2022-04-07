import classNames from 'classnames';

import './starRating.scss'

import { ReactComponent as StarIcon } from '../../assets/star.svg';

interface IStarRating {
    rating: number,
    hotelId: string,
}

export const StarRating = ({rating, hotelId}: IStarRating) => {
    const stars = () => {
        return [1,2,3,4,5].map(i => {
            const cssClasses = classNames({
                'star-rating__star': true,
                'star-rating__star--checked': i <= rating,
            })

            return (
               <StarIcon 
                    className={cssClasses} 
                    key={`starRating${i}${hotelId}`}
                />
            )
        })
    }
    
    return (
        <div className='star-rating'>
           {stars()}
        </div>
    )
} 
