import { takeEvery } from "redux-saga/effects";
import { sagaBuild } from "./common";
import {
    login,
    loginFail,
    loginSuccess,
    signup,
    signupSuccess,
    signupFail,
    verifyExist,
    verifyExistSuccess,
    verifyExistFail,
} from "../reducers/auth";

function* loginCaller({ payload }) {
    yield sagaBuild({ payload, successType: loginSuccess.type, failType: loginFail.type });
}
function* signupCaller({ payload }) {
    yield sagaBuild({ payload, successType: signupSuccess.type, failType: signupFail.type });
}
function* verifyExistCaller({ payload }) {
    yield sagaBuild({ payload, successType: verifyExistSuccess.type, failType: verifyExistFail.type });
}

export default function* auth() {
    yield takeEvery(login.type, loginCaller);
    yield takeEvery(signup.type, signupCaller);
    yield takeEvery(verifyExist.type, verifyExistCaller);
}
