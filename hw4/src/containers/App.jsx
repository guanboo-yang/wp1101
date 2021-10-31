import './App.css'
import React, { useState, useEffect } from 'react'
import Todos from '../components/Todos'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoInput from '../components/TodoInput'
import Undo from '../components/Undo'
import { addRipple } from '../utils/ripple'

const App = () => {
	const [todoList, setTodoList] = useState([])
	const [todoBtn, setTodoBtn] = useState([
		{ id: 0, active: false, action: 'all' },
		{ id: 1, active: false, action: 'active' },
		{ id: 2, active: false, action: 'completed' },
	])
	const [prevTodoList, setPrevTodoList] = useState([])
	const [todoSum, setTodoSum] = useState(0)
	const [todoActiveSum, setTodoActiveSum] = useState(0)
	const [todoState, setTodoState] = useState('all')

	useEffect(() => {
		addRipple()
	}, [])

	useEffect(() => {
		setTodoActiveSum(todoList.filter(todo => !todo.complete).length)
		setTodoSum(todoList.length)
	}, [todoList])

	useEffect(() => {
		setTodoBtn(todoBtn.map(btn => (btn.action === todoState ? { ...btn, active: true } : { ...btn, active: false })))
	}, [todoState]) // eslint-disable-line react-hooks/exhaustive-deps

	const addTodo = todo => {
		// setPrevTodoList([...prevTodoList, todoList])
		setTodoList([...todoList, todo])
	}

	const deleteTodo = id => {
		setPrevTodoList([...prevTodoList, todoList])
		setTodoList(todoList.map(todo => (todo.id === id ? { ...todo, remove: true } : todo)))
		setTimeout(() => {
			setTodoList(todoList.filter(todo => todo.id !== id))
		}, 300)
	}

	const toggleTodoComplete = id => {
		setPrevTodoList([...prevTodoList, todoList])
		setTodoList(todoList.map(todo => (todo.id === id ? { ...todo, complete: !todo.complete } : todo)))
	}

	const todoClearCompleted = e => {
		if (todoSum - todoActiveSum === 0) return
		setPrevTodoList([...prevTodoList, todoList])
		setTodoList(todoList.map(todo => (todo.complete === true ? { ...todo, remove: true } : todo)))
		setTimeout(() => {
			setTodoList(todoList.filter(todo => todo.complete !== true))
		}, 300)
	}

	const undo = () => {
		console.log(prevTodoList)
		let popTodoList = prevTodoList.pop()
		popTodoList && setTodoList(popTodoList)
	}

	return (
		<>
			<Header title='todos' />
			<section className='todo-app__main'>
				<TodoInput onAdd={addTodo} />
				<Undo undo={undo} undoLength={prevTodoList.length} />
				<Todos todos={todoList} deleteTodo={deleteTodo} toggleTodoComplete={toggleTodoComplete} todoState={todoState} />
			</section>
			<Footer todoSum={todoSum} todoActiveSum={todoActiveSum} setTodoState={setTodoState} todoClearCompleted={todoClearCompleted} todoBtn={todoBtn} />
		</>
	)
}

export default App
