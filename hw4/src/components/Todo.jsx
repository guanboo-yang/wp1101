import React, { useState, useEffect } from 'react'
import { rippleHandler } from '../utils/ripple'

const Todo = ({ todo, deleteTodo, toggleTodoComplete, todoState }) => {
	const [classShow, setClassShow] = useState('')
	// const [render, setRender] = useState(!todo.remove)

	// useEffect(() => {
	// 	if (!todo.remove) setRender(true)
	// }, [todo.remove])

	useEffect(() => {
		setClassShow(todoState === 'all' || (todoState === 'completed') === todo.complete)
	}, [todoState, todo.complete])

	// const onTransitionEnd = () => {
	// 	if (todo.remove) {
	// 		setRender(false)
	// 	}
	// }

	return (
		/* render && */ <li
			className={`todo-app__item ripple ${!todo.remove && classShow && 'show'} ${todo.complete ? 'checked' : ''}`}
			onClick={e => rippleHandler(e)}
			/* onTransitionEnd={onTransitionEnd} */
		>
			<div className='todo-app__checkbox'>
				<input type='checkbox' id={`todo-${todo.id}`} checked={todo.complete} onChange={() => {}} />
				<label htmlFor={`todo-${todo.id}`} onClick={() => toggleTodoComplete(todo.id)}></label>
			</div>
			<h1 className='todo-app__item-detail'>{todo.text}</h1>
			<div className='delete-wrapper' onClick={() => deleteTodo(todo.id)}>
				<div className='delete'></div>
			</div>
		</li>
	)
}

export default Todo
