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

	const theme = createTheme({
		typography: {
			fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
			fontSize: 16,
			fontWeightLight: 400,
			fontWeightRegular: 500,
			fontWeightMedium: 600,
			fontWeightBold: 700,
		},
		palette: {
			// primary: {
			// 	main: '#00bcd4',
			// },
			secondary: {
				main: '#ffffff',
			},
			mode: darkMode ? 'dark' : 'light',
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Router>
					<Appbar setDarkMode={setDarkMode} darkMode={darkMode} />
					<Toolbar />
					<Box component='main' sx={{ p: 3 }}>
						<Routes>
							<Route path='/' element={<h1>Home</h1>} />
							<Route exact path='/chat' element={<Chat />} />
							<Route exact path='/calender' element={<Calender />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Box>
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default App
