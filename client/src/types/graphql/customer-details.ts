import {Customer} from "./customer";

export interface CustomerDetails {
    customer: Customer | null;
}

export interface CustomerDetailsVariables {
    customerId: string;
}
