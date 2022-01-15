import { Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { LEVEL, MODE } from '../constant'
import { useUser } from '../hooks/useUser'
import SettingButton from './SettingButton'
import { useConnection } from 'connection/connect'

const Mode = ({ setStart }) => {
	const { requireFriend, createRoom } = useConnection()
	const { preGameState, setPreGameState, room, profile, setRoom } = useUser()
	const { gameMode, rounds, level } = preGameState
	const [rommID, setRommID] = useState(null)

	const increaseGameMode = () => setPreGameState(prev => ({ ...prev, gameMode: (prev.gameMode + 1) % MODE.length }))
	const increaseRounds = () => setPreGameState(prev => ({ ...prev, rounds: (prev.rounds + 1) % MODE[gameMode].rounds.length }))
	const increaseLevel = () => setPreGameState(prev => ({ ...prev, level: (prev.level + 1) % LEVEL.length }))

	const handleCreateRoom = () => {
		// TODO: create room with { gameMode, rounds, level }
		setRoom({...room, players: [profile.name, null, null, null]})
		createRoom({gameMode, rounds, level})	
		requireFriend()
		setStart()
	}

	const handleJoinRoom = () => {
		if (!rommID) return
		// TODO: join room with { roomId }
	}

	return (
		<>
			<h1>Choose Mode</h1>
			<Grid container backgroundColor='primary.dark' direction='column' sx={{ p: 3, width: 'min(96vw, 350px)', alignItems: 'center', justifyContent: 'center' }}>
				<Grid item width='100%'>
					<SettingButton fullWidth sx={{ my: 0.5, display: 'inline' }} label='Game Mode' onClick={increaseGameMode}>
						{MODE[gameMode].name}
					</SettingButton>
					<SettingButton fullWidth sx={{ my: 0.5, display: 'inline' }} label='Rounds' onClick={increaseRounds}>
						{`${MODE[gameMode].rounds[rounds]} kills`}
					</SettingButton>
					<SettingButton fullWidth sx={{ my: 0.5, display: 'inline' }} label='Level' onClick={increaseLevel}>
						{LEVEL[level].name}
					</SettingButton>
				</Grid>
				<Grid item>
					<SettingButton onClick={handleCreateRoom}>create room</SettingButton>
				</Grid>
				<Grid item>
					<TextField variant='standard' margin='dense' label='Room ID' color='secondary' fullWidth onChange={e => setRommID(e.target.value)} />
					<SettingButton onClick={handleJoinRoom}>join</SettingButton>
				</Grid>
			</Grid>
		</>
	)
}

export default Mode
