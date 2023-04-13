import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        searchTopTen(state, payload) {
            state.loading = true;
            state.searchTopTenSuccess = false;
        },
        searchTopTenSuccess(state, payload) {
            let movies = payload.resData.data;
            state.loading = false;
            state.topTen = movies;
            state.searchTopTenSuccess = true;
        },
        searchTopTenFail(state, payload) { },

        searchMovie(state, payload) {
            state.loading = true;
            state.searchMovieSuccess = false;
        },
        searchMovieSuccess(state, payload) {
            let movies = payload.resData.data;
            state.loading = false;
            state.movies = movies;
            state.searchMovieSuccess = true;
        },
        searchMovieFail(state, payload) { },

        getMovie(state, payload) {
            state.loading = true;
            state.getMovieSuccess = false;
        },
        getMovieSuccess(state, payload) {
            let userRating = payload.resData.data;
            state.loading = false;
            state.userRating = userRating;
            state.getMovieSuccess = true;
        },
        getMovieFail(state, payload) { },

        rateMovie(state, payload) {
            state.loading = true;
            state.rateMovieSuccess = false;
        },
        rateMovieSuccess(state, payload) {
            let rate = payload.resData.data;
            state.loading = false;
            state.rate = rate;
            state.rateMovieSuccess = true;
        },
        rateMovieFail(state, payload) { },
    }
});

export const {
    rateMovie,
    rateMovieSuccess,
    rateMovieFail,
    searchMovie,
    searchMovieSuccess,
    searchMovieFail,
    searchTopTen,
    searchTopTenSuccess,
    searchTopTenFail,
    getMovie,
    getMovieSuccess,
    getMovieFail,
} = movieSlice.actions;
export const selectMovie = (state) => state.movie;

export default movieSlice.reducer;
