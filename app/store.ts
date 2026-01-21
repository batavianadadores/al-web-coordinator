import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/auth.slice";
import { apiPoolsSlice } from "@features/pool/pool-api.slice";
import { apiSurveysSlice } from "@features/survey/survey-api.slice";
import { apiAttedanceSlice } from "@features/attedance/attedance-api.slice";
import { apiStudentLevelSlice } from "@features/student/core/student-level-api.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiPoolsSlice.reducerPath]: apiPoolsSlice.reducer,
        [apiSurveysSlice.reducerPath]: apiSurveysSlice.reducer,
        [apiAttedanceSlice.reducerPath]: apiAttedanceSlice.reducer,
        [apiStudentLevelSlice.reducerPath]: apiStudentLevelSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(apiPoolsSlice.middleware)
            .concat(apiSurveysSlice.middleware)
            .concat(apiAttedanceSlice.middleware)
            .concat(apiStudentLevelSlice.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
