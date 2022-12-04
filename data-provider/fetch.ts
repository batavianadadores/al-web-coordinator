import APIError from "./api-error";

class ALFetch {
    urlBase?: string;

    constructor(urlBase?: string) {
        this.urlBase = urlBase;
    }

    async post(
        url: string,
        body: object,
        params?: Record<string, string>,
        token?: string
    ): Promise<any> {
        try {
            if (!navigator.onLine) {
                throw new APIError({
                    errorCode: 0,
                    userMessage: "Revisa tu conexión a internet.",
                    developerMessage: "",
                    moreInfo: "",
                });
            }

            let urlFetch = new URL(this.urlBase + url);
            if (params) {
                urlFetch.search = new URLSearchParams(params).toString();
            }

            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            const init: RequestInit = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers,
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(body),
            };
            if (token) {
                headers["x-albrd-authorization"] = token;
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

    async patch(
        url: string,
        body: object,
        params?: Record<string, string>,
        token?: string
    ): Promise<any> {
        try {
            if (!navigator.onLine) {
                throw new APIError({
                    errorCode: 0,
                    userMessage: "Revisa tu conexión a internet.",
                    developerMessage: "",
                    moreInfo: "",
                });
            }

            let urlFetch = new URL(this.urlBase + url);
            if (params) {
                urlFetch.search = new URLSearchParams(params).toString();
            }

            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            const init: RequestInit = {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers,
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(body),
            };
            if (token) {
                headers["x-albrd-authorization"] = token;
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

    async form(url: string, body: FormData): Promise<any> {
        try {
            if (!navigator.onLine) {
                throw new APIError({
                    errorCode: 0,
                    userMessage: "Revisa tu conexión a internet.",
                    developerMessage: "",
                    moreInfo: "",
                });
            }
            const response = await fetch(this.urlBase + url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: body,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new APIError(data);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async get(
        url: string,
        params?: Record<string, string>,
        token?: string,
        signal?: AbortSignal
    ): Promise<any> {
        try {
            if (!navigator.onLine) {
                throw new APIError({
                    errorCode: 0,
                    userMessage: "Revisa tu conexión a internet.",
                    developerMessage: "",
                    moreInfo: "",
                });
            }

            let urlFetch = new URL(this.urlBase + url);
            if (params) {
                urlFetch.search = new URLSearchParams(params).toString();
            }
            const headers: HeadersInit = {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip",
            };
            const init: RequestInit = {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers,
                redirect: "follow",
                referrerPolicy: "no-referrer",
            };

            if (token) {
                headers["x-albrd-authorization"] = token;
            }

            if (signal) {
                init.signal = signal;
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

export default ALFetch;
