import React from "react";
import {cleanup, fireEvent, renderApollo, waitForElement,} from '../../test-utils';
import Register from '../register';
import {cache, isLoggedInVar} from '../../cache';
import {REGISTER_USER} from "../../queries/register";
import {createLocation, createMemoryHistory} from "history";
import {match} from 'react-router';
import {sign} from 'jsonwebtoken';
import {RegisterVariables} from "../../types/graphql/register";

describe('Register Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    const history = createMemoryHistory();
    const path = `/register`;

    const match: match = {
        isExact: false,
        path,
        url: path,
        params: {}
    };

    const location = createLocation(match.url);

    it('renders register page', async () => {
        renderApollo(<Register history={history}
                               location={location}
                               match={match}/>);
    });

    it('fires register mutation and updates cache after done', async () => {
        expect(isLoggedInVar()).toBeFalsy();

        const variables: RegisterVariables = {username: 'foo', password: 'bar', name: 'baz'};
        const mocks = [
            {
                request: {query: REGISTER_USER, variables},
                result: {
                    data: {
                        register: {
                            id: 'abc123',
                            token: sign(variables, '123'),
                        },
                    },
                },
            },
        ];

        const {getByTestId} = await renderApollo(<Register history={history}
                                                           location={location}
                                                           match={match}/>, {
            mocks,
            cache,
        });

        fireEvent.change(getByTestId('username-input'), {
            target: {value: 'foo'},
        });

        fireEvent.change(getByTestId('password-input'), {
            target: {value: 'bar'},
        });

        fireEvent.change(getByTestId('name-input'), {
            target: {value: 'baz'},
        });

        fireEvent.click(getByTestId('submit-btn'));

        // login is done if loader is gone
        await waitForElement(() => getByTestId('submit-btn'));

        expect(isLoggedInVar()).toBeTruthy();
    });
});
