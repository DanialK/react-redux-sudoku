import React from 'react';
import Box from './Box';

/* Grid Component */
const Grid = React.createClass({
	render() {
		const {grid, status} = this.props;
		const {isSolved} = status;
		const renderBox = (row, val, col) => {
			return (
				<Box
					key={col}
					row={row}
					col={col}
					val={val}
					isSolved={isSolved}
					{...this.props}
				/>
			);
		};
		const renderRow = (vals, row) => {
			return (
				<tr key={row}>
					{vals.map(renderBox.bind(this, row))}
				</tr>
			);			
		};

		return (
			<table>
				<tbody>
					{grid.map(renderRow)}
				</tbody>
			</table>

		);
	}
});

export default Grid;
