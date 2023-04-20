import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    openSidebar: true,
    message: {},
};

const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        handleSidebar(state) {
            state.openSidebar = !state.openSidebar;
        },
        handleResPopupMessage(state, payload) {
            let res = payload.resData;
            console.log('in util: payload', payload);
            let errorMsg = "Error: Cannot read properties of undefined (reading 'message')" ;
            state.message = {
                message: res?.message == errorMsg ? errorMsg : res?.message,
                severity: "error",
                autoHideDuration: 3000
            };
        },
        handleSetPopupMessage(state, { payload }) {
            state.message = payload.msg;
        }
    },
});
export const {
    handleSidebar,
    handleResPopupMessage,
    handleSetPopupMessage,
} = utilSlice.actions;
export const selectUtil = (state) => state.util;

export default utilSlice.reducer;
