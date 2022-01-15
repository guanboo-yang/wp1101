import { createContext, useContext, useState } from 'react'

const GameContext = createContext({
	sprites: {},
	updateGame: () => {},
})

const GameProvider = ({ children }) => {
	const [sprites, setSprites] = useState({
		ships: [],
		bullets: [],
		walls: [],
		bounds: [],
	})

	const updateGame = sprites => {
		setSprites(sprites)
	}

	return (
		<GameContext.Provider
			value={{
				sprites,
				updateGame,
			}}>
			{children}
		</GameContext.Provider>
	)
}

const useGame = () => {
	return useContext(GameContext)
}

export { GameProvider, useGame }
