import jwtDecode from "jwt-decode";
import {isLoggedInVar} from '../cache';

const _tokenKey = "token";
let _user: any = null;
let _bLoggedIn: boolean = false;

/**
 * logs in with jwt token
 *
 * @param jwt
 */
export function login(jwt: string): void {
    try {
        _user = jwtDecode(jwt);
        _bLoggedIn = true;

        localStorage.setItem(_tokenKey, jwt);
        isLoggedInVar(true);
    } catch (ex) {
        _user = null;
    }
}

export function logout(): void {
    _user = null;
    localStorage.removeItem(_tokenKey);
}

export function getCurrentUser(): any | null {
    if (!_bLoggedIn) {
        try {
            const jwt = getJwt();
            _user = jwtDecode(jwt);
            _bLoggedIn = true;

            isLoggedInVar(true);
        } catch (ex) {
            _user = null;
        }
    }

    return _user;
}

export function getJwt(): string {
    return localStorage.getItem(_tokenKey) || '';
}

export function canEdit(record: any): boolean {
    return _user && _user._id;
}

export default {
    login,
    logout,
    getCurrentUser,
    getJwt,
    canEdit
};
