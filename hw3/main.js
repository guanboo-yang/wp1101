/* #region Constant */
const getById = id => document.getElementById(id)
const ul = getById('todo-list')
const todoTotal = getById('todo-total')
const todoClean = getById('todo-clean')
const todoInput = getById('todo-input')
const todoFooter = getById('todo-footer')
const errorMessage = getById('error-message')
const undoWrapper = getById('undo-wrapper')
const btns = getById('todo-btns').querySelectorAll('.btn')
let todoId = 0
let listStatus = 'all'
let todoList = []
let lastAction = []
/* #endregion */
/* #region Placeholder */
window.addEventListener('keydown', e => {
	if (todoInput !== document.activeElement) {
		if (e.key === '/') {
			e.preventDefault()
			todoInput.focus()
		} else {
			changePlaceholder('👆 Press / to focus')
		}
	} else if (e.key === 'Escape') {
		todoInput.blur()
	}
})
todoInput.addEventListener('focus', () => {
	changePlaceholder('✏️ What needs to be done?')
})
todoInput.addEventListener('blur', () => {
	changePlaceholder('👆 Press / to focus')
	errorMessage.classList.remove('show')
})
function changePlaceholder(str) {
	if (todoInput.placeholder === str) return
	todoInput.classList.add('fade')
	setTimeout(() => {
		todoInput.placeholder = str
		todoInput.classList.remove('fade')
	}, 100)
}
/* #endregion */
/* #region Add Delete Check Todo */
function parseTodo({ _id: id, val, checked }) {
	let li = document.createElement('li')
	li.classList += 'todo-app__item ripple'
	if (checked) li.classList += ' checked'
	li.innerHTML = `
		<div class="todo-app__checkbox">
			<input type="checkbox" id="${id}" ${checked ? 'checked' : ''} />
			<label for="${id}" onclick="checkTodo(this, ${id})"></label>
		</div>
		<h1 class="todo-app__item-detail ${checked ? 'checked' : ''}">${val}</h1>
		<div class="delete-wrapper" onclick="deleteTodo(this, ${id})">
			<div class="delete"></div>
		</div>
		`
	// <img src="./img/x.png" alt="x" class="todo-app__item-x" onclick="deleteTodo(this, ${id})">
	li.addEventListener('click', e => rippleHandler(e, li))
	return li
}
function addTodo(event, ele) {
	if (ele.value && ele.value.trim()) {
		errorMessage.classList.remove('show')
	}
	if (event.key !== 'Enter') return
	if (!ele.value || !ele.value.trim()) {
		errorMessage.classList.add('show')
		return
	}
	let todo = { _id: todoId, val: ele.value, checked: false }
	// lastAction.push({ action: 'add', todos: [todo] })
	todoList.push(todo)
	let li = parseTodo(todo)
	// ele.blur()
	ul.appendChild(li)
	if (listStatus !== 'completed') {
		setTimeout(() => {
			li.classList.add('show')
		}, 0)
		setTimeout(() => {
			ul.scrollTo({ top: ul.scrollHeight, behavior: 'smooth' })
		}, 300)
	}
	todoId++
	countTodos()
	ele.value = ''
}
function deleteTodo(node, id) {
	// console.log(id)
	lastAction.push({ action: 'delete', todos: todoList.filter(t => t._id === id) })
	todoList = todoList.filter(t => t._id !== id)
	let li = node.parentNode
	li.classList.remove('show')
	setTimeout(() => {
		li.remove()
		countTodos()
	}, 300)
	checkAction()
}
function checkTodo(node, id) {
	todoList = todoList.map(t => (t._id === id ? { ...t, checked: !t.checked } : t))
	let li = node.parentNode.parentNode
	let h1 = li.querySelector('h1')
	li.classList.toggle('checked')
	h1.classList.toggle('checked')
	if (li.classList.contains('checked')) {
		countTodos()
		if (listStatus === 'active') li.classList.remove('show')
	} else {
		countTodos()
		if (listStatus === 'completed') li.classList.remove('show')
	}
}
/* #endregion */
/* #region Footer Action */
function todoAll(ele) {
	// console.log(ele.parentNode.childNodes)
	btns.forEach(node => node.classList.remove('active'))
	ele.classList.add('active')
	ul.childNodes.forEach(list => {
		list.classList.add('show')
	})
	listStatus = 'all'
}
function todoActive(ele) {
	btns.forEach(node => node.classList.remove('active'))
	ele.classList.add('active')
	ul.childNodes.forEach(list => {
		if (list.classList.contains('checked')) list.classList.remove('show')
		else list.classList.add('show')
	})
	listStatus = 'active'
}
function todoCompleted(ele) {
	btns.forEach(node => node.classList.remove('active'))
	ele.classList.add('active')
	ul.childNodes.forEach(list => {
		if (list.classList.contains('checked')) list.classList.add('show')
		else list.classList.remove('show')
	})
	listStatus = 'completed'
}
function todoClearCompleted() {
	lastAction.push({ action: 'delete', todos: todoList.filter(t => t.checked === true) })
	todoList = todoList.filter(t => t.checked !== true)
	ul.querySelectorAll('.checked').forEach(list => {
		list.classList.remove('show')
		setTimeout(() => {
			list.remove()
			countTodos()
		}, 300)
	})
	checkAction()
}
countTodos()
function countTodos() {
	let total = ul.childNodes.length
	let active = 0
	ul.childNodes.forEach(list => {
		if (!list.classList.contains('checked')) active += 1
	})
	todoTotal.innerHTML = `<span style="font-weight: 700;">${active}</span>&nbsp;left`
	if (ul.childNodes.length == active) todoClean.classList.add('hide')
	else todoClean.classList.remove('hide')
	if (total === 0) todoFooter.classList.add('hide')
	else todoFooter.classList.remove('hide')
}
// function todoCheckAll() {
// 	ul.childNodes.forEach(list => {})
// 	countTodos()
// }
/* #endregion */
/* #region Ripple */
function addRipple() {
	const rippleParents = document.querySelectorAll('.ripple')
	rippleParents.forEach(rippleParent => {
		if (rippleParent.addEvent !== 1) rippleParent.addEventListener('click', e => rippleHandler(e))
		rippleParent.addEvent = 1
	})
}
const rippleHandler = e => {
	// e.preventDefault()
	e.stopPropagation()
	const parent = e.target.closest('.ripple')
	const rect = parent.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top
	const ripple = document.createElement('span')
	const container = document.createElement('span')
	ripple.classList.add('ripple_animation')
	container.classList.add('ripple_container')
	container.appendChild(ripple)
	parent.appendChild(container)
	let fromWidth = 40 + Math.max(rect.width, rect.height) / 6
	let toWidth = 200 + Math.max(rect.width, rect.height)
	ripple.animate(
		[
			{ opacity: '0.15', left: `${x}px`, top: `${y}px`, width: `${fromWidth}px`, height: `${fromWidth}px` },
			{ opacity: '0', left: `${rect.width / 2}px`, top: `${rect.height / 2}px`, width: `${toWidth}px`, height: `${toWidth}px` },
		],
		{ duration: 400 }
	)
	setTimeout(() => {
		container.remove()
	}, 400)
}
addRipple()
/* #endregion */
/* #region Undo */
function undo() {
	let action = lastAction.pop()
	if (!action) return
	action.todos.forEach(todo => {
		todoList.push(todo)
		let li = parseTodo(todo)
		ul.appendChild(li)
		// todoState === 'all' || (todoState === 'active') === todo.complete
		if (listStatus === 'all' || (listStatus === 'completed') === todo.checked) {
			setTimeout(() => {
				li.classList.add('show')
			}, 0)
			setTimeout(() => {
				ul.scrollTo({ top: ul.scrollHeight, behavior: 'smooth' })
			}, 300)
		}
		countTodos()
	})
	checkAction()
}
let undoTimeout
function checkAction() {
	clearTimeout(undoTimeout)
	if (lastAction.length) {
		undoWrapper.classList.remove('hide')
		undoTimeout = setTimeout(() => {
			undoWrapper.classList.add('hide')
			lastAction = []
		}, 8000)
	} else {
		undoWrapper.classList.add('hide')
	}
}

/* #endregion */
