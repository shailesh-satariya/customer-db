import React, {Fragment, useState} from 'react';
import {useMutation} from '@apollo/client';
import {RouteComponentProps} from "react-router";

import {Error, Loader} from '../components/common';
import {LoginForm} from '../components';
import * as LoginTypes from '../types/graphql/login';
import {LOGIN_USER} from "../queries/login";
import auth from "../services/auth-service";

/**
 * Login page component -> url: /login
 * @param props
 * @constructor
 *
 * @return JSX.Element | null
 */
const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps): JSX.Element | null => {
    const initData: LoginTypes.LoginVariables = {username: '', password: ''};
    const [data, setData] = useState(initData);
    const [login, {loading, error}] = useMutation<LoginTypes.Login,
        LoginTypes.LoginVariables>(
        LOGIN_USER,
        {
            onCompleted({login}) {
                auth.login(login.token as string);

                const {location} = props;
                const state: any = location.state || {};
                if (state && state.from) {
                    window.location.href = state.from;
                } else {
                    window.location.href = '/';
                }

            }
        }
    );

    const handleLogin = async (data: LoginTypes.LoginVariables): Promise<void> => {
        try {
            setData(data);
            await login({variables: data});
        } catch (e) {
        }
    };

    if (auth.getCurrentUser()) {
        props.history.push('/');
    }

    if (loading) return <Loader/>;

    return (
        <Fragment>
            <LoginForm login={handleLogin} data={data}/>
            {error ? <Error message={error.message || error.toString()}/> : null}
        </Fragment>
    );
}

export default Login;
