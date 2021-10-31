import React from 'react'

const Header = ({ title }) => {
	return (
		<header className='todo-app__header'>
			<h1 className='todo-app__title'>{title}</h1>
		</header>
	)
}

export default Header
