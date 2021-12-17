import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import Appbar from './components/Appbar'
import Chat from './components/Chat'
import Calender from './components/Calender'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Toolbar, Box } from '@mui/material'
import useDarkMode from './hooks/useDarkMode'

const App = () => {
	const [darkMode, setDarkMode] = useDarkMode()

	const links = [
		{ name: 'Home', path: '/', element: <h1>Home</h1> },
		{ name: 'Chat', path: '/chat', element: <Chat /> },
		{ name: 'Calender', path: '/calender', element: <Calender /> },
	]

	const theme = createTheme({
		typography: {
			fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
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
						primary: {
							main: '#000000',
						},
						secondary: {
							main: '#ffffff',
						},
				  }
				: {
						primary: {
							main: '#ffffff',
						},
						secondary: {
							main: '#123456',
						},
				  }),
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<div className='App' style={{ color: theme.palette.secondary.main, background: theme.palette.primary.main }}>
				<Router>
					<Appbar setDarkMode={setDarkMode} darkMode={darkMode} links={links} />
					<Toolbar />
					<Box component='main' sx={{ p: 3 }}>
						<Routes>
							{links.map(({ name, path, element }) => (
								<Route key={name} path={path} element={element} />
							))}
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Box>
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default App
