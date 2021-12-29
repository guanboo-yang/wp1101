import React, { useEffect } from 'react'

const Home = ({ setStatus, setGame }) => {
	useEffect(() => {
		setStatus('')
	}, [setStatus])

	return (
		<>
			<h1>Home Page</h1>
			<h2>
				{'Press '}
				<div className='game btn-group'>
					<span className='btn' onClick={() => setGame('guess')}>
						guess
					</span>
					<span className='btn' onClick={() => setGame('othello')}>
						othello
					</span>
				</div>
				{' to Start!'}
			</h2>
		</>
	)
}

export default Home
