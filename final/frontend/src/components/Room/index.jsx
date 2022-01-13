import { Box, Typography, Grid, List /* Dialog, DialogTitle, DialogActions */ } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
// TODO: [CHANGE] ask server to send all level information
import { swapPlayers } from '../../utils'
// import { useState } from 'react'
import SettingButton from '../SettingButton'
import Message from './Message'
import { useEffect } from 'react'

const Room = ({ setStep }) => {
	const { profile, preGameState, login, setPreGameState, friends } = useUser()
	const { players, gameMode } = preGameState
	// const [openDialog, setOpenDialog] = useState(false)

	const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))
	// TODO: get friends from server
	// Problem, google photo
	
	// const friends = [
	// 	{ name: '楊冠柏', online: true, image: 'https://lh3.googleusercontent.com/a/AATXAJwLy5Aw_w-MyGVpcBsADA7x14zLhwt_RJE1Pr6E=s96-c' },
	// 	{ name: 'Mary', online: true },
	// 	{ name: 'Sandy', online: false },
	// 	{ name: 'Henry', online: true },
	// 	{ name: 'Mike', online: true },
	// 	{ name: 'Rachel', online: true },
	// ]
    const msgs = [
		{name: 'Tristan',body: 'Hi'},
		{name: 'Eric', body: "What's up"},
		{name: 'Tristan',body: 'Hi'},
		{name: 'Eric', body: "What's up"},
		{name: 'Tristan',body: 'Hi'},
		{name: 'Eric', body: "What's up"},
		{name: 'Tristan',body: 'Hi'},
		{name: 'Eric', body: "What's up"},
		{name: 'Tristan',body: 'Hi'},
		{name: 'Eric', body: "What's up"},
	]

	const playersNum = () => players.filter(player => player).length

	const handleLeave = () => {
		// setOpenDialog(false)
		setStep(-1)
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
		<div align='center'>
			<h1>invite your friend</h1>
			<Grid container spacing={1} alignItems='stretch' sx={{ width: 'min(96vw, 1000px)' }}>
				<Grid item xs={12} md={3}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>Chat Room</Typography>
						<SettingButton text='Invite your friends!' variant='text' />
						<List sx={{ overflow: 'auto', height: 250 }}>
							{
								msgs.map(({name, body}, i) => {
									return <Message name={name} body={body} key={i}/>
								})
							}
						</List>
					</Box>
				</Grid>
                <Grid item xs={12} md={6}>
					<Grid container backgroundColor='primary.dark' direction='column' justifyContent='center' alignItems='center' height='100%' sx={{ py: 2 }}>
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
							<SettingButton onClick={handleLeave}>leave</SettingButton>
							{/* <SettingButton onClick={() => setOpenDialog(true)}>leave</SettingButton> */}
							<SettingButton disabled={notReadyToGo()} onClick={() => setStep(1)}>
								start
							</SettingButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={3}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>friends</Typography>
						<SettingButton text='Invite your friends!' variant='text' />
						<List sx={{ overflow: 'auto', height: 250 }}>
							{friends.map(({ name, image, online }, i) => (
								<Friend key={i} name={name} image={image} online={online} players={players} handleAddPlayers={() => handleAddPlayers({ players, name })} />
							))}
						</List>
					</Box>
				</Grid>
			</Grid>
			{/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>Are you sure you want to leave?</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setOpenDialog(false)}>cancel</SettingButton>
					<SettingButton onClick={handleLeave} autoFocus>
						leave
					</SettingButton>
				</DialogActions>
			</Dialog> */}
		</div>
	)
}

export default Room