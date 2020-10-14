import React from 'react';
import {render} from '@testing-library/react';

import {MockLink} from '@apollo/react-testing';
import {onError} from "@apollo/link-error";
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import {ApolloLink} from "@apollo/client/link/core";

type RenderApolloOptions = {
    mocks?: MockedResponse[],
    addTypename?: any,
    defaultOptions?: any,
    cache?: any,
    resolvers?: any,
    [st: string]: any;
}

const renderApollo = (
    node: any,
    {mocks, addTypename, defaultOptions, cache, resolvers, ...options}: RenderApolloOptions = {},
) => {

    let link: ApolloLink = ApolloLink.from([]);
    if (mocks) {
        const mockLink = new MockLink(mocks);
        let errorLoggingLink = onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
                graphQLErrors.map(({message, locations, path}) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );

            if (networkError) console.log(`[Network error]: ${networkError}`);
        });
        link = ApolloLink.from([errorLoggingLink, mockLink]);
    }


    return render(
        <MockedProvider
            mocks={mocks}
            addTypename={addTypename}
            defaultOptions={defaultOptions}
            cache={cache}
            resolvers={resolvers}
            link={link}
        >
            {node}
        </MockedProvider>,
        options,
    );
};

export * from '@testing-library/react';
export {renderApollo};
