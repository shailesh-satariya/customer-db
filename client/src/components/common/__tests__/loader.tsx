import React from 'react';

import {cleanup, render} from '../../../test-utils';
import Loader from "../loader";

describe('Loader', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Loader/>);
    });
});
