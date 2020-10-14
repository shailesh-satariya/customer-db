import React from 'react';

import {cleanup, render} from '../../test-utils';
import NavBar from '../nav-bar';
import {MemoryRouter} from "react-router";

describe('NavBar', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <MemoryRouter>
                <NavBar user={null}/>
            </MemoryRouter>
        );
    });
});
