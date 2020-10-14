import React from 'react';

import {cleanup, render} from '../../../test-utils';
import ProtectedRoute from "../protected-route";
import {Switch} from "react-router-dom";
import MyProfile from "../../../pages/my-profile";
import {MemoryRouter} from "react-router";

describe('ProtectedRoute', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <MemoryRouter>
                <Switch>
                    <ProtectedRoute path="/profile" component={MyProfile}/>
                </Switch>
            </MemoryRouter>);
    });
});
