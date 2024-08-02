import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	title: '',
	author: '',
	onlyFavorite: false,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setTitleFilter: (state, action) => {
			state.title = action.payload; //- this is valid due to immer library
			// return { ...state, title: action.payload };
		},
		setAuthorFilter: (state, action) => {
			state.author = action.payload;
		},
		setFavoriteFilter: (state) => {
			state.onlyFavorite = !state.onlyFavorite;
		},
		resetFilters: () => {
			return initialState;
		},
	},
});

export const {
	setTitleFilter,
	setAuthorFilter,
	setFavoriteFilter,
	resetFilters,
} = filterSlice.actions;

export const selectFilterTitle = (state) => state.filter.title;
export const selectFilterAuthor = (state) => state.filter.author;
export const selectFilterFavorite = (state) => state.filter.onlyFavorite;

export default filterSlice.reducer;
