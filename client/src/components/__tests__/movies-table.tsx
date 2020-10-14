import React from 'react';

import {cleanup, render} from '../../test-utils';
import CustomersTable from "../customer-table";
import {Customer} from "../../types/graphql/customer";

const mockCustomer: Customer = {
    __typename: 'Customer',
    _id: '5f43be78cba0f22b4cf98e2d',
    birthDate: "1980-07-02T00:00:00.000Z",
    firstname: "Aida",
    lastname: "Bugg",
    userId: "5f43be78cba0f22b4cf98e2d"
}

describe('LoginForm', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <CustomersTable customers={[mockCustomer]}
                         onSort={((sort: string) => (sort))}
                         onDelete={(customer: Customer) => (customer)}
                         sort={''}
                         selectedCustomer={null}
            />
        );
    });
});
