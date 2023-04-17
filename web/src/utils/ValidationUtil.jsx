import moment from "moment";

import { fieldRequiredMsg, fieldFormatMsg, fieldLengthMsg, fieldMinValueMsg, dateRangeValidMsg, integerOverflowMsg, confirmPasswordMsg } from "./MessageUtil"

export function validateRequire(errorList, field, fieldLabel, value) {
    if ((value + "")?.trim() == "" || value == undefined) {
        errorList.push({ field, helperText: getMessageStr(fieldRequiredMsg, { 'fieldName': fieldLabel }) });
    }
    return errorList;
}

export function validateLength(errorList, field, fieldLabel, value, maxLength) {
    if ((value + "")?.trim() != "" && (value + "")?.trim().length > maxLength) {
        errorList.push({ field, helperText: getMessageStr(fieldLengthMsg, { 'fieldName': fieldLabel, "maxLength": maxLength }) });
    }
    return errorList;
}

export function validateMinValue(errorList, field, fieldLabel, value, minValue) {
    if ((value + "")?.trim() != "" && (value + "")?.trim() < minValue) {
        errorList.push({ field, helperText: getMessageStr(fieldMinValueMsg, { 'fieldName': fieldLabel, "minValue": minValue }) });
    }
    return errorList;
}

export function validateFormat(errorList, field, fieldLabel, value, regexp, info) {
    if ((value + "")?.trim() != "" && !new RegExp(regexp).test((value + "")?.trim())) {
        let message = getMessageStr(fieldFormatMsg, { 'fieldName': fieldLabel })
        let messageInfo = (info && info != "") ? " (" + info + ")" : ""
        errorList.push({ field, helperText: message + messageInfo });
    }
    return errorList;
}

export function validateDateFormat(errorList, field, fieldLabel, value) {
    if (value == "Invalid date") {
        errorList.push({ field, helperText: getMessageStr(fieldFormatMsg, { 'fieldName': fieldLabel }) });
    }
    return errorList;
}

export function validateDateRange(errorList, field, startDate, endDate, startDateFieldLabel, endDateFieldLabel, dateFormat) {
    if (!moment(startDate, dateFormat).isSameOrBefore(moment(endDate, dateFormat))) {
        errorList.push({ field, helperText: getMessageStr(dateRangeValidMsg, { 'startDate': startDateFieldLabel, "endDate": endDateFieldLabel }) });
    }
    return errorList;

}

export function validateIntegerOverflow(errorList, field, value, fieldLabel) {
    if ((value + "")?.trim() != "" && (value + "")?.trim() > 2147483647) {
        errorList.push({ field, helperText: getMessageStr(integerOverflowMsg, { 'fieldName': fieldLabel }) });
    }
    return errorList;
}

export function validateCusMessage(errorList, field, message) {

    errorList.push({ field, helperText: message });

    return errorList;
}

export function getMessageStr(message, params = {}) {
    Object.keys(params).map((key) => { message = message.replaceAll("${" + key + "}", params[key]) });
    return message;
}

export function errorExists(errorList, field) {
    return errorList.some(error => error.field === field);
}

export function errorHelperText(errorList, field) {
    return errorList.find(error => error.field === field)?.helperText || "";
}

export function validateConfirmPassword(errorList, field, newPassword, confirmPassword) {
    if (newPassword != confirmPassword) {
        errorList.push({ field, helperText: getMessageStr(confirmPasswordMsg) });
    }
    return errorList;
}

export const format = {
    phone: {
        regex: /^([0-9]){8}$/,
        info: "Please provide an eight-digit Hong Kong mobile phone number"
    },
    password: {
        regex: /(.){8,}/,
        info: "At least 8 characters"
    },
    email: {
        regex: /^\S+@\S+\.\S+$/,
        info: ""
    },
    carPlate: {
        regex: /^([A-Z0-9/]){0,50}$/i,
        info: ""
    },
    number: {
        regex: /^\d+$/,
        info: "Only numbers allowed"
    },
    ip: {
        regex: /^(?:[0-9%]{1,3}\.){3}[0-9%]{1,3}$/,
        info: "IP Address format incorrect"
    },
    idcard: {
        regex: /^([A-Z0-9/]){4}$/g,
        info: "4 letters or numbers only"
    },
    tag: {
        regex: /(<([^>]+)>)/ig,
        info: ""
    },
    noSpecialCharacters: { 
        regex: /^[0-9a-zA-Z\_]+$/,
        info: "Only numbers or letters allowed"
    }
}