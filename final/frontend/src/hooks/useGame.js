import { createContext, useContext, useState } from 'react'

const GameContext = createContext({
	text: '',
	sprites: {},
	updateGame: () => {},
	setReady: () => {},
})

const GameProvider = ({ children }) => {
	const [sprites, setSprites] = useState({
		sprites: [],
		bounds: [],
		deadId: [],
	})
	const [text, setText] = useState(0)

	const updateGame = sprites => {
		setSprites(sprites)
	}

	const setReady = text => {
		setText(text)
	}

	return (
		<GameContext.Provider
			value={{
				sprites,
				text,
				updateGame,
				setReady,
			}}>
			{children}
		</GameContext.Provider>
	)
}

const useGame = () => {
	return useContext(GameContext)
}

export { GameProvider, useGame }
