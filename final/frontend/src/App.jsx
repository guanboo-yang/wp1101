import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Appbar, NotFound } from './components'
import { Chat, Playground, Login, ScoreBoard } from './containers'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Toolbar, Box, Snackbar, Alert } from '@mui/material'
import { useUser } from './hooks/useUser'
// import SettingButton from 'components/SettingButton'
import { useSnackbar } from './hooks/useSnackbar'

const RequireAuth = ({ children }) => {
	const { profile } = useUser()
	return profile ? children : <Navigate to='/login' />
}

const App = () => {
	const links = [
		{ name: 'Playground', path: '/', element: <Playground /> },
		{ name: 'Chat', path: '/chat', element: <Chat /> },
		{ name: 'Scoreboard', path: '/scoreboard', element: <ScoreBoard /> },
	]
	const { darkMode } = useUser()
	const { snackbarOption, handleCloseSnackbar } = useSnackbar()

	const theme = createTheme({
		typography: {
			fontFamily: '"Bungee", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 14,
			fontWeightLight: 400,
			fontWeightRegular: 500,
			fontWeightMedium: 600,
			fontWeightBold: 700,
		},
		palette: {
			mode: darkMode ? 'dark' : 'light',
			...(darkMode
				? {
						primary: { main: '#1f5469' },
						secondary: { main: '#ffffff' },
						background: { paper: '#1f5469e9', dark: '#26c8bc' },
				  }
				: {
						primary: { main: '#ffffff', dark: '#91d2c2' },
						secondary: { main: '#1f5469' },
						background: { paper: '#ffffffe9', dark: '#1f5469' },
				  }),
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<div className='App' style={{ height: '100vh', overflow: 'auto' }}>
				<Router>
					<Appbar links={links} />
					<Toolbar />
					<Box component='main' style={{ color: theme.palette.secondary.main, background: theme.palette.primary.main }}>
						<Routes>
							{links.map(({ name, path, element }) => (
								<Route key={name} path={path} element={<RequireAuth>{element}</RequireAuth>} />
							))}
							<Route path='/login' element={<Login />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Box>
					{/* hide on md and above */}
					<Box display={{ xs: 'block', md: 'none' }}>
						<Toolbar />
					</Box>
				</Router>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={snackbarOption.open}
					autoHideDuration={1000}
					onClose={handleCloseSnackbar}>
					<Alert elevation={6} variant='filled' onClose={handleCloseSnackbar} severity={snackbarOption.severity}>
						{snackbarOption.message}
					</Alert>
				</Snackbar>
			</div>
		</ThemeProvider>
	)
}

export default App
