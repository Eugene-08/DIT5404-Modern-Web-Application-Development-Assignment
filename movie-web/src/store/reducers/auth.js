import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import moment from "moment";
import { dateTimeFormat } from '../../utils/Constant';
const initialState = {
    loading: false,
    data: "",
    forgetPasswordSuccess: false,
    loginSuccess: false,
    signupSuccess: false,
    verifyExistSuccess: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initAuth(state) {
            state.error = null;
            state.loginSuccess = false;
        },
        login(state) {
            state.loading = true;
            state.loginSuccess = false;
        },
        loginSuccess(state, payload) {
            let user = payload.resData.data;
            state.loginSuccess = true;
            state.data = user;
            if (state.data) {
                let token = { token: state.data };
                localStorage.setItem("token", JSON.stringify(token));
                if (token) {
                    state.redirectTo = "/public";
                }
            }

            state.loading = false;
        },
        loginFail(state, payload) {
            state.loginSuccess = false;
            state.error = payload.error;
            state.loading = false;
        },

        logout(state) {
            state.loading = false;
            state.loginSuccess = false;
            localStorage.removeItem("token");
            window.location.assign("/movie");
        },

        signup(state, payload) {
            state.loading = true;
            state.signupSuccess = false;
        },
        signupSuccess(state, payload) {
            let user = payload.resData.data;
            console.log('here signup success', user)
            state.loading = false;
            state.data = user;
            state.signupSuccess = true;
            if (state.data) {
                let token = { token: state.data };
                localStorage.setItem("token", JSON.stringify(token));
                if (token) {
                    state.redirectTo = "/signin";
                }
            }
        },
        signupFail(state, payload) { },

        verifyExist(state, payload) {
            state.loading = true;
            state.verifyExistSuccess = false;
        },
        verifyExistSuccess(state, payload) {
            let user = payload.resData.data;
            state.loading = false;
            state.data = user;
            state.verifyExistSuccess = true;
            if (state.data) {
                state.redirectTo = "/signin";
            }
        },
        verifyExistFail(state, payload) { },
    }
});

export const {
    initAuth,
    login,
    loginSuccess,
    loginFail,
    logout,
    signup,
    signupSuccess,
    signupFail,
    verifyExist,
    verifyExistSuccess,
    verifyExistFail,
} = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
