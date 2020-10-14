import React from "react";
import {cleanup, fireEvent, renderApollo, waitForElement,} from '../../test-utils';
import Login from '../login';
import {cache, isLoggedInVar} from '../../cache';
import {LOGIN_USER} from "../../queries/login";
import {createLocation, createMemoryHistory} from "history";
import {match} from 'react-router';
import {sign} from 'jsonwebtoken';
import {LoginVariables} from "../../types/graphql/login";

describe('Login Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    const history = createMemoryHistory();
    const path = `/login`;

    const match: match = {
        isExact: false,
        path,
        url: path,
        params: {}
    };

    const location = createLocation(match.url);

    it('renders login page', async () => {
        renderApollo(<Login history={history}
                            location={location}
                            match={match}/>);
    });

    it('fires login mutation and updates cache after done', async () => {
        expect(isLoggedInVar()).toBeFalsy();

        const variables: LoginVariables = {username: 'foo', password: 'bar'};
        const mocks = [
            {
                request: {query: LOGIN_USER, variables},
                result: {
                    data: {
                        login: {
                            id: 'abc123',
                            token: sign(variables, '123'),
                        },
                    },
                },
            },
        ];

        const {getByTestId} = await renderApollo(<Login history={history}
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

        fireEvent.click(getByTestId('submit-btn'));

        // login is done if loader is gone
        await waitForElement(() => getByTestId('submit-btn'));

        expect(isLoggedInVar()).toBeTruthy();
    });
});
