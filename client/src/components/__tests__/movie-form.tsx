import React from 'react';

import {cleanup, render} from '../../test-utils';
import CustomerForm from "../customer-form";
import {Customer} from "../../types/graphql/customer";
import {MemoryRouter} from "react-router";

describe('CustomerForm', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <MemoryRouter>
                <CustomerForm saveCustomer={(customer: Customer) => (customer)} data={null}/>
            </MemoryRouter>
        );
    });
});
