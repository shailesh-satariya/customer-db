import React from "react";
import moment from "moment";
import {cleanup, fireEvent, renderApollo, waitForElement,} from '../../test-utils';
import {isLoggedInVar} from '../../cache';
import {sign} from 'jsonwebtoken';
import CustomerNew from "../customer-new";
import auth from "../../services/auth-service";
import {CREATE_CUSTOMER} from "../../queries/customer";
import * as CustomerCreateTypes from "../../types/graphql/customer-create";
import Customer from "../customer";
import {MemoryRouter} from "react-router";
import {InMemoryCache} from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn() {
                    return isLoggedInVar();
                },
                customers: {
                    keyArgs: false
                }
            }
        }
    }
});

const mockCustomer = {
    __typename: 'Customer',
    _id: '5f43be78cba0f22b4cf98e2d',
    birthDate: "1980-07-02T00:00:00.000Z",
    firstname: "Aida",
    lastname: "Bugg",
    userId: "5f43be78cba0f22b4cf98e2d"
};

describe('New customer Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    auth.login(sign({username: 'foo', password: 'bar'}, '123'));

    it('renders new customer page', async () => {
        renderApollo(<MemoryRouter><CustomerNew/></MemoryRouter>);
    });

    it('fires new customer mutation and updates', async () => {

        const variables: CustomerCreateTypes.CustomerCreateVariables = {
            firstname: mockCustomer.firstname,
            lastname: mockCustomer.lastname,
            birthDate: moment().format('YYYY-MM-DD')
        };
        const mocks = [
            {
                request: {
                    query: CREATE_CUSTOMER,
                    variables
                },
                result: {
                    data: {
                        createCustomer: mockCustomer,
                    }
                }
            }
        ];

        const {getByTestId} = await renderApollo(<MemoryRouter><CustomerNew/></MemoryRouter>, {
            mocks,
            cache
        });

        fireEvent.change(getByTestId('firstname-input'), {
            target: {value: mockCustomer.firstname},
        });

        fireEvent.change(getByTestId('lastname-input'), {
            target: {value: mockCustomer.lastname},
        });


        fireEvent.click(getByTestId('submit-btn'));

        // login is done if loader is gone
        await waitForElement(() => getByTestId('submit-btn'));
    });
});
