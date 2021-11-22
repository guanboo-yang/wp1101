import { useEffect } from 'react'
import { useStorage } from '.'

const useDarkMode = () => {
	const [darkMode, setDarkMode, unset] = useStorage('useDarkMode', undefined, window.localStorage)
	const enabled = darkMode ?? window.matchMedia('(prefers-color-scheme: dark)').matches

	useEffect(() => {
		document.body.classList.toggle('dark', enabled)
	}, [enabled])

	return [enabled, setDarkMode, unset]
}

export default useDarkMode
