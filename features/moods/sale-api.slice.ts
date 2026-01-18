import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@app/store";
import { Response } from "@entities/common/response";
import { transformErrorResponse } from "@features/api.util";
import { SaleAddParamsDto } from "@entities/moods/sale/sale-add-params.dto";
import { SaleResponse } from "./sale-response";

export const apiMoodsSaleSlice = createApi({
    reducerPath: "api/moods/sale",
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
            addMoodsSale: builder.mutation<SaleResponse, SaleAddParamsDto>({
                query({ items, invoiceData, invoiceType, poolId }) {
                    return {
                        url: `/moods/sale`,
                        method: "POST",
                        body: { items, invoiceData, invoiceType, poolId },
                    };
                },
                transformErrorResponse,
            }),
        };
    },
});

export const { useAddMoodsSaleMutation: useAddMoodsSaleMutation } =
    apiMoodsSaleSlice;
