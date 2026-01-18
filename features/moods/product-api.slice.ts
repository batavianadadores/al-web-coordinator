import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@app/store";
import { isUndefined } from "@entities/validators";
import Product from "./product";
import { Pagination } from "@entities/common/pagination";
import { transformErrorResponse } from "@features/api.util";
import { ProductListParamsDto } from "@entities/moods/product/product-list-params.dto";

export const apiMoodsProductsSlice = createApi({
    reducerPath: "api/moods/products",
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
            listMoodsProducts: builder.query<
                Pagination<Product>,
                ProductListParamsDto
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
                        url: `/moods/product`,
                        params,
                    };
                },
                transformErrorResponse,
            }),
        };
    },
});

export const { useLazyListMoodsProductsQuery } = apiMoodsProductsSlice;
