import React, { useState, useEffect } from 'react'
import './NavBar.css'

const NavBar = ({ setGame, darkMode, setDarkMode }) => {
	const [scrolled, setScrolled] = useState(false)

	const routes = [
		{ id: 0, name: 'home', link: '', icon: 'home-circle' },
		{ id: 1, name: 'guess', link: 'guess', icon: 'numeric-7-circle' },
		{ id: 2, name: 'othello', link: 'othello', icon: 'crown-circle' },
	]

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY > 30) setScrolled(true)
			else setScrolled(false)
		}
	}, [])

	return (
		<>
			<nav className={`appbar ${scrolled ? 'float' : ''}`}>
				<header>Game</header>
				<div className='spacer'></div>
				<div className='bottombar'>
					<div className='btn-group'>
						{routes.map(({ id, name, link, icon }) => (
							<div key={id} className='btn nav' onClick={() => setGame(link)}>
								<i className={`mdi mdi-${icon}`}></i>
								{name}
							</div>
						))}
					</div>
				</div>
				<div className='spacer'></div>
				<div className='btn icon' onClick={() => setDarkMode(!darkMode)}>
					{darkMode ? <i className='mdi mdi-moon-waxing-crescent'></i> : <i className='mdi mdi-white-balance-sunny'></i>}
				</div>
			</nav>
		</>
	)
}

export default NavBar
