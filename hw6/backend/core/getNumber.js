import { getRandomInt } from '../utils/random'

let number

export const genNumber = () => {
	number = getRandomInt(1, 100)
}

export const getNumber = () => {
	return number
}
