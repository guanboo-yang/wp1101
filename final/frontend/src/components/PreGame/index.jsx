import { useState } from 'react'
import { Box, Typography, Button, Grid, List, ListItem, ListItemButton, IconButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { Add } from '@mui/icons-material'
import '../../css/PreGame.css'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import { TOTAL_PLAYERS } from '../../constants'

const Friend = ({ name, online, handleAddPlayers }) => (
	<ListItem
		dense
		secondaryAction={
			online && (
				<IconButton color='secondary' edge='end' onClick={handleAddPlayers}>
					<Add />
				</IconButton>
			)
		}
		disablePadding>
		<ListItemButton>
			<ListItemAvatar>
				<Avatar src={`//joeschmoe.io/api/v1/${name}`} alt='' />
			</ListItemAvatar>
			<ListItemText primary={name} secondary={online ? 'online' : 'offline'} />
		</ListItemButton>
	</ListItem>
)

const SettingButton = ({ label, text, ...props }) => (
	<Button variant='contained' color='secondary' sx={{ m: 1, display: 'inline' }} {...props}>
		<Box sx={{ fontSize: theme => theme.typography.caption }}>{label}</Box>
		{text}
	</Button>
)

const PreGame = ({ setStart }) => {
	const { user } = useUser()
	const [players, setPlayers] = useState([user, null, null, null])
	const [completed, setCompleted] = useState({ 0: true })
	const [activeStep, setActiveStep] = useState(0)
	const friends = [
		{ name: 'Mary', online: true },
		{ name: 'Sandy', online: false },
		{ name: 'Henry', online: true },
		{ name: 'Mike', online: true },
		{ name: 'Rachel', online: false },
	]

	const playersNum = () => {
		return players.filter(player => player).length
	}

	const handleStep = step => () => {
		setCompleted(prev => ({ ...prev, [step]: true, [activeStep]: false }))
		setPlayers(prev => {
			const newPlayers = [...prev]
			newPlayers[step] = newPlayers[activeStep]
			newPlayers[activeStep] = null
			return newPlayers
		})
		setActiveStep(step)
	}

	const handleAddPlayers = ({ players, name }) => {
		if (!players.includes(name)) {
			const index = players.indexOf(null)
			const newCompleted = completed
			if (index !== -1) {
				setPlayers(prev => {
					const newPlayers = [...prev]
					newPlayers[index] = name
					return newPlayers
				})
				newCompleted[index] = true
			} else if (players.length < TOTAL_PLAYERS) {
				newCompleted[players.length] = true
				setPlayers(prev => [...prev, name])
			} else return
			setCompleted(newCompleted)
		}
	}

	return (
		<div align='center' className='PreGame'>
			<h1>invite your friend</h1>
			<Grid container display='flex' backgroundColor='primary.dark' sx={{ width: 'min(100%, 750px)' }}>
				<Grid item xs={12} md={8} sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<Box>
						<SettingButton label='Game Mode' text='Ship Hunter' />
						<SettingButton label='Rounds' text='5 kills' />
						<SettingButton label='Level' text='Random' />
					</Box>
					<Box width='100%'>
						<Players players={players} activeStep={activeStep} completed={completed} handleStep={handleStep} />
					</Box>
					<Box>
						<SettingButton text='leave' />
						<SettingButton text='start' disabled={playersNum() < 2} onClick={setStart} />
					</Box>
				</Grid>
				<Grid item xs={12} md={4} sx={{ py: 2, px: 1 }}>
					<Typography variant='h5'>friends</Typography>
					<SettingButton text='Invite your friends!' variant='text' />
					<List sx={{ overflow: 'auto', height: 250 }}>
						{friends.map(({ name, online }, i) => (
							<Friend key={i} name={name} online={online} players={players} handleAddPlayers={() => handleAddPlayers({ players, name })} />
						))}
					</List>
				</Grid>
			</Grid>
		</div>
	)
}

export default PreGame
