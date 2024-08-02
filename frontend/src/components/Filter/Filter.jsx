import { useDispatch, useSelector } from 'react-redux';
import {
	setTitleFilter,
	setAuthorFilter,
	setFavoriteFilter,
	selectFilterTitle,
	selectFilterAuthor,
	selectFilterFavorite,
	resetFilters,
} from '../../redux/slices/filterSlice';
import './Filter.css';

export const Filter = () => {
	const dispatch = useDispatch();
	const filterTitle = useSelector(selectFilterTitle);
	const filterAuthor = useSelector(selectFilterAuthor);
	const filterFavorite = useSelector(selectFilterFavorite);

	const handleTitleFilterChange = (e) => {
		dispatch(setTitleFilter(e.target.value));
	};

	const handleAuthorFilterChange = (e) => {
		dispatch(setAuthorFilter(e.target.value));
	};

	const handleFavoriteFilterChange = () => dispatch(setFavoriteFilter());

	const resetHandler = () => {
		dispatch(resetFilters());
	};

	return (
		<div className='app-block filter'>
			<div className='filter-row'>
				<div className='filter-group'>
					<input
						type='text'
						value={filterTitle}
						placeholder='Title'
						onChange={handleTitleFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<input
						type='text'
						value={filterAuthor}
						placeholder='Author'
						onChange={handleAuthorFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<label>
						<input
							type='checkbox'
							checked={filterFavorite}
							onChange={handleFavoriteFilterChange}
						/>
						Only favorite
					</label>
				</div>

				<button onClick={resetHandler}>Reset filters</button>
			</div>
		</div>
	);
};

export default Filter;
