import { createContext, useContext, useState } from 'react'
import { useDarkMode } from '.'

const UserContext = createContext({
	user: null,
	darkMode: false,
	setUser: () => {},
	setDarkMode: () => {},
})

const UserProvider = ({ children }) => {
	const [user, setUser] = useState('tristan')
	const [darkMode, setDarkMode] = useDarkMode()

	return (
		<UserContext.Provider //
			value={{
				user,
				darkMode,
				setUser,
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
