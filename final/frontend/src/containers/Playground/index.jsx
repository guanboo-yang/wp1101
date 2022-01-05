import { useState } from 'react'
import Mode from '../../components/Mode'
import Room from '../../components/Room'
import Game from '../../components/Game'

const Playground = () => {
	const [step, setStep] = useState(0)

	return (
		<>
			{
				{
					0: <Mode setStart={() => setStep(1)} />,
					1: <Room setStep={step => setStep(prev => prev + step)} />,
					2: <Game />,
				}[step]
			}
		</>
	)
}

export default Playground
