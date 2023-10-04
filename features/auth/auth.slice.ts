import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token?: string;
}

const initialState: AuthState = {
    token: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
