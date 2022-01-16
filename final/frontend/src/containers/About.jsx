import React from 'react'

const About = () => {
	const style = {
		fontSize: '25px',
	}
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>How to play?</h1>
			<p>
				Press <span style={style}>enter</span> to <span style={style}>turn</span>
			</p>
			<p>
				Press <span style={style}>space</span> to <span style={style}>shoot</span>!
			</p>
			<p>© 2022 copyright</p>
		</div>
	)
}

export default About
