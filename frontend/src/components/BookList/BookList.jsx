import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { deleteBook, favoriteToggle } from '../../redux/books/actionCreators';
import './BookList.css';

export const BookList = () => {
	const books = useSelector((state) => state.books);
	const dispatch = useDispatch();

	const deleteHandler = (id) => {
		dispatch(deleteBook(id));
	};

	const favoriteHandler = (id) => {
		dispatch(favoriteToggle(id));
	};

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, i) => (
						<li key={book.id}>
							<div className='book-info'>
								{++i}. {book.title} by <strong>{book.author}</strong>
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
