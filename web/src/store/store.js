import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sagas from "./rootSaga";
import auth from "./reducers/auth";
import util from "./reducers/util";
import movie from "./reducers/movie";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'util']
};

const blackListConfig = {
    key: "root",
    storage,
    blacklist: ['message', 'error']
}

const combinedReducer = combineReducers({
    util,
    auth,
    movie,
});

const rootReducer = (state, action) => {
    if (action.type === "auth/logout") {
        storage.removeItem("persist:root");
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware, logger];

    const store = configureStore({
        reducer: persistedReducer,
        middleware: [...middleware],
    });

    const presister = persistStore(store);

    sagaMiddleware.run(sagas);

    return { store, presister };
};
