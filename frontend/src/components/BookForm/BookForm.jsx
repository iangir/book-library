import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import './BookForm.css';
import createBook from '../../utils/createBook';
import { setError } from '../../redux/slices/errorSlice';
const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
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

	const addRandomBookViaAPIHandler = () => {
		dispatch(fetchBook('http://localhost:5000/random-book'));
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
				<button type='button' onClick={(e) => addRandomBookViaAPIHandler(e)}>
					Add random book via API
				</button>
			</form>
		</div>
	);
};

export default BookForm;
