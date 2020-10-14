import React from 'react';
import {cleanup, renderApollo, waitForElement,} from '../../test-utils';
import Customer from '../customer';
import {GET_CUSTOMER_DETAILS} from "../../queries/customer";

import {createLocation, createMemoryHistory} from 'history';
import {match, MemoryRouter} from 'react-router';
import auth from "../../services/auth-service";
import {sign} from "jsonwebtoken";

const mockCustomer = {
    __typename: 'Customer',
    _id: '5f43be78cba0f22b4cf98e2d',
    birthDate: "1980-07-02T00:00:00.000Z",
    firstname: "Aida",
    lastname: "Bugg",
    userId: "5f43be78cba0f22b4cf98e2d"
};

describe('Customer Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders customer', async () => {

        auth.login(sign({username: 'foo', password: 'bar'}, '123'));
        const customerId: string = mockCustomer._id;
        const mocks = [
            {
                request: {query: GET_CUSTOMER_DETAILS, variables: {customerId}},
                result: {
                    data: {
                        customer: mockCustomer
                    }
                },
            }
        ];

        const history = createMemoryHistory();
        const path = `/customer/:customerId`;

        const match: match<{ customerId: string }> = {
            isExact: false,
            path,
            url: path.replace(':customerId', customerId),
            params: {customerId}
        };

        const location = createLocation(match.url);

        const {getByTestId} = await renderApollo(<MemoryRouter><Customer history={history}
                                                                      location={location}
                                                                      match={match}/></MemoryRouter>, {
            mocks,
            resolvers: {}
        });
        await waitForElement(() => getByTestId('submit-btn'));
    });
});
