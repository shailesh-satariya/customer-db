import React, {Fragment} from 'react';
import {RouteComponentProps} from "react-router";
import CustomerNew from "./customer-new";
import CustomerUpdate from "./customer-update";

interface CustomerProps extends RouteComponentProps<{ customerId: string }> {
}

/**
 * Customer page component -> url: /customer/:id
 *
 * @param props CustomerProps
 * @constructor
 *
 * @return JSX.Element
 */
const Customer: React.FC<CustomerProps> = (props: CustomerProps): JSX.Element => {
    const customerId: string = props.match.params.customerId || '';

    return (
        <Fragment>
            {
                customerId === 'new' ?
                    <CustomerNew/> :
                    <CustomerUpdate customerId={customerId}/>
            }
        </Fragment>
    );
}

export default Customer;
