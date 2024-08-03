import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { deleteBook, toggleFavorite } from '../../redux/slices/booksSlice';
import {
	selectFilterAuthor,
	selectFilterFavorite,
	selectFilterTitle,
} from '../../redux/slices/filterSlice';
import './BookList.css';

export const BookList = () => {
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books);
	const titleFilter = useSelector(selectFilterTitle);
	const authorFilter = useSelector(selectFilterAuthor);
	const favoriteFilter = useSelector(selectFilterFavorite);

	const filteredBooks = books.filter((book) => {
		return (
			book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
			book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
			(favoriteFilter ? book.isFavorite : true)
		);
	});

	const deleteHandler = (id) => {
		dispatch(deleteBook(id));
	};

	const favoriteHandler = (id) => {
		dispatch(toggleFavorite(id));
	};

	const highlightMatch = (text, filter) => {
		if (!filter) return text;

		const regex = new RegExp(`(${filter})`, 'gi');
		return text.split(regex).map((substring, i) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span key={i} className='highlight'>
						{substring}
					</span>
				);
			} else return substring;
		});
	};

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, i) => (
						<li key={book.id}>
							<div className='book-info'>
								{++i}. {highlightMatch(book.title, titleFilter)} by{' '}
								<strong>{highlightMatch(book.author, authorFilter)}</strong> (
								{book.source})
							</div>
							<div className='book-actions'>
								<span onClick={() => favoriteHandler(book.id)}>
									{book.isFavorite ? (
										<BsBookmarkStarFill className='star-icon' />
									) : (
										<BsBookmarkStar className='star-icon' />
									)}
								</span>
								<button onClick={() => deleteHandler(book.id)}>Delete</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default BookList;
