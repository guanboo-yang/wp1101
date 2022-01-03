import { useState, createContext, useContext } from 'react'
import { useDarkMode, useStorage } from '.'

const UserContext = createContext({
	user: null,
	profile: null,
	darkMode: false,
	preGameState: {},
	setUser: () => {},
	setProfile: () => {},
	logout: () => {},
	setDarkMode: () => {},
})

const UserProvider = ({ children }) => {
	const [user, setUser] = useStorage('user', null, window.localStorage)
	const [profile, setProfile] = useStorage('profile', null, window.localStorage)
	const [darkMode, setDarkMode] = useDarkMode()
	// for PreGame
	const [players, setPlayers] = useState([user, null, null, null])
	const [completed, setCompleted] = useState({ 0: true })
	const [activeStep, setActiveStep] = useState(0)
	const preGameState = { players, completed, activeStep, setPlayers, setCompleted, setActiveStep }

	const logout = () => {
		setProfile(undefined)
	}

	return (
		<UserContext.Provider //
			value={{
				user,
				profile,
				darkMode,
				preGameState,
				setUser,
				setProfile,
				logout,
				setDarkMode,
			}}>
			{children}
		</UserContext.Provider>
	)
}

const useUser = () => {
	return useContext(UserContext)
}

export { UserProvider, useUser }
