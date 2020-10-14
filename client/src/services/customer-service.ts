import {Customer} from "../types/graphql/customer";

let _customer: Customer | null = null;

export function setCustomer(customer: Customer): void {
    _customer = customer;
}

export function getCustomer(): Customer | null {
    let customer = _customer ? {..._customer} : null;
    _customer = null;
    return customer;
}
