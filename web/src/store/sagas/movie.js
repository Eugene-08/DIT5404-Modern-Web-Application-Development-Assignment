import { takeEvery } from 'redux-saga/effects'
import { sagaBuild } from "./common";
import {
    searchTopTen,
    searchTopTenSuccess,
    searchTopTenFail,
    searchMovie,
    searchMovieSuccess,
    searchMovieFail,
    getMovie,
    getMovieSuccess,
    getMovieFail,
    rateMovie,
    rateMovieSuccess,
    rateMovieFail,
    addFavourite,
    addFavouriteSuccess,
    addFavouriteFail,
    getFavourite,
    getFavouriteSuccess,
    getFavouriteFail,
} from "../reducers/movie";

function* searchTopTenCaller({ payload }) {
    yield sagaBuild({ payload, successType: searchTopTenSuccess, failType: searchTopTenFail });
}
function* searchMovieCaller({ payload }) {
    yield sagaBuild({ payload, successType: searchMovieSuccess, failType: searchMovieFail });
}
function* getMovieCaller({ payload }) {
    yield sagaBuild({ payload, successType: getMovieSuccess, failType: getMovieFail });
}
function* rateMovieCaller({ payload }) {
    yield sagaBuild({ payload, successType: rateMovieSuccess, failType: rateMovieFail });
}
function* addFavouriteCaller({ payload }) {
    yield sagaBuild({ payload, successType: addFavouriteSuccess, failType: addFavouriteFail });
}
function* getFavouriteCaller({ payload }) {
    yield sagaBuild({ payload, successType: getFavouriteSuccess, failType: getFavouriteFail });
}

export default function* movie() {
    yield takeEvery(searchTopTen.type, searchTopTenCaller);
    yield takeEvery(searchMovie.type, searchMovieCaller);
    yield takeEvery(getMovie.type, getMovieCaller);
    yield takeEvery(rateMovie.type, rateMovieCaller);
    yield takeEvery(addFavourite.type, addFavouriteCaller);
    yield takeEvery(getFavourite.type, getFavouriteCaller);
}