import {Customer} from "./customer";

export interface CustomerCreate {
    customer: Customer;
}

export interface CustomerCreateVariables {
    firstname: string;
    lastname: string;
    birthDate: string;
}