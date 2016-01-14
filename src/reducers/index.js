import { combineReducers } from 'redux';
import { grid } from './grid';
import { status } from './status';

const rootReducer = combineReducers({
	grid,
	status
});

export default rootReducer;
