import React from 'react';

import {cleanup, render} from '../../test-utils';
import MyProfile from "../my-profile";

describe('MyProfile', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<MyProfile/>);
    });
});
