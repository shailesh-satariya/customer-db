import React, {Component, Fragment} from 'react';
import {ToastContainer} from "react-toastify";
import {getAppName} from "./utils/helper";
import auth from "./services/auth-service";
import {NavBar} from "./components";
import {User} from "./types";

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Pages from "./pages";

interface AppState {
    user: User | null;
}

/**
 * App components
 */
class App extends Component {
    state: AppState = {
        user: null
    };

    /**
     * On component mount
     */
    componentDidMount(): void {
        document.title = getAppName();

        const user: any = auth.getCurrentUser();
        this.setState({user});
    }

    /**
     * @return JSX.Element
     */
    render(): JSX.Element {
        const {user}: AppState = this.state;

        return (
            <Fragment>
                <ToastContainer/>
                <NavBar user={user}/>
                <div id="container-wrapper">
                    <main className="container">
                        <Pages />
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default App;
