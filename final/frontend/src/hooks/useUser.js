import { createContext, useContext, useState } from 'react'

const UserContext = createContext({
	user: null,
	// setUser: () => {},
})

const UserProvider = ({ children }) => {
	const [user, setUser] = useState('tristan')

	return <UserContext.Provider value={{ user /* setUser */ }}>{children}</UserContext.Provider>
}

const useUser = () => {
	return useContext(UserContext)
}

export { UserProvider, useUser }
