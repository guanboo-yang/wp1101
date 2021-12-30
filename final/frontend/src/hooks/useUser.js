import { createContext, useContext } from 'react'
import { useDarkMode, useStorage } from '.'

const UserContext = createContext({
	user: null,
	auth: false,
	darkMode: false,
	setUser: () => {},
	login: () => {},
	logout: () => {},
	setDarkMode: () => {},
})

const UserProvider = ({ children }) => {
	const [user, setUser] = useStorage('user', null, window.localStorage)
	const [auth, setAuth] = useStorage('auth', false, window.localStorage)
	const [darkMode, setDarkMode] = useDarkMode()

	const login = () => {
		return new Promise(resolve => {
			setAuth(true)
			resolve()
		})
	}

	const logout = () => {
		return new Promise(resolve => {
			setAuth(false)
			resolve()
		})
	}

	return (
		<UserContext.Provider //
			value={{
				user,
				auth,
				darkMode,
				setUser,
				login,
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
