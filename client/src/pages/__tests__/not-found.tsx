import React from 'react';

import {cleanup, render} from '../../test-utils';
import NotFound from '../not-found';

describe('NotFound', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<NotFound/>);
    });
});
