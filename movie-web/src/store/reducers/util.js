import { createSlice } from "@reduxjs/toolkit";
// import { responseCode, responseMessage } from "../../utils/MessageUtil";

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
            console.log('in util: payload', payload)
            let errorMsg = "Error: Cannot read properties of undefined (reading 'message')" ;
            state.message = {
                message: res?.message == errorMsg ? errorMsg : res?.message,
                severity: "error",
                autoHideDuration: 3000
            };
            // if (JSON.stringify(res)?.includes("Error")) {
            //     console.log("catch error state", state)
            //     console.log("catch error payload", payload?.resData)
            //     console.log("catch error res", JSON.stringify(res.message))
            //     if (JSON.stringify(res.message) == "Error: Cannot read properties of undefined (reading 'message')" && localStorage.getItem("token") != null) {
            //         state.message = {
            //             message: res?.message == "Error: Cannot read properties of undefined (reading 'message')" ? res?.message : "Logout Success",
            //             severity: "error",
            //             autoHideDuration: 3000
            //         };
            //     } else {
            //         state.message = {
            //             message: "Logout Success",
            //             severity: "success",
            //             autoHideDuration: 3000
            //         };
            //     }
            // } else {
            //     console.log("in util: false payload", payload);
            //     let message = "";

            // }
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
