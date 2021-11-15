import React, { useState, useEffect } from 'react'
import './NavBar.css'

const NavBar = ({ setGame }) => {
	const [scrolled, setScrolled] = useState(false)

	const routes = [
		{ id: 0, name: 'home', link: '' },
		{ id: 1, name: 'guess', link: 'guess' },
		{ id: 2, name: 'othello', link: 'othello' },
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
						{routes.map(({ id, name, link }) => (
							<div key={id} className='btn nav' onClick={() => setGame(link)}>
								{name}
							</div>
						))}
					</div>
				</div>
				<div className='spacer'></div>
				<div className='btn rounded'>?</div>
			</nav>
		</>
	)
}

export default NavBar
