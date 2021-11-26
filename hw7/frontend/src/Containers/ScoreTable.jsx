import { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const ScoreTable = ({ table, requestSort, active, setActive, handleAdd }) => {
	const [direction, setDirection] = useState('asc')

	const handleClick = () => {
		let direct = direction
		if (active) direct = direction === 'asc' ? 'desc' : 'asc'
		setDirection(direct)
		requestSort(direct)
		setActive(true)
	}

	return (
		<TableContainer component={Paper} style={{ width: '55%' }}>
			<Table stickyHeader aria-label='table'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Subject</TableCell>
						<TableCell>
							<TableSortLabel active={active} direction={direction} onClick={handleClick}>
								Score
							</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{table.map((row, index) => (
						<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell>{row.subject}</TableCell>
							<TableCell>{row.score}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ScoreTable
