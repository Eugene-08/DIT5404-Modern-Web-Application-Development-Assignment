import React, { useEffect, useState, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { MessagePopup } from "./MessagePopup";
import { selectUtil, handleSetPopupMessage } from "../store/reducers/util";

const MessageHandler = () => {
    const dispatch = useDispatch();
    const utilState = useSelector(selectUtil);
    const initMessageObj = {
        message: "",
        open: false,
        severity: "info", // 'success' | 'info' | 'warning' | 'error'
    };
    const [messagePopup, setMessagePopup] = useState(initMessageObj);

    const resetMessageObj = () => {
        setMessagePopup(initMessageObj);
        dispatch(handleSetPopupMessage({ msg: {} }));
    }
    const [dummy, setDummy] = useState({ message: null, severity: null });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(handleSetPopupMessage({ msg: {} }));
    }, []);

    useEffect(() => {
        if (utilState.message?.message) {
            setMessagePopup({ ...utilState.message, open: true });
        }
    }, [utilState.message]);

    return <MessagePopup messagePopup={messagePopup} setMessagePopup={setMessagePopup} initMessagePop={resetMessageObj} />

};

export default MessageHandler;
