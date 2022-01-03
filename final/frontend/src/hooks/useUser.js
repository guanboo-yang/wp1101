import { createContext, useContext } from 'react'
import { useDarkMode, useStorage } from '.'

const UserContext = createContext({
	profile: null,
	darkMode: false,
	preGameState: {},
	setProfile: () => {},
	setDarkMode: () => {},
	setPreGameStatus: () => {},
	login: () => {},
	logout: () => {},
})

const UserProvider = ({ children }) => {
	// use localStorage or sessionStorage to store user data?
	const [profile, setProfile, removeProfile] = useStorage('profile', null, window.localStorage)
	const [preGameState, setPreGameState, removePreGameState] = useStorage(
		'pre-game-state',
		{
			// TODO: [CHANGE] let server handle this
			players: [null, null, null, null],
			activeStep: 0,
			gameMode: 0,
			rounds: 3,
			level: 0,
		},
		window.localStorage
	)
	const [darkMode, setDarkMode] = useDarkMode()

	const setPreGameStatus = (key, value) => {
		setPreGameState(prev => ({ ...prev, [key]: value }))
	}

	const login = profile => {
		setProfile(profile)
		setPreGameState({
			// TODO: [CHANGE] ask server for pre-game status
			players: [profile.name, null, null, null],
			activeStep: 0,
			gameMode: 0,
			rounds: 3,
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
				setPreGameStatus,
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
