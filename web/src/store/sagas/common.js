import { put, call } from "redux-saga/effects";
import { apiGenerator } from "../../utils/APIService";

import {
    handleResPopupMessage
} from "../reducers/util";

import {
    logout
} from "../reducers/auth";

export function* sagaBuild({ payload, successType, failType }) {
    try {
        const resData = yield call(apiGenerator, payload);
        let responseStatus = resData.success;
        console.log('resData', resData)
        let message = resData.message;
        let formattedResData = Object.assign({}, resData);

        formattedResData.data = resData;
        if (responseStatus) {
            console.log('common: success')
            yield put({ type: successType, resData: formattedResData });
        } else {
            console.log('common: fail')
            yield put({ type: failType, error: { error: message, result: formattedResData } });
            yield put({ type: handleResPopupMessage.type, resData: resData });
        }

    } catch (error) {
        if (error.response?.status == 401) {
            yield put({ type: logout.type, resData: error });
        }
        let errorMessage = { message: "Error: " + error.message, open: true, severity: "error" }
        yield put({ type: handleResPopupMessage.type, resData: errorMessage });
        yield put({ type: failType, error });
    }
}
