import './App.css'
import Home from './components/Home'
import Guess from './components/Guess'
import Othello from './components/Othello'
import NavBar from './components/NavBar'
import React, { useState } from 'react'

const App = () => {
	const [status, setStatus] = useState('')
	const [game, setGame] = useState('')

	return (
		<>
			<NavBar setGame={setGame} />
			<div className={`App ${status}`}>
				{
					{
						'': <Home setStatus={setStatus} setGame={setGame} />,
						guess: <Guess status={status} setStatus={setStatus} />,
						othello: <Othello status={status} setStatus={setStatus} />,
					}[game]
				}
			</div>
		</>
	)
}

export default App
