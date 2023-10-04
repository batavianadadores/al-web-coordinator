import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "app/store";
import { transformErrorResponse } from "@features/api.util";
import { SurveyResults } from "entities/survey/survey/survey-result";
import { SurveyGetResultsParamsDto } from "entities/survey/survey/survey-get-results-params.dto";
import { Question } from "entities/survey/question/question";
import { Pagination } from "entities/common/pagination";
import { isUndefinedOrNull } from "entities/validators";
import { SurveyGetReportParamsDto } from "entities/survey/survey/survey-get-report-params.dto";
import { SurveyGetReportResponseDto } from "entities/survey/survey/survey-get-report-response.dto";

export const apiSurveysSlice = createApi({
    reducerPath: "api/surveys",
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
            listQuestions: builder.query<Pagination<Question>, undefined>({
                query() {
                    return {
                        url: `/survey/question`,
                    };
                },
                transformErrorResponse,
            }),
            getReport: builder.query<
                SurveyGetReportResponseDto,
                SurveyGetReportParamsDto
            >({
                query({ from, to, poolId, questionId }) {
                    const params: {
                        from: string;
                        to: string;
                        poolId?: string;
                        questionId?: string;
                    } = {
                        from: from.toString(),
                        to: to.toString(),
                    };

                    if (!isUndefinedOrNull(poolId)) {
                        params["poolId"] = poolId.toString();
                    }
                    if (!isUndefinedOrNull(questionId)) {
                        params["questionId"] = questionId.toString();
                    }

                    return {
                        url: `/survey/report`,
                        params,
                    };
                },
                transformErrorResponse,
            }),
        };
    },
});

export const { useLazyListQuestionsQuery, useLazyGetReportQuery } =
    apiSurveysSlice;
