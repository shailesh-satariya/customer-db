export function getUrlParams(): Record<string, string> {
    const url: URL = new URL(window.location.href);
    const searchParams: URLSearchParams = new URLSearchParams(url.search);

    const params: Record<string, string> = {};
    searchParams.forEach((value: string, key: string) => {
        params[key] = value;
    });

    return params;
}

export function setUrlParams(params: Record<string, string>): void {
    const url: URL = new URL(window.location.href);

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            if (params[key].length) {
                url.searchParams.set(key, params[key]);
            } else {
                url.searchParams.delete(key);
            }
        }
    }

    window.history.pushState({}, '', url.toString());

}
