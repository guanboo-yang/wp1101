import React from 'react'

const Settings = ({ darkMode, setDarkMode }) => {
	return (
		<>
			<h1>Settings</h1>
			<div className='container'>
				<h2 style={{ marginRight: '10px' }}>Scheme</h2>
				<div className='btn icon' onClick={() => setDarkMode(!darkMode)}>
					{darkMode ? <i className='mdi mdi-moon-waxing-crescent'></i> : <i className='mdi mdi-white-balance-sunny'></i>}
				</div>
			</div>
		</>
	)
}

export default Settings
