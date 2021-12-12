import { useEffect, useRef } from 'react'

const useEventListener = (eventType, callback, element = window, options = {}) => {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (!element?.addEventListener) return
		const handler = e => callbackRef.current(e)
		element.addEventListener(eventType, handler, options)
		return () => element.removeEventListener(eventType, handler, options)
	}, [eventType, element, options])
}

export default useEventListener
