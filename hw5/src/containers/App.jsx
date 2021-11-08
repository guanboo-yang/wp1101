import React from 'react'
import NavBar from '../components/NavBar'
import Calculator from './Calculator'
import More from './More'
import Settings from './Settings'
import { useDarkMode } from '../hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const routes = [
	{ id: 0, path: '/', name: 'Home', Component: Calculator, icon: 'mdi-home' },
	{ id: 1, path: '/more', name: 'More', Component: More, icon: 'mdi-view-dashboard' },
	{ id: 2, path: '/settings', name: 'Settings', Component: Settings, icon: 'mdi-cogs' },
]

const App = () => {
	const [darkMode, setDarkMode] = useDarkMode()

	return (
		<Router>
			<NavBar routes={routes} darkMode={darkMode} setDarkMode={setDarkMode} />
			{routes.map(({ path, Component }) => (
				<Route key={path} exact path={path}>
					{({ match }) => (
						<CSSTransition in={match != null} timeout={300} classNames='page' unmountOnExit>
							<div className='page'>
								<Component darkMode={darkMode} setDarkMode={setDarkMode} />
							</div>
						</CSSTransition>
					)}
				</Route>
			))}
		</Router>
	)
}

export default App
