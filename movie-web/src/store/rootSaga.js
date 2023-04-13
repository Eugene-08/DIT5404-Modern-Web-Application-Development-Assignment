import { fork } from "@redux-saga/core/effects";
import auth from "./sagas/auth";
import movie from "./sagas/movie";

export default function* rootSaga() {
    yield fork(auth);
    yield fork(movie);
}
