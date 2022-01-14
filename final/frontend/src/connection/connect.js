import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
// import withSnackbar from '../components/Snackbar'

let userProfile = JSON.parse(localStorage.getItem('profile'))

const client = new WebSocket(userProfile ? `ws://localhost:5000?name=${userProfile.name}` : `ws://localhost:5000`, 'echo-protocol')

const useConnection = () => {
	const { login, setFriends, setRoom, room, profile, setPreGameState, setInvitation, setExchangeRequire, setStep } = useUser()
	const navigate = useNavigate()

	client.onmessage = async byteString => {
		const { data } = byteString
		const [task, payLoad] = JSON.parse(data)
		const setPlayers = players => setPreGameState(prev => ({ ...prev, players }))

		switch (task) {
			// Return [userData, friendsData]
			case 'loginSuccess':
				login({ ...payLoad })
				navigate('/')
				break
			case 'createFail':
				console.log('The Username or the Email has been taken')
				break
			case 'loginFail':
				console.log('Wrong Email or Password')
				break
			case 'friendLists':
				let friends = payLoad.filter(user => {
					if (user.name !== profile.name) return user
				})
				friends = friends.sort((x, y) => {
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
				setRoom({roomId: payLoad.roomId, isHost: true})
				break
			case 'updatedPosition':
				setPlayers(payLoad)
				break
			case 'invitation':
				const { roomId, index, inviter, players } = payLoad
				setInvitation({ invite: true, roomId, index, inviter, players })
				break
			case 'gameStart':
				setStep(2)
				break;
			case '':
				break
			default:
				break
		}
	}

	client.onclose = () => {
		console.log('Sorry, you are disconnected, please reload!')
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

	// Game
	const gameStart = ({roomId, players}) => {
		sendData(['gameStart', {roomId, players}])
	}

	const gameEvent = ({roomId, evt, name}) => {
		sendData(['gameEvent', {roomId, evt, name}])
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
    	gameStart,
		gameEvent
	}
}

export { useConnection }
