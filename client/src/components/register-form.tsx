import React from "react";
import Form from "./form/form";
import {RegisterVariables} from "../types/graphql/register";

const Joi = require("joi-browser");

interface RegisterFormProps {
    register: (data: RegisterVariables) => void;
    data: RegisterVariables

}

interface RegisterFormState {
    data: RegisterVariables;
    errors: Record<string, any>;
}

class RegisterForm extends Form<RegisterFormProps, RegisterFormState> {
    state: RegisterFormState = {
        data: {username: "", password: "", name: ""},
        errors: {}
    };

    schema: Record<string, any> = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password"),
        name: Joi.string()
            .required()
            .label("Name")
    };

    props: RegisterFormProps;

    /**
     * Constructor
     *
     * @param {RegisterFormProps} props
     */
    constructor(props: RegisterFormProps) {
        super(props);
        this.props = props;

        this.state.data = props.data;
    }

    doSubmit = async () => {
        const {data}: RegisterFormState = this.state;
        this.props.register(data);
    };

    render(): JSX.Element | null {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderSubmitButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
