import React from 'react';

import {cleanup, render} from '../../../test-utils';
import Error from "../error";

describe('Error', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Error message={'error'}/>);
    });
});
