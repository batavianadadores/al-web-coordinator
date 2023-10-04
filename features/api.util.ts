import { ResponseError } from "entities/common/response-error";
import {
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";

export function transformErrorResponse(
    baseQueryReturnValue: FetchBaseQueryError,
    meta: FetchBaseQueryMeta,
    arg: any
) {
    if (typeof baseQueryReturnValue.status === "number") {
        return baseQueryReturnValue.data as ResponseError;
    } else {
        switch (baseQueryReturnValue.status) {
            case "CUSTOM_ERROR":
                return {
                    errorCode: 50001,
                    userMessage: baseQueryReturnValue.error,
                    developerMessage: "",
                    moreInfo: "",
                };
            case "FETCH_ERROR":
                return {
                    errorCode: 50002,
                    userMessage: baseQueryReturnValue.error,
                    developerMessage: "",
                    moreInfo: "",
                };
            case "PARSING_ERROR":
                return {
                    errorCode: 50003,
                    userMessage: baseQueryReturnValue.error,
                    developerMessage: "",
                    moreInfo: "",
                };
            case "TIMEOUT_ERROR":
                return {
                    errorCode: 50004,
                    userMessage: baseQueryReturnValue.error,
                    developerMessage: "",
                    moreInfo: "",
                };
        }
    }
}
