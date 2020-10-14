import React, {Fragment} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {toast} from "react-toastify";

import {GET_CUSTOMER_DETAILS, UPDATE_CUSTOMER} from '../queries/customer';
import {CustomerForm} from '../components';
import * as CustomerDetailsTypes from '../types/graphql/customer-details';
import {Loader} from "../components/common";
import NotFound from "./not-found";
import * as CustomerUpdateTypes from "../types/graphql/customer-update";
import {useHistory} from "react-router-dom";
import {Customer} from "../types/graphql/customer";
import * as CustomerService from '../services/customer-service';


interface CustomerUpdateProps {
    customerId: string
}

/**
 * Customer edit page component -> url: /customer/:id
 *
 * @param props CustomerUpdateProps
 * @constructor
 *
 * @return JSX.Element
 */
const CustomerUpdate: React.FC<CustomerUpdateProps> = ({customerId}: CustomerUpdateProps): JSX.Element => {
    const history = useHistory();

    const {
        data,
        loading,
        error,
    } = useQuery<CustomerDetailsTypes.CustomerDetails,
        CustomerDetailsTypes.CustomerDetailsVariables>(GET_CUSTOMER_DETAILS,
        {variables: {customerId}}
    );

    const [updateCustomer] = useMutation<CustomerUpdateTypes.CustomerUpdate,
        CustomerUpdateTypes.CustomerUpdateVariables>(
        UPDATE_CUSTOMER,
        {
            onCompleted(data: any) {
                CustomerService.setCustomer(data.updateCustomer as Customer);
                toast.success("Customer updated.");
                history.push("/customers");
            }
        }
    );

    if (loading) return <Loader/>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <NotFound/>;

    const handleUpdate = async (customer: Customer): Promise<void> => {
        if (!customer._id) {
            return;
        }

        await updateCustomer({
            variables: {
                id: customer._id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                birthDate: customer.birthDate
            }
        });
    }

    return (
        <Fragment>
            <CustomerForm data={data.customer} saveCustomer={handleUpdate}/>
        </Fragment>
    );
}

export default CustomerUpdate;
