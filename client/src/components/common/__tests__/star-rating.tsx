import React from 'react';

import {cleanup, render} from '../../../test-utils';
import StarRating from "../star-rating";

describe('StarRating', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<StarRating rating={3}
                           onChange={(rating: number) => (rating)}/>);
    });
});
