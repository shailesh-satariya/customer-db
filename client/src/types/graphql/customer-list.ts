import {Customer} from "./customer";

export interface GetCustomerList_customers {
    __typename: "CustomerConnection";
    count: number;
    customers: Customer[];
}

export interface GetCustomerList {
    customers: GetCustomerList_customers;
}

export interface GetCustomerListVariables {
    sort: string;
    filter: string;
    offset: number;
    limit: number;
}
