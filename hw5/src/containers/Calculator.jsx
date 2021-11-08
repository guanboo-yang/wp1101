import './app.css'
import KeyPanel from '../components/KeyPanel'
import Result from '../components/Result'
import { useState } from 'react'

function App() {
	const [equation, setEquation] = useState([])
	const [result, setResult] = useState()
	const operators = ['/', '*', '+', '-', '%', '^', '.']

	return (
		<>
			<h1 style={{ marginBottom: '10px' }}>Calculator</h1>
			<div className='calculator'>
				<Result operators={operators} equation={equation} result={result} setResult={setResult} />
				<KeyPanel operators={operators} equation={equation} setEquation={setEquation} result={result} />
			</div>
			<h3 style={{ marginTop: '5px', opacity: '0.7' }}>press alt/option to see more</h3>
		</>
	)
}

export default App
