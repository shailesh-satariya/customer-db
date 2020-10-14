import React, {Fragment, useState} from 'react';
import {useMutation} from '@apollo/client';

import {Error, Loader} from "../components/common";
import * as RegisterTypes from '../types/graphql/register';
import {REGISTER_USER} from "../queries/register";
import {RegisterForm} from "../components";
import {RouteComponentProps} from "react-router";
import auth from "../services/auth-service";

/**
 * register page component -> url: /register
 * @param props RouteComponentProps
 * @constructor
 *
 * @return JSX.Element | null
 */
const Register: React.FC<RouteComponentProps> = (props: RouteComponentProps): JSX.Element | null => {
    const initData: RegisterTypes.RegisterVariables = {username: '', password: '', name: ''};
    const [data, setData] = useState(initData);
    const [register, {loading, error}] = useMutation<RegisterTypes.Register,
        RegisterTypes.RegisterVariables>(
        REGISTER_USER,
        {
            onCompleted({register}) {
                auth.login(register.token as string);

                window.location.href = '/';
            }
        }
    );

    if (auth.getCurrentUser()) {
        props.history.push('/');
    }

    const handleRegister = async (data: RegisterTypes.RegisterVariables): Promise<void> => {
        try {
            setData(data);
            await register({variables: data});
        } catch (e) {
        }
    };

    if (loading) return <Loader/>;

    return (
        <Fragment>
            <RegisterForm register={handleRegister} data={data}/>
            {error ? <Error message={error.message || error.toString()}/> : null}
        </Fragment>
    );
}

export default Register;
