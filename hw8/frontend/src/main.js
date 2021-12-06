// sort an array with quicksort
function quicksort(array) {
	if (array.length <= 1) {
		return array
	}
	const pivot = array[0]
	const left = []
	const right = []
	for (let i = 1; i < array.length; i++) {
		if (array[i] < pivot) {
			left.push(array[i])
		} else {
			right.push(array[i])
		}
	}
	return quicksort(left).concat(pivot, quicksort(right))
}

a = [3, 2, 4, 1, 4, 6, 1, 4, 9, 2, 1, 4]
console.log(quicksort(a))
