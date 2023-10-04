import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "app/store";
import { Pool } from "entities/pool/pool";
import { Pagination } from "entities/common/pagination";
import { transformErrorResponse } from "@features/api.util";
import { PoolListParamsDto } from "entities/pool/pool-list-params.dto";

export const apiPoolsSlice = createApi({
    reducerPath: "api/pools",
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
            listPools: builder.query<Pagination<Pool>, PoolListParamsDto>({
                query({ startIndex, maxResults }) {
                    return {
                        url: `/pool`,
                        params: { startIndex, maxResults },
                    };
                },
                transformErrorResponse,
            }),
        };
    },
});

export const { useLazyListPoolsQuery } = apiPoolsSlice;
