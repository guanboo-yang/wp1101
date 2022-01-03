// swap two elements in an array
export const swapPlayer = (players, from, to, setPlayers, setActiveStep) => {
	const temp = players[from]
	players[from] = players[to]
	players[to] = temp
	setPlayers(players)
	setActiveStep(to)
}
