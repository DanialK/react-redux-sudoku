import cloneDeep from 'lodash/cloneDeep';
import { default as extend } from 'lodash/assignIn';
import { solver } from '../utils/sudoku';

const initialState = [
	[8, 0, 0, 4, 0, 6, 0, 0, 7],
	[0, 0, 0, 0, 0, 0, 4, 0, 0],
	[0, 1, 0, 0, 0, 0, 6, 5, 0],
	[5, 0, 9, 0, 3, 0, 7, 8, 0],
	[0, 0, 0, 0, 7, 0, 0, 0, 0],
	[0, 4, 8, 0, 2, 0, 1, 0, 3],
	[0, 5, 2, 0, 0, 0, 0, 9, 0],
	[0, 0, 1, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 9, 0, 2, 0, 0, 5]
];

window.gridHistory = window.gridHistory || [];

export function grid(state = cloneDeep(initialState), action) {
	switch (action.type) {
		case 'INPUT_VALUE':
			let {row, col, val} = action;
			let changedRow = [
				...state[row].slice(0, col),
				val,
				...state[row].slice(col + 1)
			]; // Omit using splice since it mutates the state
			gridHistory.push(state);		
			return [
				...state.slice(0, row),
				changedRow,
				...state.slice(row + 1)
			];
		case 'SOLVE':
			let originalClone = cloneDeep(initialState); // originalClone will be mutated by solver()
			solver(originalClone);
			window.gridHistory = [];
			return originalClone;
		case 'CLEAR':
			window.gridHistory = [];
			return cloneDeep(initialState);
		case 'UNDO':
			let lastState = window.gridHistory.splice(gridHistory.length - 1, 1);
			return lastState[0]; 
		default:
			return state;
	}
}
