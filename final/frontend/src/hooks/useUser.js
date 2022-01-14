import { createContext, useContext, useState } from 'react'
import { useDarkMode, useStorage } from '.'

const UserContext = createContext({
	profile: null,
	darkMode: false,
	preGameState: {},
	friends: [],
	roomId: null,
	invitation: {},
	exchangeRequire: {},
	setExchangeRequire: () => {},
	setInvitation: () => {},
	setRoomId: () => {},
	setFriends: () => {},
	setProfile: () => {},
	setDarkMode: () => {},
	setPreGameStatus: () => {},
	login: () => {},
	logout: () => {},
})

const UserProvider = ({ children }) => {
	// use localStorage or sessionStorage to store user data?
	const [friends, setFriends] = useState([])
	const [invitation, setInvitation] = useState({invite: false, roomId: null, position: null, inviter: null, players: null})
	const [exchangeRequire, setExchangeRequire] = useState({from: null, to: null, name: null, state: false})
	const [roomId, setRoomId] = useState()
	const [profile, setProfile, removeProfile] = useStorage('profile', null, window.localStorage)
	const [preGameState, setPreGameState, removePreGameState] = useStorage(
		'pre-game-state',
		{
			// TODO: [CHANGE] let server handle this
			players: [null, null, null, null],
			gameMode: 0,
			rounds: 3,
			level: 0,
		},
		window.localStorage
	)
	const [darkMode, setDarkMode] = useDarkMode()

	const login = (prof = profile) => {
		console.log('login', prof)
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
				roomId,
				invitation,
				exchangeRequire,
				setExchangeRequire,
				setInvitation,
				setRoomId,
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
