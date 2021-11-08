import React from 'react'
import './nav.css'
import { NavLink } from 'react-router-dom'

const NavBar = ({ routes, darkMode, setDarkMode }) => {
	return (
		<>
			<nav className='appbar'>
				<header>
					<i className='mdi mdi-calculator'></i>
					Simple Calculator
				</header>
				<div className='spacer'></div>
				<div className='bottombar'>
					<div className='btn-group'>
						{routes.map(({ id, path, name, icon }) => (
							<NavLink exact to={path} key={id} className='btn nav' activeClassName='active'>
								<i className={`mdi ${icon}`}></i>
								{name}
							</NavLink>
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
