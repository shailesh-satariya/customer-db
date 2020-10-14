import React from 'react';

import {cleanup, render} from '../../test-utils';
import Logout from "../logout";

describe('Logout', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Logout/>);
    });
});
