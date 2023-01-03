import APIError from "./api-error";

export default class BNFetch {
    urlBase: string;

    constructor(urlBase: string) {
        this.urlBase = urlBase;
    }

    post<T>(
        path: string,
        body: object,
        params?: Record<string, string>,
        token?: string
    ): Promise<T> {
        return this.customFetch("POST", path, body, params, token, undefined);
    }

    patch<T>(
        path: string,
        body: object,
        params?: Record<string, string>,
        token?: string
    ): Promise<T> {
        return this.customFetch("PATCH", path, body, params, token, undefined);
    }

    form<T>(path: string, body: FormData): Promise<T> {
        return this.customFetch(
            "POST",
            path,
            body,
            undefined,
            undefined,
            undefined
        );
    }

    get<T>(
        path: string,
        params?: Record<string, string>,
        token?: string,
        signal?: AbortSignal
    ): Promise<T> {
        return this.customFetch("GET", path, undefined, params, token, signal);
    }

    delete<T>(
        path: string,
        params?: { [key: string]: string },
        token?: string,
        body?: object
    ): Promise<T> {
        return this.customFetch("DELETE", path, body, params, token, undefined);
    }

    async customFetch<T>(
        method: "POST" | "GET" | "PATCH" | "DELETE",
        path: string,
        body?: object,
        params?: Record<string, string>,
        token?: string,
        signal?: AbortSignal
    ): Promise<T> {
        try {
            if (!navigator.onLine) {
                throw new APIError({
                    errorCode: 0,
                    userMessage: "Revisa tu conexión a internet.",
                    developerMessage: "",
                    moreInfo: "",
                });
            }

            let urlFetch = new URL(this.urlBase + path);
            if (params) {
                urlFetch.search = new URLSearchParams(params).toString();
            }

            const init: RequestInit = {
                method: method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept-Encoding": "gzip",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            };
            let headers: Record<string, string> = {};

            if (body) {
                init.body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
            if (token) {
                headers["x-albrd-authorization"] = token;
            }
            if (signal) {
                init.signal = signal;
            }
            if (body instanceof FormData) {
                init.headers = undefined;
            } else {
                init.headers = headers;
            }
            const response = await fetch(urlFetch.toString(), init);

            if (!response.ok) {
                const data = await response.json();
                throw new APIError(data);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }
}
