import React from 'react';

import {cleanup, render} from '../../test-utils';
import LoginForm from "../login-form";
import {LoginVariables} from "../../types/graphql/login";

describe('LoginForm', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<LoginForm login={(variables: LoginVariables) => (variables)}
                          data={{username: '', password: ''}}
        />);
    });
});
