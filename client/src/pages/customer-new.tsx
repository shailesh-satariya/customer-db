import React, {Fragment} from 'react';
import moment from "moment";
import {CustomerForm} from '../components';
import {Customer} from "../types/graphql/customer";
import {useMutation} from "@apollo/client";
import * as CustomerCreateTypes from "../types/graphql/customer-create";
import {CREATE_CUSTOMER} from "../queries/customer";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import * as CustomerService from "../services/customer-service";

/**
 * New customer page component -> url: /customer/new
 *
 * @constructor
 *
 * @return JSX.Element
 */
const CustomerNew: React.FC = (): JSX.Element => {
    const history = useHistory();
    const customer: Customer = {birthDate: moment().format('YYYY-MM-DD'), firstname: '', lastname: '', __typename: "Customer"};

    const [createCustomer] = useMutation<CustomerCreateTypes.CustomerCreate,
        CustomerCreateTypes.CustomerCreateVariables>(
        CREATE_CUSTOMER,
        {
            onCompleted(data: any) {
                CustomerService.setCustomer(data.createCustomer as Customer);
                toast.success("Customer created.");
                history.push("/customers");
            }
        }
    );

    const handleCreate = async (customer: Customer): Promise<void> => {
        await createCustomer({
            variables: {
                firstname: customer.firstname,
                lastname: customer.lastname,
                birthDate: customer.birthDate
            }
        });
    }

    return (
        <Fragment>
            <CustomerForm data={customer} saveCustomer={handleCreate}/>
        </Fragment>
    );
}

export default CustomerNew;
