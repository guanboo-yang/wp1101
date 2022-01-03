import { Box, Typography, Button, Grid, List } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
import { TOTAL_PLAYERS } from '../../constants'
import { swapPlayer } from '../../utils'

const SettingButton = ({ label, text, ...props }) => (
	<Button variant='contained' color='secondary' sx={{ m: 1, display: 'inline' }} {...props}>
		<Box sx={{ fontSize: theme => theme.typography.caption }}>{label}</Box>
		{text}
	</Button>
)

const PreGame = ({ setStart }) => {
	const { preGameState, setPreGameStatus } = useUser()
	const { players, activeStep } = preGameState

	const setActiveStep = step => setPreGameStatus('activeStep', step)
	const setPlayers = players => setPreGameStatus('players', players)

	// TODO: get friends from server
	const friends = [
		{ name: 'Mary', online: true },
		{ name: 'Sandy', online: false },
		{ name: 'Henry', online: true },
		{ name: 'Mike', online: true },
		{ name: 'Rachel', online: true },
	]

	const playersNum = () => players.filter(player => player).length

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

	return (
		<div align='center' className='PreGame'>
			<h1>invite your friend</h1>
			<Grid container spacing={1} alignItems='stretch' sx={{ width: 'min(100%, 750px)' }}>
				<Grid item xs={12} md={8}>
					<Grid container backgroundColor='primary.dark' direction='column' justifyContent='center' alignItems='center' height='100%' sx={{ py: 2 }}>
						<Grid item>
							<SettingButton label='Game Mode' text='Ship Hunter' />
							<SettingButton label='Rounds' text='5 kills' />
							<SettingButton label='Level' text='Random' />
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
							<SettingButton text='leave' />
							<SettingButton text='start' disabled={playersNum() < 2} onClick={setStart} />
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
