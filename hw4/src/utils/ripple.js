export const addRipple = () => {
	const rippleParents = document.querySelectorAll('.ripple')
	rippleParents.forEach(rippleParent => {
		rippleParent.addEventListener('click', e => rippleHandler(e))
	})
}
export const rippleHandler = e => {
	// e.preventDefault()
	e.stopPropagation()
	const parent = e.target.closest('.ripple')
	console.log(parent)
	const rect = parent.getBoundingClientRect()
	let x = e.clientX - rect.left
	let y = e.clientY - rect.top
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
