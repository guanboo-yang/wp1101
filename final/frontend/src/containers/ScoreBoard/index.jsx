import React from 'react'
import {Table, Grid} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useUser } from 'hooks/useUser'

const ScoreBoard = () => {
	const {score} = useUser()
    return (
		<>
			<h1>ScoreBoard</h1>
			<Grid sx={{direction: 'column', justifyContent: 'center', textAlign: 'center', height: '60vh', overflow: 'scroll'}}>
				<TableContainer component={Paper} sx={{
					width: '100vh'
				}}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell align="right">Wins</TableCell>
							<TableCell align="right">Loses</TableCell>
							<TableCell align="right">Kill</TableCell>
							<TableCell align="right">Rates</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{score?score.scores.map((row, i) => (
							<TableRow
							key={i}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.wins}</TableCell>
							<TableCell align="right">{row.loses}</TableCell>
							<TableCell align="right">{row.kills}</TableCell>
							<TableCell align="right">{(row.rates * 100) + '%'}</TableCell>
							</TableRow>
						)): <h2>Please Wait</h2>}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</>
    )
}

export default ScoreBoard
