import Cookies from 'js-cookie';
import {getJwt} from "./auth-service";

/**
 * Local storage
 */
export class CookieService {
    static lsKey = 'general';
    static ls: Record<string, any> = {};

    private static _bInit: boolean = false;

    /**
     * Initialize the local storage. Fetches local storage data
     */
    static init(): void {
        if (CookieService._bInit) {
            return;
        }

        const jwt: string = getJwt();
        if (jwt) {
            CookieService.lsKey += `-${jwt}`;
        }


        const value = Cookies.get(CookieService.lsKey);
        const tmpLs: any = value ? JSON.parse(value) : null;
        if (typeof tmpLs === 'object' && tmpLs !== null) {
            CookieService.ls = tmpLs;
        }

        CookieService._bInit = true;
    }

    /**
     * Sets the local storage value
     *
     * @param key string
     * @param value value
     */
    static setValue(key: string, value: any): void {
        CookieService.init();
        CookieService.ls[key] = value;

        Cookies.set(CookieService.lsKey, JSON.stringify(CookieService.ls));
    }

    /**
     * Unsets the local storage value
     *
     * @param key string
     */
    static unsetValue(key: string): void {
        CookieService.init();
        delete CookieService.ls[key];

        Cookies.set(CookieService.lsKey, JSON.stringify(CookieService.ls));
    }

    /**
     * Gets the local storage value
     *
     * @param key string
     * @param def any default value in case key does not exist in local storage
     *
     * @return any
     */
    static getValue(key: string, def: any = null): any {
        CookieService.init();
        return CookieService.ls[key] || def;
    }

    /**
     * Removes all local storage value
     */
    static removeAll() {
        CookieService.init();
        Cookies.remove(CookieService.lsKey);
    }
}
