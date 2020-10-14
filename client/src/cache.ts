import {InMemoryCache} from '@apollo/client';

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

export const isLoggedInVar =
    cache.makeVar<boolean>(!!localStorage.getItem('token'));
