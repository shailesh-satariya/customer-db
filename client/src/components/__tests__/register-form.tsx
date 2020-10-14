import React from 'react';

import {cleanup, render} from '../../test-utils';
import RegisterForm from "../register-form";
import {RegisterVariables} from "../../types/graphql/register";

describe('RegisterForm', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<RegisterForm register={(variables: RegisterVariables) => (variables)}
                             data={{username: '', password: '', name: ''}}
        />);
    });
});
