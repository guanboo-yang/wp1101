import { useState } from 'react'
import PreGame from '../../components/PreGame'
import Game from '../../components/Game'

const Playground = () => {
	const [step, setStep] = useState(0)

	return (
		<>
			{
				{
					0: <PreGame setStart={() => setStep(1)} />,
					1: <Game />,
				}[step]
			}
		</>
	)
}

export default Playground
