import { createContext, useContext, useState } from 'react'
import { useDarkMode, useStorage } from '.'
const UserContext = createContext({
	profile: null,
	darkMode: false,
	preGameState: {},
	friends: [],
	room: {},
	invitation: {},
	exchangeRequire: {},
	step: null,
	clientId: '',
	joinRequire: {},
	setJoinRequire: () => {},
	setClientId: () => {},
	setStep: () => {},
	setExchangeRequire: () => {},
	setInvitation: () => {},
	setRoom: () => {},
	setFriends: () => {},
	setProfile: () => {},
	setDarkMode: () => {},
	setPreGameStatus: () => {},
	login: () => {},
	logout: () => {},
})

const UserProvider = ({ children }) => {
	// use localStorage or sessionStorage to store user data?
	const [clientId, setClientId] = useState('')
	const [friends, setFriends] = useState([])
	const [invitation, setInvitation] = useState({ invite: false, roomId: null, position: null, inviter: null, players: null })
	const [joinRequire, setJoinRequire] = useState({requireNmae: null, state: false})
	const [exchangeRequire, setExchangeRequire] = useState({ from: null, to: null, name: null, state: false })
	const [room, setRoom] = useState({ roomId: null, isHost: true, message: [], players: [null, null, null, null], gameStart: false })
	const [step, setStep] = useState(0)
	const [profile, setProfile, removeProfile] = useStorage('profile', null, window.localStorage)
	// const [players, setPlayers] = useState([null, null, null, null])
	const [preGameState, setPreGameState, removePreGameState] = useStorage(
		'pre-game-state',
		{
			// TODO: [CHANGE] let server handle this
			// players: [null, null, null, null],
			gameMode: 0,
			rounds: 3,
			level: 0,
		},
		window.localStorage
	)
	const [darkMode, setDarkMode] = useDarkMode()

	const login = (prof = profile) => {
		setProfile(prof)
		setPreGameState({
			// TODO: [CHANGE] ask server for pre-game status
			players: [prof.name, null, null, null],
			gameMode: 0,
			rounds: 0,
			level: 0,
		})
	}

	const logout = () => {
		removeProfile()
		removePreGameState()
	}

	return (
		<UserContext.Provider //
			value={{
				profile,
				darkMode,
				preGameState,
				setProfile,
				setDarkMode,
				setPreGameState,
				friends,
				room,
				invitation,
				exchangeRequire,
				step,
				clientId,
				joinRequire,
				setJoinRequire,
				setClientId,
				setStep,
				setExchangeRequire,
				setInvitation,
				setRoom,
				setFriends,
				login,
				logout,
			}}>
			{children}
		</UserContext.Provider>
	)
}

const useUser = () => {
	return useContext(UserContext)
}

export { UserProvider, useUser }
