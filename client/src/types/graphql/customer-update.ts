import {Customer} from "./customer";

export interface CustomerUpdate {
    customer: Customer;
}

export interface CustomerUpdateVariables {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: string;
}