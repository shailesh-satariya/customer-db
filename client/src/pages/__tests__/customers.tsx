import React from 'react';
import {InMemoryCache} from '@apollo/client';

import {cleanup, renderApollo, waitForElement,} from '../../test-utils';
import Customers from '../customers';
import {
    GET_CUSTOMERS,
    CUSTOMER_CREATE_SUBSCRIPTION,
    CUSTOMER_DELETED_SUBSCRIPTION,
    CUSTOMER_UPDATED_SUBSCRIPTION
} from "../../queries/customer";
import * as GetCustomerListTypes from "../../types/graphql/customer-list";

const mockCustomer = {
    __typename: 'Customer',
    _id: '5f43be78cba0f22b4cf98e2d',
    birthDate: "1980-07-02T00:00:00.000Z",
    firstname: "Aida",
    lastname: "Bugg",
    userId: "5f43be78cba0f22b4cf98e2d"
};

const mockCustomer2 = {
    birthDate: "1980-08-02T00:00:00.000Z",
    firstname: "Ray",
    lastname: "Sin",
    userId: "5f43be78cba0f22b4cf98e2d",
    __typename: "Customer",
    _id: "5f43be78cba0f22b4cf98e31"
}

describe('Customers Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders customers', async () => {
        const variables: GetCustomerListTypes.GetCustomerListVariables = {limit: 4, offset: 0, sort: 'firstname', filter: ''};
        const cache = new InMemoryCache({addTypename: false});
        const mocks = [
            {
                request: {query: GET_CUSTOMERS, variables},
                result: {
                    data: {
                        customers: {
                            count: 1,
                            customers: [mockCustomer, mockCustomer2],
                        },
                    },
                },
            },
            {
                request: {query: CUSTOMER_CREATE_SUBSCRIPTION},
                result: {
                    data: {
                        customerCreated: mockCustomer,
                    },
                },
            },
            {
                request: {query: CUSTOMER_DELETED_SUBSCRIPTION},
                result: {
                    data: {
                        customerDeleted: mockCustomer2,
                    },
                },
            },
            {
                request: {query: CUSTOMER_UPDATED_SUBSCRIPTION},
                result: {
                    data: {
                        customerUpdated: mockCustomer,
                    },
                },
            },
        ];
        const {getByText} = await renderApollo(<Customers/>, {
            mocks,
            cache,
        });
        await waitForElement(() => getByText(/Airplane/i));
    });
});
