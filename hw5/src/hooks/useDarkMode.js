import { useLayoutEffect } from 'react'
import { useStorage } from '.'

const useDarkMode = () => {
	const [darkMode, setDarkMode] = useStorage('useDarkMode', undefined, window.localStorage)
	const enabled = darkMode ?? window.matchMedia('(prefers-color-scheme: dark)').matches

	useLayoutEffect(() => {
		document.body.classList.toggle('dark', enabled)
	}, [enabled])

	return [enabled, setDarkMode]
}

export default useDarkMode
