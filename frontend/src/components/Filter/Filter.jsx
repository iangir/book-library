import { useDispatch, useSelector } from 'react-redux';
import {
	setTitleFilter,
	selectFilterTitle,
	resetFilters,
} from '../../redux/slices/filterSlice';
import './Filter.css';

export const Filter = () => {
	const dispatch = useDispatch();
	const filterTitle = useSelector(selectFilterTitle);

	const handleTitleFilterChange = (e) => {
		dispatch(setTitleFilter(e.target.value));
	};

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
						placeholder='Filter'
						onChange={handleTitleFilterChange}
					/>
				</div>
				<button onClick={resetHandler}>Reset filters</button>
			</div>
		</div>
	);
};

export default Filter;
