import React, {useState} from 'react';
import {ApolloCache, ApolloError, useMutation, useQuery, useSubscription} from '@apollo/client';
import {toast} from "react-toastify";
import Loader from '../components/common/loader';

import * as GetCustomerListTypes from '../types/graphql/customer-list';
import * as DeleteTypes from "../types/graphql/customer-delete";
import {
    DELETE_CUSTOMER,
    GET_CUSTOMERS,
    CUSTOMER_CREATE_SUBSCRIPTION,
    CUSTOMER_DELETED_SUBSCRIPTION,
    CUSTOMER_UPDATED_SUBSCRIPTION
} from "../queries/customer";
import {CustomersTable} from "../components";
import {SearchBox} from "../components/form";
import {Customer} from "../types/graphql/customer";
import {CookieService} from "../services/cookie-service";
import {Pagination} from "../components/common";
import * as CustomerCacheUtils from "../utils/customer-cache";
import * as UrlUtils from "../utils/url";
import * as HelperUtils from "../utils/helper";
import {OperationVariables} from "@apollo/client/core";
import * as CustomerService from '../services/customer-service';

/**
 * Customers page component -> url: /customers
 *
 * @constructor
 *
 * @return JSX.Element
 */
const Customers: React.FC = (): JSX.Element => {
    const cookieVariableKey: string = 'variable';
    const urlParams: Record<string, string> = UrlUtils.getUrlParams();
    const cookieParams: any = CookieService.getValue(cookieVariableKey) || {};
    const limit: number = 4;
    const page: number = HelperUtils.isValidNumber(urlParams.page) ? parseInt(urlParams.page) :
        (HelperUtils.isValidNumber(cookieParams?.page) ? parseInt(cookieParams.page) : 1);

    const initVariables: GetCustomerListTypes.GetCustomerListVariables = {
        sort: (urlParams.sort || cookieParams.sort || 'firstname').toString(),
        filter: (urlParams.filter || cookieParams.filter || '').toString(),
        offset: (page - 1) * limit,
        limit: limit,
    };


    const [isRefetching, setIsRefetching] = useState(false);
    const [variables, setStateVariables] = useState(initVariables);

    // Fetch customers
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery<GetCustomerListTypes.GetCustomerList,
        GetCustomerListTypes.GetCustomerListVariables>(GET_CUSTOMERS, {variables});

    // Use create subscription
    useSubscription(CUSTOMER_CREATE_SUBSCRIPTION, {
        onSubscriptionData: ({client}) => {
            try {
                CustomerCacheUtils.newCustomerEntry(client.cache);
            } catch (e) {

            }
        }
    });

    // Use update subscription
    useSubscription(CUSTOMER_UPDATED_SUBSCRIPTION);

    // Use delete subscription
    useSubscription(CUSTOMER_DELETED_SUBSCRIPTION, {
        onSubscriptionData: ({client, subscriptionData}) => {
            try {
                CustomerCacheUtils.deleteCacheEntry(client.cache, subscriptionData.data.customerDeleted._id);
            } catch (e) {

            }
        }
    });

    // Refetch
    const refetchCustomers = async (variables: OperationVariables): Promise<void> => {
        try {
            await refetch(variables);
        } catch (e) {
        }
    };

    const setVariables = async (key: 'sort' | 'filter' | 'page', value: string): Promise<void> => {
        cookieParams[key] = value;
        CookieService.setValue(cookieVariableKey, cookieParams);
        UrlUtils.setUrlParams({[key]: value});

        const newStateVariables = {...variables};
        if (key === 'page') {
            newStateVariables.offset = newStateVariables.limit * (parseInt(value) - 1);
        } else {
            newStateVariables.offset = 0;
            newStateVariables[key] = value;
        }

        setIsRefetching(true);
        await refetchCustomers(newStateVariables);
        setStateVariables(newStateVariables);
        setIsRefetching(false);
    };

    // Delete customer
    const [deleteCustomer] = useMutation<DeleteTypes.CustomerDelete,
        DeleteTypes.CustomerDeleteVariables>(
        DELETE_CUSTOMER, {
            onError: (error: ApolloError) => {
                toast.error(error.message);
            }
        }
    );

    // Handle deletion
    const handleDelete = async (customer: Customer): Promise<void> => {
        if (customer._id) {
            const id: string = customer._id;
            await deleteCustomer({
                variables: {id},
                update: (cache: ApolloCache<any>) => {
                    try {
                        if (CustomerCacheUtils.deleteCacheEntry(cache, id)) {
                            return;
                        }
                    } catch (e) {

                    }
                    refetchCustomers(variables);
                }
            });
        }
    };

    if (loading || isRefetching) return <Loader/>;
    if (error || !data) return <p>ERROR</p>;

    const totalCount: number = data?.customers?.count ? parseInt(data.customers.count.toString()) : 0;

    const customers: Customer[] = data?.customers?.customers ? [...data.customers.customers] : [];
    const customer: Customer | null = CustomerService.getCustomer();

    if (customer && !customers.filter((m) => m._id === customer._id).length) {
        customers.unshift(customer);
    }

    return (
        <div className="row">

            <div className="col">
                <p>Showing {totalCount} customers in the database.</p>
                <SearchBox value={variables.filter || ''}
                           onChange={((filter: string) => setVariables('filter', filter))}/>
                <CustomersTable customers={data?.customers?.customers || []}
                             onSort={(async (sort: string) => await setVariables('sort', sort))}
                             onDelete={handleDelete}
                             sort={variables.sort || ''}
                             selectedCustomer={customer}
                />

                <Pagination
                    itemsCount={totalCount}
                    pageSize={variables.limit}
                    currentPage={ variables.offset / variables.limit  + 1 }
                    onPageChange={(async (page: number) => await setVariables('page', page.toString()))}
                />
            </div>
        </div>
    );
}

export default Customers;
