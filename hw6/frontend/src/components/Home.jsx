import React, { useEffect } from 'react'

const Home = ({ setStatus, setGame }) => {
	useEffect(() => {
		setStatus('')
	}, [setStatus])

	return (
		<>
			<h1>Home Page</h1>
			<h2>
				Press{' '}
				<span className='btn' onClick={() => setGame('guess')}>
					guess
				</span>{' '}
				or{' '}
				<span className='btn' onClick={() => setGame('othello')}>
					othello
				</span>{' '}
				to start game
			</h2>
		</>
	)
}

export default Home
