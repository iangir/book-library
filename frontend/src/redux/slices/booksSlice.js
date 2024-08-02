import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			return [...state, action.payload];
		},
		deleteBook: (state, action) => {
			return state.filter((book) => book.id !== action.payload);
		},
		toggleFavorite: (state, action) => {
			state.forEach((book) => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite;
				}
			}); // --- mutation that immer copes

			// return state.map((book) => --- without mutation
			// 	book.id === action.payload
			// 		? { ...book, isFavorite: !book.isFavorite }
			// 		: book
			// );
		},
	},
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
