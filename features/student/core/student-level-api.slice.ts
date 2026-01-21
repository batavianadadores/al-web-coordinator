import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "app/store";
import { isUndefined } from "entities/validators";
import { transformErrorResponse } from "@features/api.util";
import { StudentLevelListResponse } from "./student-level-list-response";
import { StudentLevelListParamsDto } from "entities/student/core/student-levels-list-params.dto";

export const apiStudentLevelSlice = createApi({
    reducerPath: "api/student/core/student-level",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL_BASE,
        prepareHeaders(headers, { getState }) {
            const state = getState() as RootState;
            if (state.auth.token) {
                headers.set("x-albrd-authorization", state.auth.token);
            }
            headers.set("Accept-Encoding", "gzip");
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            studentLevelList: builder.query<
                StudentLevelListResponse,
                StudentLevelListParamsDto
            >({
                query(queryParams) {
                    const params: Record<string, any> = {};
                    const keys = Object.keys(queryParams);
                    for (const key of keys) {
                        if (!isUndefined((queryParams as any)[key])) {
                            params[key] = (queryParams as any)[key];
                        }
                    }
                    return {
                        url: `/student/core/studentLevel`,
                        params,
                    };
                },
                keepUnusedDataFor: 12 * 60 * 60, // 12 hours
                transformErrorResponse,
            }),
        };
    },
});

export const { useLazyStudentLevelListQuery, useStudentLevelListQuery } =
    apiStudentLevelSlice;
