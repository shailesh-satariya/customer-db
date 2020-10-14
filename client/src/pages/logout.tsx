import React from "react";
import auth from "../services/auth-service";
import {CookieService} from "../services/cookie-service";

/**
 * Logout page component
 *
 * @constructor
 */
const Logout: React.FC = (): null => {
    auth.logout();
    CookieService.removeAll();

    window.location.href = "/";

    return null;
};

export default Logout;
