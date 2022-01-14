import { createContext, useContext, useState } from 'react'

const SnackbarContext = createContext({
	showMessage: () => {},
})

const SnackbarProvider = ({ children }) => {
	const [snackbarOption, setSnackbarOption] = useState({
		open: false,
		message: '',
		severity: 'success',
	})

	const showMessage = (message, severity = 'success') => {
		setSnackbarOption({
			open: true,
			message,
			severity,
		})
	}

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') return
		setSnackbarOption({
			open: false,
			message: '',
			severity: 'success',
		})
	}

	return (
		<>
			<SnackbarContext.Provider
				value={{
					snackbarOption,
					showMessage,
					handleCloseSnackbar,
				}}>
				{children}
			</SnackbarContext.Provider>
		</>
	)
}

const useSnackbar = () => {
	return useContext(SnackbarContext)
}

export { SnackbarProvider, useSnackbar }
