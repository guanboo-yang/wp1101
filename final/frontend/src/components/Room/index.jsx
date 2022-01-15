import { Box, Typography, Grid, List /* Dialog, DialogTitle, DialogActions */, Input } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import Players from './Players'
import Friend from './Friend'
// TODO: [CHANGE] ask server to send all level information
import { useEffect, useState } from 'react'
import SettingButton from '../SettingButton'
import Message from './Message'
import { useConnection } from '../../connection/connect'
import { Dialog, DialogTitle, DialogActions } from '@mui/material'

const Room = ({ setStep }) => {
	const { profile, preGameState, login, setRoom, friends, room, exchangeRequire, setExchangeRequire } = useUser()
	const [ message, setMessage ] = useState('')
	const { gameMode } = preGameState
	const { leaveRoom, swapPosition, invitePlayer, exchangePosition, gameStart, sendMessage } = useConnection()
	const [openDialog, setOpenDialog] = useState(false)

	// const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))
	// TODO: get friends from server
	// Problem, google photo
	useEffect(()=> {
		console.log(room);
	}, [room])
	const playersNum = () => room.players.filter(player => player).length

	const handleMessage = (e) => {
		if (e.key === 'Enter' && message){
			setMessage('')
			sendMessage({message, send: profile.name, roomId: room.roomId, players: room.players})
		}
	}

	const handleLeave = () => {
		leaveRoom(
			room.roomId,
			room.players.findIndex(player => player === profile.name),
			room.players,
			playersNum()
		)
		setRoom({...room, roomId: null, message: []})
		setOpenDialog(false)
		setStep(-1)
		login()
	}

	const handleStep = step => () => {
		if (room.players.findIndex(player => player === profile.name) )
		swapPosition(
			room.roomId,
			room.players.findIndex(player => player === profile.name),
			step,
			room.players
		)
	}

	const acceptExchange = () => {
		setExchangeRequire({ ...exchangeRequire, state: false })
		exchangePosition(exchangeRequire, room.players)
	}

	const handleAddPlayers = ({ players, name }) => {
		// TODO: [CHANGE] if player id is not in players:
		if (!players.includes(name)) {
			if (playersNum === 4) {
				console.log('The Room has been full')
			} else {
				const index = players.indexOf(null)
				invitePlayer(room.roomId, index, name, profile.name, players)
			}
		}
	}

	const notReadyToGo = () => {
		return false
		// return (gameMode === 2 && playersNum() < 3) || playersNum() < 2
	}

	return (
		<div align='center'>
			<h1>{`Room ${room.roomId}`}</h1>
			<Grid container spacing={1} alignItems='stretch' sx={{ width: 'min(96vw, 1200px)' }}>
				<Grid item xs={12} md={4}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>Chat Room</Typography>
						<List sx={{ m: 1, overflow: 'auto', height: 247 }}>
							{room.message.map(({ name, body }, i) => {
								return <Message name={name} body={body} key={i} />
							})}
						</List>
						<Input placeholder='Type a message...' value={message} type='search' onKeyDown={handleMessage} onChange={(e) => setMessage(e.target.value)}/>
						{/* <Input:Search></Input:Search> */}
					</Box>
				</Grid>
				<Grid item xs={12} md={5}>
					<Grid container backgroundColor='primary.dark' direction='column' justifyContent='center' alignItems='center' height='100%' sx={{ py: 2 }}>
						<Grid item width='100%'>
							<Players
								players={room.players}
								activeStep={room.players.findIndex(player => player === profile.name)}
								completed={room.players.reduce((acc, player, index) => {
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
							<SettingButton disabled={notReadyToGo() || !room.isHost} onClick={() => gameStart({ roomId: room.roomId, players: room.players })}>
								{/* {room.isHost?'Start':'Prepare'} */}
								Start
							</SettingButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={3}>
					<Box backgroundColor='primary.dark' sx={{ py: 2, px: 1 }}>
						<Typography variant='h5'>friends</Typography>
						<SettingButton variant='text'>Invite your friends!</SettingButton>
						<List sx={{ overflow: 'auto', height: 250 }}>
							{friends.map(({ name, image, online }, i) => (
								<Friend key={i} name={name} image={image} online={online} players={room.players} handleAddPlayers={() => handleAddPlayers({ players: room.players, name })} />
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
			<Dialog
				open={exchangeRequire.state}
				onClose={() => setOpenDialog(false)}
				PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>{`${exchangeRequire.name} Wanna exchange spaceship with you`}</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setExchangeRequire({ ...exchangeRequire, state: false })}>reject</SettingButton>
					<SettingButton onClick={acceptExchange} autoFocus>
						Accept
					</SettingButton>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Room
