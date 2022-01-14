// swap two elements in an array
export const swapPlayers = (players, from, to, setPlayers) => {
	const temp = players[from]
	players[from] = players[to]
	players[to] = temp
	setPlayers(players)
}

export const imagePreloder = images => {
	let imagesToLoad = images.length
	images.forEach((image, index) => {
		const img = new Image()
		img.src = image
		img.onload = () => {
			imagesToLoad--
			if (imagesToLoad === 0) {
			}
		}
		window[`image${index}`] = img
	})
}
