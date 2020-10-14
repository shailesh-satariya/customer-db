import React, {useState} from "react";
import StarRatingComponent from "react-star-rating-component";

interface StarRatingProps {
    rating: number;
    onChange: (rating: number) => void;
}

/**
 * StarRating component
 *
 * @param rating
 * @param onChange
 * @constructor
 */
const StarRating: React.FC<StarRatingProps> = ({rating, onChange}: StarRatingProps): JSX.Element => {
    const [value, setValue] = useState(rating);

    return (
        <StarRatingComponent
            name="rate1"
            starCount={5}
            value={value}
            starColor={`#ffb400`}
            emptyStarColor={`#333`}
            editing={true}
            onStarHover={(nextValue: number) => setValue(nextValue)}
            onStarClick={(nextValue: number) => onChange(nextValue)}
        />
    );
};

export default StarRating;
