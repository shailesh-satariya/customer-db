import React from 'react';

import {cleanup, render} from '../../../test-utils';
import TableBody from "../table-body";
import {Customer} from "../../../types/graphql/customer";
import {Column} from "../../../types";
import {convertMinutesToDuration} from "../../../utils/helper";

const mockCustomer: Customer = {
    __typename: 'Customer',
    _id: '5f43be78cba0f22b4cf98e2d',
    birthDate: "1980-07-02T00:00:00.000Z",
    firstname: "Aida",
    lastname: "Bugg",
    userId: "5f43be78cba0f22b4cf98e2d"
};

const columns: Column[] = [
    {
        path: "firstname",
        label: "First name",
        sortable: true
    },
    {
        path: "lastname",
        label: "Last name",
        sortable: true
    }
];

describe('TableBody', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(
            <table>
                <TableBody records={[mockCustomer]}
                           selectedRecord={mockCustomer}
                           columns={columns}
                />
            </table>
        );
    });
});
