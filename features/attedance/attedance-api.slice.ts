import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "app/store";
import { Pagination } from "entities/common/pagination";
import { transformErrorResponse } from "@features/api.util";
import { AttendanceListParamsDto } from "entities/club/attendance/attendance-list-params.dto";
import { AttendanceListResponse } from "entities/club/attendance/attendance-list-response.dto";

export const apiAttedanceSlice = createApi({
    reducerPath: "api/attedance",
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
            listAttedance: builder.query<
                Pagination<AttendanceListResponse>,
                AttendanceListParamsDto
            >({
                query({ startDate, endDate, poolId }) {
                    return {
                        url: `/club/attedance`,
                        params: {
                            startDate: startDate,
                            endDate: endDate,
                            poolId: poolId,
                        },
                    };
                },
                transformErrorResponse,
            }),
        };
    },
});

export const { useLazyListAttedanceQuery } = apiAttedanceSlice;
