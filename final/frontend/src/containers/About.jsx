import React from 'react'

const About = () => {
	const style = {
		fontSize: '25px',
	}
	return (
		<div style={{ textAlign: 'left' }}>
			<h1>How to play?</h1>
			<p>
				Press <span style={style}>enter</span> to <span style={style}>turn</span>
			</p>
			<p>
				Press <span style={style}>space</span> to <span style={style}>shoot</span>!
			</p>
			<p>© 2022 copyright</p>
			<h3>table of content</h3>
			<h3>Astro party 是高中時熱門遊戲之ㄧ，我們想要透過</h3>
			<h3>web app 的方式，將遊戲擴展到能夠線上多人遊玩，並利用</h3>
			<h3>web socket 達成傳輸資料的方法。</h3>
			<h3>01&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Features</h3>
			<h3>Features</h3>
		</div>
	)
}

export default About
