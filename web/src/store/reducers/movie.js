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

        addFavourite(state, payload) {
            state.loading = true;
            state.addFavouriteSuccess = false;
        },
        addFavouriteSuccess(state, payload) {
            let rate = payload.resData.data;
            state.loading = false;
            state.rate = rate;
            state.addFavouriteSuccess = true;
        },
        addFavouriteFail(state, payload) { },

        getFavourite(state, payload) {
            state.loading = true;
            state.getFavouriteSuccess = false;
        },
        getFavouriteSuccess(state, payload) {
            let userFavourite = payload.resData.data;
            state.loading = false;
            state.userFavourite = userFavourite;
            state.getFavouriteSuccess = true;
        },
        getFavouriteFail(state, payload) { },

        getAllCategories(state, payload) {
            state.loading = true,
                state.getAllCategoriesSuccess = false;
        },
        getAllCategoriesSuccess(state, payload) {
            let getAllCategories = payload.resData.data;
            state.loading = false;
            state.getAllCategories = getAllCategories;
            state.getAllCategoriesSuccess = true;
        },
        getAllCategoriesFail(state, payload) { },
    }
});

export const {
    rateMovie,
    rateMovieSuccess,
    rateMovieFail,
    addFavourite,
    addFavouriteSuccess,
    addFavouriteFail,
    searchMovie,
    searchMovieSuccess,
    searchMovieFail,
    searchTopTen,
    searchTopTenSuccess,
    searchTopTenFail,
    getMovie,
    getMovieSuccess,
    getMovieFail,
    getFavourite,
    getFavouriteSuccess,
    getFavouriteFail,
    getAllCategories,
    getAllCategoriesSuccess,
    getAllCategoriesFail,
} = movieSlice.actions;
export const selectMovie = (state) => state.movie;

export default movieSlice.reducer;
