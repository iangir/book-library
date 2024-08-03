import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import './BookForm.css';
import createBook from '../../utils/createBook';
import { setError } from '../../redux/slices/errorSlice';
const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && author) {
			dispatch(addBook(createBook({ title, author }, 'manual')));
			setTitle('');
			setAuthor('');
		} else return dispatch(setError('You must fill title and author!'));
	};

	const addRandomBookHandler = () => {
		const book = createBook(
			{ ...booksData[Math.floor(Math.random() * booksData.length)] }, //spreading random object from books.json
			'random'
		);
		dispatch(addBook(book));
	};

	const addRandomBookViaAPIHandler = async () => {
		try {
			setIsLoading(true);
			await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='app-block book-form'>
			<h2>Add a new book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor='author'>Author: </label>
					<input
						type='text'
						id='author'
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<button type='submit'>Add book</button>
				<button type='button' onClick={addRandomBookHandler}>
					Add random book
				</button>

				<button
					type='button'
					disabled={isLoading}
					onClick={(e) => addRandomBookViaAPIHandler(e)}
				>
					{isLoading ? (
						<>
							<span>Loading book...</span>
							<FaSpinner className='spinner' />
						</>
					) : (
						'Add random book via API'
					)}
				</button>
			</form>
		</div>
	);
};

export default BookForm;
