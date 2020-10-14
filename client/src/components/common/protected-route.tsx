import React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import auth from "../../services/auth-service";

interface ProtectedRouteProps extends RouteProps {
    path: string;
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    render?: (props: Record<string, any>) => JSX.Element;
}

/**
 *
 * @param path string
 * @param Component React.ComponentType<RouteProps>
 * @param render Function
 * @param rest Record<string, any>
 * @constructor
 *
 * @return JSX.Element
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({path, component: Component, render, ...rest}: ProtectedRouteProps): JSX.Element | null => {
    return (
        <Route
            {...rest}
            render={(props: any) => {
                if (!auth.getCurrentUser())
                    return (
                        <Redirect
                            to={{pathname: "/login", state: {from: props.location}}}
                        />
                    );
                return Component ? <Component {...props} /> : (render ? render(props) : null);
            }}
        />
    );
};

export default ProtectedRoute;
