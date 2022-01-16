import { useUser } from '../hooks/useUser'
import { useSnackbar } from '../hooks/useSnackbar'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'

let userProfile = JSON.parse(localStorage.getItem('profile'))

const client = new WebSocket(userProfile ? `${process.env.REACT_APP_WEBSOCKET_URL}?name=${userProfile.name}` : process.env.REACT_APP_WEBSOCKET_URL, 'echo-protocol')

const useConnection = () => {
	const { login, setFriends, setRoom, room, profile, isHost, setInvitation, setExchangeRequire, setStep, setClientId, setJoinRequire } = useUser()
	const { showMessage } = useSnackbar()
	const { updateGame, setReady } = useGame()
	const navigate = useNavigate()

	client.onopen = () => {
		showMessage('Connected Successfully', 'success', 2000)
	}

	client.onmessage = async byteString => {
		const { data } = byteString
		const [task, payLoad] = JSON.parse(data)
		// const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))

		switch (task) {
			// Return [userData, friendsData]
			case 'loginSuccess':
				login({ ...payLoad })
				navigate('/')
				break
			case 'createFail':
				showMessage('The Username or the Email has been taken', 'error', 2000)
				break
			case 'loginFail':
				showMessage('Wrong Email or Password', 'error', 2000)
				break
			case 'getClientId':
				setClientId(payLoad)
				break
			case 'friendLists':
				const friends = payLoad
					.filter(user => user.name !== profile.name)
					.sort((a, b) => {
						return b.online - a.online
					})
				setFriends(friends)
				break
			case 'exchagePos':
				const { from, to, name } = payLoad
				setExchangeRequire({ state: true, from, to, name })
				break
			case 'roomCreated':
				setRoom({ ...room, roomId: payLoad.roomId, isHost: true })
				break
			case 'updatedPosition':
				setStep(1)
				if (payLoad.newHost) {
					setRoom({ ...room, players: payLoad.players, isHost: payLoad.newHost === profile.name })
				} else {
					setRoom({ ...room, players: payLoad.players })
				}
				break
			case 'updateRoom':
				setStep(1)
				setRoom({...room, roomId: payLoad.roomId})
				break;
			case 'invitation':
				const { roomId, index, inviter, players } = payLoad
				setInvitation({ invite: true, roomId, index, inviter, players })
				break
			case 'gameStart':
				setRoom({ ...room, gameStart: true })
				setStep(2)
				break
			case 'newMessage':
				const { message, send } = payLoad
				setRoom({ ...room, message: [...room.message, { body: message, name: send }] })
				break
			case 'gameUpdate':
				updateGame(payLoad)
				break
			case 'emptyRoom':
				showMessage("Sorry~ We can't find the room....", 'error', 2000)
				break
			case 'fullRoom':
				showMessage('Sorry~ The room is full....', 'error', 2000)
			case 'wannaJoin':
				setJoinRequire({ requireName: payLoad.name, state: true })
				break
			case 'disconnect':
				let newList = room.players.map(name => {
					return name === payLoad.name ? null : name
				})
				console.log(newList)
				setRoom({ ...room, players: newList })
				break
			case 'gameReady':
				setReady(payLoad)
				break
			case 'gameOver':
				setStep(3)
				break
			default:
				console.log('Unknown task:', task, payLoad)
				break
		}
	}

	client.onclose = () => {
		if (room.roomId) {
			leaveRoom(
				room.roomId,
				room.players.findIndex(player => player === profile.name),
				room.players,
				room.players.filter(player => player).length
			)
		}
		showMessage('Sorry, you are disconnected, please reload!', 'error', 10000)
	}
	// Login Part
	const createAccount = ({ name, email, password }) => {
		sendData(['create', { name, email, password }])
	}

	const loginAccount = ({ email, password }) => {
		sendData(['login', { email, password }])
	}

	const loginWithGoogle = userDatas => {
		sendData([
			'googleLogin',
			{
				name: userDatas.name,
				email: userDatas.email,
				image: userDatas.imageUrl,
			},
		])
	}
	// Require friends part
	const requireFriend = () => {
		sendData(['requireFriends', null])
	}
	// Rooms
	const swapPosition = (roomId, from, to, players) => {
		sendData(['swapPosition', { roomId, from, to, players }])
	}

	const createRoom = ({ gameMode, rounds, level }) => {
		sendData(['createRoom', { name: profile.name, gameMode: gameMode, rounds: rounds, level: level }])
	}

	const leaveRoom = (roomId, index, players, playersNum) => {
		sendData(['leaveRoom', { roomId, index, players, playersNum, name: profile.name }])
	}

	const invitePlayer = (roomId, index, name, inviter, players) => {
		sendData(['invitePlayer', { roomId, index, name, inviter, players }])
	}

	const acceptInvitation = ({ roomId, index, players }) => {
		sendData(['acceptInvitation', { roomId, index, name: profile.name, players }])
	}

	const exchangePosition = ({ from, to }, players) => {
		sendData(['acceptExchange', { from, to, roomId: room.roomId, players }])
	}

	const sendMessage = ({ players, roomId, message, send }) => {
		sendData(['newMessage', { players, roomId, send, message }])
	}

	const joinRoom = ({ roomId }) => {
		sendData(['joinRoom', { roomId, name: profile.name }])
	}
	// Game
	const gameStart = ({ roomId, players }) => {
		sendData(['gameStart', { roomId, players }])
	}

	const gameEvent = ({ roomId, evt, name }) => {
		sendData(['gameEvent', { roomId, evt, name, index: room.players.findIndex(player => player === profile.name) }])
	}

	const agreeRequire = ({ name, roomId, players }) => {
		sendData(['acceptRequire', { name, roomId, players }])
	}

	const logoutCase = () => {
		client.send([JSON.stringify(['logout', { name: profile.name }])])
	}

	const sendData = data => {
		try {
			client.send(JSON.stringify(data))
		} catch (error) {
			showMessage('WebSocket is in CLOSING or CLOSED state.', 'error', 10000)
		}
	}

	return {
		createAccount,
		loginAccount,
		requireFriend,
		loginWithGoogle,
		createRoom,
		leaveRoom,
		invitePlayer,
		swapPosition,
		acceptInvitation,
		exchangePosition,
		sendMessage,
		gameStart,
		gameEvent,
		joinRoom,
		agreeRequire,
		logoutCase,
	}
}

export { useConnection }
