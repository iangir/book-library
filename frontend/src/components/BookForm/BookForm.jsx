import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/actionCreators';
import booksData from '../../data/books.json';
import './BookForm.css';
import createBook from '../../utils/createBook';

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && author) {
			dispatch(addBook(createBook({ title, author })));
			setTitle('');
			setAuthor('');
		}
	};

	const addRandomBookHandler = (e) => {
		e.preventDefault();
		const book = createBook(
			{ ...booksData[Math.floor(Math.random() * booksData.length)] } //spreading random object from books.json
		);
		dispatch(addBook(book));
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
				<button type='button' onClick={(e) => addRandomBookHandler(e)}>
					Add random book
				</button>
			</form>
		</div>
	);
};

export default BookForm;
