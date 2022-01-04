// swap two elements in an array
export const swapPlayers = (players, from, to, setPlayers) => {
	const temp = players[from]
	players[from] = players[to]
	players[to] = temp
	setPlayers(players)
}
