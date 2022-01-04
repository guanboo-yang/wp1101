import { Box, Typography, Button, Grid, List, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
// TODO: [CHANGE] ask server to send all level information
import { MODE, LEVEL } from '../../constants'
import { swapPlayers } from '../../utils'
import { useState } from 'react'

const SettingButton = ({ label, text, ...props }) => (
	<Button variant='contained' color='secondary' sx={{ m: 0.5, display: 'inline' }} {...props}>
		<Box sx={{ fontSize: theme => theme.typography.caption }}>{label}</Box>
		{text}
	</Button>
)

const PreGame = ({ setStart }) => {
	const { profile, preGameState, login, setPreGameState } = useUser()
	const { players, gameMode, rounds, level } = preGameState
	const [openDialog, setOpenDialog] = useState(false)

	const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))
	const increaseGameMode = () => setPreGameState(prev => ({ ...prev, gameMode: (prev.gameMode + 1) % MODE.length }))
	const increaseRounds = () => setPreGameState(prev => ({ ...prev, rounds: (prev.rounds + 1) % MODE[gameMode].rounds.length }))
	const increaseLevel = () => setPreGameState(prev => ({ ...prev, level: (prev.level + 1) % LEVEL.length }))

	// TODO: get friends from server
	const friends = [
		{ name: 'Mary', online: true },
		{ name: 'Sandy', online: false },
		{ name: 'Henry', online: true },
		{ name: 'Mike', online: true },
		{ name: 'Rachel', online: true },
	]

	const playersNum = () => players.filter(player => player).length

	const handleLeave = () => {
		setOpenDialog(false)
		login()
	}

	const handleStep = step => () => {
		// TODO: send request to server, if success:
		swapPlayers(
			players,
			players.findIndex(player => player === profile.name),
			step,
			setPlayers
		)
		// TODO: if fail:
	}

	const handleAddPlayers = ({ players, name }) => {
		// TODO: [CHANGE] if player id is not in players:
		if (!players.includes(name)) {
			// TODO: [CHANGE] ask server to add player:
			const index = players.indexOf(null)
			if (index !== -1) {
				// TODO: [CHANGE] if server response is success:
				const newPlayers = [...players]
				newPlayers[index] = name
				setPlayers(newPlayers)
			} else return
		}
	}

	const notReadyToGo = () => {
		return (gameMode === 2 && playersNum() < 3) || playersNum() < 2
	}

	return (
		<div align='center' className='PreGame'>
			<h1>invite your friend</h1>
			<Grid container spacing={1} alignItems='stretch' sx={{ width: 'min(100%, 750px)' }}>
				<Grid item xs={12} md={8}>
					<Grid container backgroundColor='primary.dark' direction='column' justifyContent='center' alignItems='center' height='100%' sx={{ py: 2 }}>
						<Grid item>
							<SettingButton label='Game Mode' text={MODE[gameMode].name} onClick={increaseGameMode} />
							<SettingButton label='Rounds' text={`${MODE[gameMode].rounds[rounds]} kills`} onClick={increaseRounds} />
							<SettingButton label='Level' text={`${LEVEL[level].name}`} onClick={increaseLevel} />
						</Grid>
						<Grid item width='100%'>
							<Players
								players={players}
								activeStep={players.findIndex(player => player === profile.name)}
								completed={players.reduce((acc, player, index) => {
									if (player) acc[index] = true
									return acc
								}, {})}
								handleStep={handleStep}
								teamMode={gameMode === 2}
							/>
						</Grid>
						<Grid item>
							<SettingButton text='leave' onClick={() => setOpenDialog(true)} />
							<SettingButton text='start' disabled={notReadyToGo()} onClick={setStart} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>friends</Typography>
						<SettingButton text='Invite your friends!' variant='text' />
						<List sx={{ overflow: 'auto', height: 250 }}>
							{friends.map(({ name, online }, i) => (
								<Friend key={i} name={name} online={online} players={players} handleAddPlayers={() => handleAddPlayers({ players, name })} />
							))}
						</List>
					</Box>
				</Grid>
			</Grid>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>Are you sure you want to leave?</DialogTitle>
				<DialogActions>
					<SettingButton text='cancel' onClick={() => setOpenDialog(false)} />
					<SettingButton text='leave' onClick={handleLeave} autoFocus />
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default PreGame
