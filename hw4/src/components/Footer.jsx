import React from 'react'

const Footer = ({ todoSum, todoActiveSum, setTodoState, todoClearCompleted, todoBtn }) => {
	return (
		<footer className={`todo-app__footer ${todoSum === 0 ? 'hide' : ''}`} id='todo-footer'>
			<div className='todo-app__total btn rounded disabled' id='todo-total'>
				<span style={{ fontWeight: 700 }}>{todoActiveSum}</span>&nbsp;left
			</div>
			<div className='todo-app__view-buttons btn-group' id='todo-btns'>
				{todoBtn.map(btn => (
					<button key={btn.id} className={`btn ripple ${btn.active ? 'active' : ''}`} onClick={() => setTodoState(btn.action)}>
						{btn.action}
					</button>
				))}
			</div>
			<div className='todo-app__clean'>
				<button className={`btn ripple rounded ${todoSum - todoActiveSum > 0 ? '' : 'hide'}`} id='todo-clean' onClick={() => todoClearCompleted()}>
					Clear completed
				</button>
			</div>
		</footer>
	)
}

export default Footer
