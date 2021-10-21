/* #region Constant */
const ul = document.getElementById('todo-list')
const todoTotal = document.getElementById('todo-total')
const todoClean = document.getElementById('todo-clean')
const todoInput = document.getElementById('todo-input')
const todoFooter = document.getElementById('todo-footer')
const errorMessage = document.getElementById('error-message')
const btns = document.getElementById('todo-btns').querySelectorAll('.btn')
let todoId = 0
let listStatus = 'all'
// let todoList = []
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
function parseTodo(id, val) {
	let li = document.createElement('li')
	li.classList += 'todo-app__item ripple'
	li.innerHTML = `
		<div class="todo-app__checkbox">
			<input type="checkbox" id="${id}" />
			<label for="${id}" onclick="checkTodo(this)"></label>
		</div>
		<h1 class="todo-app__item-detail">${val}</h1>
		<img src="./img/x.png" alt="x" class="todo-app__item-x" onclick="deleteTodo(this, ${id})">
	`
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
	// todoList.push({ _id: todoId, val: ele.value, checked: false })
	let li = parseTodo(todoId, ele.value)
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
	// todoList = todoList.filter(t => t._id !== id)
	let li = node.parentNode
	li.classList.remove('show')
	setTimeout(() => {
		li.remove()
		countTodos()
	}, 300)
}
function checkTodo(node) {
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
	ul.querySelectorAll('.checked').forEach(list => {
		list.classList.remove('show')
		setTimeout(() => {
			list.remove()
			countTodos()
		}, 300)
	})
}
countTodos()
function countTodos() {
	let total = ul.childNodes.length
	let active = 0
	ul.childNodes.forEach(list => {
		if (!list.classList.contains('checked')) active += 1
	})
	todoTotal.innerHTML = `${active} left`
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
		if (rippleParent.addEvent !== 1) rippleParent.addEventListener('click', e => rippleHandler(e, rippleParent))
		rippleParent.addEvent = 1
	})
}
const rippleHandler = (e, rippleParent) => {
	// e.preventDefault()
	const parent = e.target.closest('.ripple')
	const rect = parent.getBoundingClientRect()
	let x = e.clientX - rect.left
	let y = e.clientY - rect.top
	const ripple = document.createElement('span')
	const container = document.createElement('span')
	ripple.classList.add('ripple_animation')
	container.classList.add('ripple_container')
	ripple.style.left = `${x}px`
	ripple.style.top = `${y}px`
	container.appendChild(ripple)
	rippleParent.appendChild(container)
	let fromWidth = Math.max(rect.width, rect.height) / 8
	let toWidth = 200 + Math.max(rect.width, rect.height) * 2
	ripple.animate(
		[
			{ opacity: '0.3', width: `${fromWidth}px`, height: `${fromWidth}px` },
			{ opacity: '0', width: `${toWidth}px`, height: `${toWidth}px` },
		],
		{ duration: 600 }
	)
	setTimeout(() => {
		container.remove()
	}, 600)
}
addRipple()
/* #endregion */
