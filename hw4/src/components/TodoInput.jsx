import React, { useState, useEffect } from 'react'

const TodoInput = ({ onAdd }) => {
	const [todoId, setTodoId] = useState(0)

	useEffect(() => {
		const todoInput = document.getElementById('todo-input')
		document.addEventListener('keydown', e => {
			if (todoInput !== document.activeElement) {
				if (e.key === '/') {
					e.preventDefault()
					todoInput.focus()
				} else {
					changePlaceholder('👆 Press / to focus')
				}
			}
		})
	}, [])

	const changePlaceholder = str => {
		const todoInput = document.getElementById('todo-input')
		if (todoInput.placeholder === str) return
		todoInput.classList.add('fade')
		setTimeout(() => {
			todoInput.placeholder = str
			todoInput.classList.remove('fade')
		}, 100)
	}

	const addTodo = e => {
		const errorMessage = document.getElementById('error-message')
		e.target.value && e.target.value.trim() && errorMessage.classList.remove('show')
		if (e.key !== 'Enter') return
		if (!e.target.value || !e.target.value.trim()) {
			errorMessage.classList.add('show')
			return
		}
		onAdd({ id: todoId, text: e.target.value, complete: false, remove: false })
		setTodoId(todoId + 1)
		e.target.value = ''
	}

	return (
		<>
			<input
				type='text'
				className='todo-app__input'
				id='todo-input'
				onKeyUp={e => addTodo(e)}
				placeholder='✏️ What needs to be done?'
				spellCheck='false'
				autoComplete='off'
				onFocus={() => {
					changePlaceholder('✏️ What needs to be done?')
				}}
				onBlur={() => {
					changePlaceholder('👆 Press / to focus')
					document.getElementById('error-message').classList.remove('show')
				}}
				onKeyDown={e => {
					if (e.key === 'Escape') e.target.blur()
				}}
			/>
			<div id='error-message'>todo should not be empty or spaces</div>
		</>
	)
}

export default TodoInput
