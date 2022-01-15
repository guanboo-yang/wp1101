import { useUser } from '../hooks/useUser'
import { useSnackbar } from '../hooks/useSnackbar'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'

let userProfile = JSON.parse(localStorage.getItem('profile'))

const client = new WebSocket(userProfile ? `ws://localhost:5000?name=${userProfile.name}` : `ws://localhost:5000`, 'echo-protocol')

const useConnection = () => {
	const { login, setFriends, setRoom, room, profile, setPreGameState, setInvitation, setExchangeRequire, setStep, setClientId } = useUser()
	const { showMessage } = useSnackbar()
	const { updateGame } = useGame()
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
				console.log(payLoad)
				setClientId(payLoad)
				break
			case 'friendLists':
				const friends = payLoad
					.filter(user => {
						if (user.name !== profile.name) return user
					})
					.sort((x, y) => {
						return x.online === y.online ? 0 : x ? -1 : 1
					})
				console.log(friends)
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
				// setPlayers(payLoad)
				console.log(payLoad)
				setRoom({ ...room, players: payLoad })
				break
			case 'invitation':
				const { roomId, index, inviter, players } = payLoad
				setInvitation({ invite: true, roomId, index, inviter, players })
				break
			case 'gameStart':
				setStep(2)
				break
			case 'newMessage':
				const { message, send } = payLoad
				setRoom({ ...room, message: [...room.message, { body: message, name: send }] })
			case 'gameUpdate':
				// console.log(payLoad)
				updateGame(payLoad)
				break
			case '':
				break
			default:
				console.log('Unknown task:', task, payLoad)
				break
		}
	}

	client.onclose = () => {
		showMessage('Sorry, you are disconnected, please reload!', 'error', 10000)
	}
	// Login Part
	const createAccount = userDatas => {
		sendData(['create', userDatas])
	}

	const loginAccount = userDatas => {
		sendData(['login', userDatas])
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
		sendData(['leaveRoom', { roomId, index, players, playersNum }])
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

	// Game
	const gameStart = ({ roomId, players }) => {
		sendData(['gameStart', { roomId, players }])
	}

	const gameEvent = ({ roomId, evt, name }) => {
		sendData(['gameEvent', { roomId, evt, name }])
	}

	const sendData = data => {
		client.send(JSON.stringify(data))
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
	}
}

export { useConnection }
