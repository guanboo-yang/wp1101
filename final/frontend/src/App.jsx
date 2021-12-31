import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Appbar, NotFound, PreGame } from './components'
import { Chat, Playground, Login } from './containers'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Toolbar, Box } from '@mui/material'
import { useUser } from './hooks/useUser'

const RequireAuth = ({ children }) => {
	const { auth } = useUser()
	return auth ? children : <Navigate to='/login' />
}

const App = () => {
	const links = [
		{ name: 'Playground', path: '/', element: <PreGame /> },
		{ name: 'Chat', path: '/chat', element: <Chat /> },
	]

	const { darkMode } = useUser()

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
			background: { paper: 'none' },
			...(darkMode
				? {
						primary: { main: '#123456' },
						secondary: { main: '#ffffff' },
				  }
				: {
						primary: { main: '#ffffff' },
						secondary: { main: '#123456' },
				  }),
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<div className='App' style={{ color: theme.palette.secondary.main, background: theme.palette.primary.main }}>
				<Router>
					<Appbar links={links} />
					<Toolbar />
					<Box component='main'>
						<Routes>
							{links.map(({ name, path, element }) => (
								<Route key={name} path={path} element={<RequireAuth>{element}</RequireAuth>} />
							))}
							<Route path='/login' element={<Login />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Box>
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default App
