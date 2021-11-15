import { useCallback, useRef, useState } from 'react'

const useStateHistory = (defaultValue, { capacity = 10 } = {}) => {
	const [value, setValue] = useState(defaultValue)
	const historyRef = useRef([value])
	const pointerRef = useRef(0)

	const clear = () => {
		historyRef.current.length = 1
	}

	const set = useCallback(
		v => {
			const resolvedValue = typeof v === 'function' ? v(value) : v
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1) {
					historyRef.current.splice(pointerRef.current + 1)
				}
				historyRef.current.push(resolvedValue)
				while (historyRef.current.length > capacity) {
					historyRef.current.shift()
				}
				pointerRef.current = historyRef.current.length - 1
			}
			setValue(resolvedValue)
		},
		[capacity, value]
	)

	const back = useCallback(() => {
		if (pointerRef.current <= 1) return
		pointerRef.current--
		setValue(historyRef.current[pointerRef.current])
	}, [])

	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return
		pointerRef.current++
		setValue(historyRef.current[pointerRef.current])
	}, [])

	return [value, set, { back, clear }]
}

export default useStateHistory
