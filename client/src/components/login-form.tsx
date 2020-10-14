import React from "react";
import {Redirect} from "react-router-dom";
import Form from "./form/form";
import auth from "../services/auth-service";
import {UserCredential} from "../types";
import {LoginVariables} from '../types/graphql/login';

const Joi = require("joi-browser");

interface LoginFormProps {
    login: (variables: LoginVariables) => void;
    data: UserCredential
}

interface LoginFormState {
    data: LoginVariables;
    errors: Record<string, any>;
}

class LoginForm extends Form<LoginFormProps, LoginFormState> {
    state: LoginFormState = {
        data: {username: '', password: ''},
        errors: {}
    };

    schema: Record<string, any> = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    props: LoginFormProps;

    /**
     * Constructor
     *
     * @param {LoginFormProps} props
     */
    constructor(props: LoginFormProps) {
        super(props);
        this.props = props;

        this.state.data = props.data;
    }

    doSubmit = async (): Promise<void> => {
        const {data}: LoginFormState = this.state;
        this.props.login(data);
    };

    render(): JSX.Element | null {
        if (auth.getCurrentUser()) return <Redirect to="/"/>;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderSubmitButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
