import { Box, Typography, Button, Grid, List } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
// TODO: [CHANGE] ask server to send all level information
import { MODE, LEVEL } from '../../constants'
import { swapPlayer } from '../../utils'

const SettingButton = ({ label, text, ...props }) => (
	<Button variant='contained' color='secondary' sx={{ m: 0.5, display: 'inline' }} {...props}>
		<Box sx={{ fontSize: theme => theme.typography.caption }}>{label}</Box>
		{text}
	</Button>
)

const PreGame = ({ setStart }) => {
	const { preGameState, login, setPreGameStatus } = useUser()
	const { players, activeStep, gameMode, rounds, level } = preGameState

	const setActiveStep = step => setPreGameStatus('activeStep', step)
	const setPlayers = players => setPreGameStatus('players', players)
	const setGameMode = gameMode => setPreGameStatus('gameMode', gameMode)
	const setRounds = rounds => setPreGameStatus('rounds', rounds)
	const setLevel = level => setPreGameStatus('level', level)

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
		window.confirm('Are you sure you want to leave?') && login()
	}

	const handleStep = step => () => {
		// TODO: send request to server, if success:
		swapPlayer(players, activeStep, step, setPlayers, setActiveStep)
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
							<SettingButton label='Game Mode' text={MODE[gameMode].name} onClick={() => setGameMode((gameMode + 1) % 3)} />
							<SettingButton label='Rounds' text={`${MODE[gameMode].rounds[rounds]} kills`} onClick={() => setRounds((rounds + 1) % 3)} />
							<SettingButton label='Level' text={`${LEVEL[level].name}`} onClick={() => setLevel((level + 1) % LEVEL.length)} />
						</Grid>
						<Grid item width='100%'>
							<Players
								players={players}
								activeStep={activeStep}
								completed={players.reduce((acc, player, index) => {
									if (player) acc[index] = true
									return acc
								}, {})}
								handleStep={handleStep}
							/>
						</Grid>
						<Grid item>
							<SettingButton text='leave' onClick={handleLeave} />
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
		</div>
	)
}

export default PreGame
