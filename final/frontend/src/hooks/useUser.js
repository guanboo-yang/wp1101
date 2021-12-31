import { createContext, useContext } from 'react'
import { useDarkMode, useStorage } from '.'

const UserContext = createContext({
	user: null,
	profile: null,
	darkMode: false,
	setUser: () => {},
	setProfile: () => {},
	logout: () => {},
	setDarkMode: () => {},
})

const UserProvider = ({ children }) => {
	const [user, setUser] = useStorage('user', null, window.localStorage)
	const [profile, setProfile] = useStorage('profile', null, window.localStorage)
	const [darkMode, setDarkMode] = useDarkMode()

	const logout = () => {
		setProfile(undefined)
	}

	return (
		<UserContext.Provider //
			value={{
				user,
				profile,
				darkMode,
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
