import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, HttpLink, NormalizedCacheObject, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import './index.css';
import App from './App';
import {cache} from './cache';
import {apiUrl, appName, appVersion, subscriptionUrl} from "./config.json";
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";

const httpLink = new HttpLink({
    uri: apiUrl,
    headers: {
        'client-name': appName,
        'client-version': appVersion,
        'x-auth-token': localStorage.getItem('token') || ''
    },
});

const wsLink = new WebSocketLink({
    uri: subscriptionUrl,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem('token') || ''
        },
    }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: splitLink,
    resolvers: {},
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
