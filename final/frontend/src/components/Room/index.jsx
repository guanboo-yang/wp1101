import { Box, Typography, Grid, List /* Dialog, DialogTitle, DialogActions */ } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
// TODO: [CHANGE] ask server to send all level information
import { useState } from 'react'
import SettingButton from '../SettingButton'
import Message from './Message'
import {useConnection} from '../../connection/connect'
import { Dialog, DialogTitle, DialogActions } from '@mui/material'

const Room = ({ setStep }) => {
	const { profile, preGameState, login, setPreGameState, friends, roomId, invitation, setInvitation, exchangeRequire, setExchangeRequire, setRoomId } = useUser()
	const { players, gameMode } = preGameState
	const { leaveRoom, swapPosition, invitePlayer, acceptInvitation, exchangePosition } = useConnection()
	const [openDialog, setOpenDialog] = useState(false)

	const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))
	// TODO: get friends from server
	// Problem, google photo
	
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
		leaveRoom(roomId, players.findIndex(player => player === profile.name), players, playersNum())
		setOpenDialog(false)
		setStep(-1)
		login()
	}

	const acceptInvite = () => {
		setRoomId(invitation.roomId)
		setInvitation({...invitation, invite: false})
		acceptInvitation(invitation)
	}

	const handleStep = step => () => {
		swapPosition(roomId, players.findIndex(player => player === profile.name), step, players)
	}

	const acceptExchange = () => {
		setExchangeRequire({...exchangeRequire, state: false})
		exchangePosition(exchangeRequire, players)
	}

	const handleAddPlayers = ({ players, name }) => {
		// TODO: [CHANGE] if player id is not in players:
		if (!players.includes(name)) {
			if (playersNum === 4){
				console.log('The Room has been full');
			}else{
				const index = players.indexOf(null)
				invitePlayer(roomId, index, name, profile.name, players)
			}
		}
	}

	const notReadyToGo = () => {
		return false
		return (gameMode === 2 && playersNum() < 3) || playersNum() < 2
	}

	return (
		<div align='center'>
			<h1>{`Room ${roomId}`}</h1>
			<Grid container spacing={1} alignItems='stretch' sx={{ width: 'min(96vw, 1000px)' }}>
				<Grid item xs={12} md={3}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>Chat Room</Typography>
						<SettingButton text='Invite your friends!' variant='text' />
						<List sx={{ overflow: 'auto', height: 250 }}>
							{msgs.map(({ name, body }, i) => {
								return <Message name={name} body={body} key={i} />
							})}
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
							{/* <SettingButton onClick={handleLeave}>leave</SettingButton> */}
							<SettingButton onClick={() => setOpenDialog(true)}>leave</SettingButton>
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
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>Are you sure you want to leave?</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setOpenDialog(false)}>cancel</SettingButton>
					<SettingButton onClick={handleLeave} autoFocus>
						leave
					</SettingButton>
				</DialogActions>
			</Dialog>
			<Dialog open={invitation.invite} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>{`${invitation.inviter} invites you to the Room ${invitation.roomId}`}</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setInvitation({...invitation, invite: false})}>reject</SettingButton>
					<SettingButton onClick={acceptInvite} autoFocus>
						Accept 
					</SettingButton>
				</DialogActions>
			</Dialog>
			<Dialog open={exchangeRequire.state} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>{`${exchangeRequire.name} Wanna exchange spaceship with you`}</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setExchangeRequire({...exchangeRequire, state: false})}>reject</SettingButton>
					<SettingButton onClick={acceptExchange} autoFocus>
						Accept 
					</SettingButton>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Room
