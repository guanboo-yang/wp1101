import { useCallback, useState, useEffect } from 'react'

const useStorage = (key, defaultValue, storageObject) => {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key)
		if (jsonValue != null) return JSON.parse(jsonValue)
		if (typeof defalutValue === 'function') {
			return defaultValue()
		} else {
			return defaultValue
		}
	})

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key)
		storageObject.setItem(key, JSON.stringify(value))
	}, [key, value, storageObject])

	const remove = useCallback(() => {
		setValue(undefined)
	}, [])

	return [value, setValue, remove]
}

export default useStorage
