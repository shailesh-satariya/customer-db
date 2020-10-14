import {ApolloCache} from "@apollo/client";
import {GET_CUSTOMERS} from "../queries/customer";

export function deleteCacheEntry(cache: ApolloCache<any>, customerId: string): boolean {
    const data: any = cache.readQuery({query: GET_CUSTOMERS});

    if (data?.customers) {
        const m: any = data.customers;
        if (m?.customers && m?.__typename && 'count' in m && Array.isArray(m.customers)) {
            const customersArr = m.customers.filter((customer: any) => (customer._id !== customerId));

            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    customers: {
                        count: parseInt(m.count) - 1,
                        customers: customersArr,
                        __typename: m.customers.__typename,
                    }
                }
            });

            return true;
        }
    }

    return false;
}


export function newCustomerEntry(cache: ApolloCache<any>): void {
    const data: any = cache.readQuery({query: GET_CUSTOMERS});

    if (data?.customers) {
        const m: any = data.customers;
        if (m?.customers && m?.__typename && 'count' in m && Array.isArray(m.customers)) {
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    customers: {
                        count: parseInt(m.count) + 1,
                        customers: m.customers,
                        __typename: m.customers.__typename,
                    }
                }
            });

            return;
        }
    }
}
