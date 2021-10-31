import React from 'react'
import Todo from './Todo'

const Todos = ({ todos, deleteTodo, toggleTodoComplete, todoState }) => {
	return (
		<>
			{todos.length > 0 && (
				<ul className='todo-app__list'>
					{todos.map(todo => (
						<Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodoComplete={toggleTodoComplete} todoState={todoState} />
					))}
				</ul>
			)}
		</>
	)
}

export default Todos
