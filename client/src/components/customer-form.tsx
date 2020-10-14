import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import {Form} from "./form";
import {Customer} from "../types/graphql/customer";

const Joi = require("joi-browser");

interface CustomerFormProps {
    data?: Customer | null;
    saveCustomer: (customer: Customer) => void;
}

interface CustomerFormState {
    data: Customer | null;
    errors: Record<string, any>;
    loading: boolean;
}

const newCustomer: Customer = {birthDate: moment().format('YYYY-MM-DD'), firstname: '', lastname: '', __typename: "Customer"};

/**
 * CustomerForm component
 */
class CustomerForm extends Form<CustomerFormProps, CustomerFormState> {
    schema: Record<string, any> = {
        _id: Joi.string(),
        firstname: Joi.string()
            .required()
            .min(2)
            .max(255)
            .label("First name"),
        lastname: Joi.string()
            .required()
            .min(2)
            .max(255)
            .label("First name"),
        birthDate: Joi.string()
            .required()
            .label("Birth date")
    };
    props: CustomerFormProps;
    state: CustomerFormState = {
        data: newCustomer,
        errors: {},
        loading: true
    };

    /**
     * Constructor
     *
     * @param {TableHeaderProps} props
     */
    constructor(props: CustomerFormProps) {
        super(props);
        this.props = props;

        if (props.data) {
            this.state.data = props.data;
        }
    }

    /**
     * On form submit
     */
    doSubmit = async (): Promise<void> => {
        if (this.state.data) {
            await this.props.saveCustomer(this.state.data);
        }
    };

    /**
     * renders cancel button
     *
     * @return JSX.Element
     */
    renderCancelButton = (): JSX.Element => {
        return (
            <Link className="text-decoration-none" to="/customers">
                <button className="btn btn-light ml-2">Cancel</button>
            </Link>
        );
    };

    render(): JSX.Element | null {
        const {data}: CustomerFormProps = this.props;

        return (
            <div>
                <h1>
                    {data?._id ? (`Edit customer: ${data.firstname} ${data.lastname}` ) : 'Add customer'}
                </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("firstname", "First name")}
                    {this.renderInput("lastname", "Last name")}
                    {this.renderDatePicker("birthDate", "Birth date")}
                    {this.renderSubmitButton("Save")}
                    {this.renderCancelButton()}
                </form>
            </div>
        );
    }
}

export default CustomerForm;
