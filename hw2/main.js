/* #region Home Page */
const HomeComponent = {
	render: () => {
		return /* html */ `
			<div class="container">
				<h1>Digital Photo Album</h1>
				<p>This is HOME</p>
			</div>
		`
	},
}
/* #endregion */
/* #region Albums Page */
const AlbumsComponent = {
	render: () => {
		return /* html */ `
			<div class="grid-album">
				<a href="#/albums/nature" class="album">
					<h1>Nature</h1>
					<img src="https://placeimg.com/800/450/nature?t=1" alt="picture" />
				</a>
				<a href="#/albums/animals" class="album">
					<h1>Animals</h1>
					<img src="https://placeimg.com/800/450/animals?t=1" alt="picture" />
				</a>
				<a class="album" onclick='alert("This album is empty!")'>
					<h1>People</h1>
					<p>This album is empty</p>
				</a>
				<a class="album" onclick='alert("This album is empty!")'>
					<h1>Architecture</h1>
					<p>This album is empty</p>
				</a>
			</div>
		`
	},
}
/* #endregion */
/* #region About Page */
const AboutComponent = {
	render: () => {
		return /* html */ `
			<div class="container">
				<h1>About</h1>
				<p>version: 1.0.0</p>
				<p>The pictures are from <a href="https://placeimg.com/" target="_blank">placeimg.com</a></p>
				<p>Back to <a href="#/">Home</a> page</p>
				<p>Copyright &copy; 2021</p>
				<h1>Settings</h1>
				<button class="btn plain icon ripple" onclick="toggleTheme()" aria-label="Toggle Theme" style="background: transparent;">
					<i class="mdi mdi-white-balance-sunny"></i>
				</button>
			</div>
		`
	},
}
/* #endregion */
/* #region Nature Page */
const NatureComponent = {
	render: () => {
		return /* html */ `
			<h1 id="title" style="text-transform: uppercase;">nature</h1>
			<div class="btn-group">
				<button class="btn plain icon ripple" onclick="selectImage(-1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-chevron-left"></i>
				</button>
				<button class="btn plain icon ripple" onclick="rotateImage(-1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-rotate-left"></i>
				</button>
				<button class="btn plain icon ripple" onclick="rotateImage(1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-rotate-right"></i>
				</button>
				<button class="btn plain icon ripple" onclick="fullScreen()" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-fullscreen"></i>
				</button>
				<button class="btn plain icon ripple" onclick="selectImage(1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-chevron-right"></i>
				</button>
			</div>
			<div class="display">
				<img id="display" src="https://placeimg.com/800/450/nature?t=1" alt="picture" />
			</div>
			<div class="text-in-line">
				<span><span id="number">1</span> out of <span id="total">20</span></span>
			</div>
			<div class="grid">
				<div class="img active"><img onclick="setImage(this)" id="firstImg" src="https://placeimg.com/800/450/nature?t=1" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=2" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=3" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=4" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=5" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=6" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=7" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=8" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=9" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=10" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=11" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=12" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=13" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=14" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=15" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=16" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=17" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=18" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=19" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/nature?t=20" alt="picture" /></div>
				<div class="img" onclick="addImage(this)" style="font-size: 2rem">+</div>
			</div>
		`
	},
}
/* #endregion */
/* #region Animals Page */
const AnimalsComponent = {
	render: () => {
		return /* html */ `
			<h1 id="title" style="text-transform: uppercase;">animals</h1>
			<div class="btn-group">
				<button class="btn plain icon ripple" onclick="selectImage(-1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-chevron-left"></i>
				</button>
				<button class="btn plain icon ripple" onclick="rotateImage(-1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-rotate-left"></i>
				</button>
				<button class="btn plain icon ripple" onclick="rotateImage(1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-rotate-right"></i>
				</button>
				<button class="btn plain icon ripple" onclick="fullScreen()" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-fullscreen"></i>
				</button>
				<button class="btn plain icon ripple" onclick="selectImage(1)" aria-label="Toggle Theme" style="background: transparent; flex-shrink: 0;">
					<i class="mdi mdi-chevron-right"></i>
				</button>
			</div>
			<div class="display">
				<img id="display" src="https://placeimg.com/800/450/animals?t=1" alt="picture" />
			</div>
			<div class="text-in-line">
				<span><span id="number">1</span> out of <span id="total">20</span></span>
			</div>
			<div class="grid">
				<div class="img active"><img onclick="setImage(this)" id="firstImg" src="https://placeimg.com/800/450/animals?t=1" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=2" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=3" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=4" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=5" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=6" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=7" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=8" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=9" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=10" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=11" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=12" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=13" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=14" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=15" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=16" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=17" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=18" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=19" alt="picture" /></div>
				<div class="img"><img onclick="setImage(this)" src="https://placeimg.com/800/450/animals?t=20" alt="picture" /></div>
				<div class="img" onclick="addImage(this)" style="font-size: 2rem">+</div>
			</div>
		`
	},
}
/* #endregion */
/* #region Error Page */
const ErrorComponent = {
	render: () => {
		return /* html */ `
			<div class="container">
				<h1>404 Page Not found</h1>
				<p>You have gone too far. Go back <a href="#/">Home</a>!</p>
			</div>
		`
	},
}
/* #endregion */
/* #region Routing */
const routes = [
	{ path: '/', component: HomeComponent, class: 'home' },
	{ path: '/about', component: AboutComponent, class: 'about' },
	{ path: '/albums', component: AlbumsComponent, class: 'albums' },
	{ path: '/albums/nature', component: NatureComponent, class: 'nature' },
	{ path: '/albums/animals', component: AnimalsComponent, class: 'animals' },
]
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/'
const findComponentByPath = (path, routes) => {
	const route = routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined
	if (route) document.querySelectorAll(`.${route.class}`).forEach(l => l.classList.add('active'))
	if (route.path.startsWith('/albums')) document.querySelectorAll('.albums').forEach(l => l.classList.add('active'))
	return route
}
const router = () => {
	document.querySelectorAll('.link').forEach(l => l.classList.remove('active'))
	const path = parseLocation()
	const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
	document.getElementById('app').innerHTML = component.render()
	addRipple()
}
window.addEventListener('hashchange', router)
window.addEventListener('load', router)
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
	setTimeout(() => {
		container.remove()
	}, 600)
}
addRipple()
/* #endregion */
/* #region Color Theme */
function toggleTheme() {
	if (window.matchMedia('(prefers-color-scheme: light)').matches) document.documentElement.classList.toggle('dark')
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.toggle('light')
}
/* #endregion */
/* #region Toggle Menu */
function toggleMenu() {
	document.getElementById('sidebar').classList.toggle('magnify')
	document.getElementById('app').classList.toggle('magnify')
	document.getElementById('toggle-menu').classList.toggle('active')
}
document.addEventListener('mousedown', e => {
	if (e.target.closest('main') && window.matchMedia('(max-width: 960px)').matches) {
		document.getElementById('sidebar').classList.remove('magnify')
		document.getElementById('app').classList.remove('magnify')
		document.getElementById('toggle-menu').classList.remove('active')
	}
})
/* #endregion */
/* #region Set Image */
function setImage(ele) {
	const display = document.getElementById('display')
	display.style.transform = 'rotate(0deg)'
	angle = 0
	if (ele.src) display.src = ele.src
	document.querySelectorAll('.img').forEach(img => img.classList.remove('active'))
	var parent = ele.parentNode
	parent.classList.add('active')
	const index = Array.prototype.indexOf.call(parent.parentNode.children, parent) + 1
	const number = document.getElementById('number')
	number.innerText = index
	window.scrollTo({ top: 0, behavior: 'smooth' })
}
function selectImage(num) {
	let idx = parseInt(document.getElementById('number').innerText) + num - 1
	const total = parseInt(document.getElementById('total').innerText)
	if (idx < 0 || idx >= total) return
	const ele = document.querySelector('.grid').children[idx].children[0]
	setImage(ele)
}
/* #endregion */
/* #region Add Image */
function addImage(ele) {
	const src = prompt('The url of the new image is: ', '')
	let div = document.createElement('div')
	div.classList.add('img')
	div.innerHTML = `<img onclick="setImage(this)" src="${src}" alt="picture" />`
	ele.parentNode.insertBefore(div, ele)
	const total = document.getElementById('total')
	total.innerText = parseInt(total.innerText) + 1
}
/* #endregion */
/* #region Full Screen */
function fullScreen() {
	const display = document.getElementById('display')
	const overlay = document.getElementById('overlay')
	overlay.addEventListener('click', e => (overlay.style.display = 'none'), { once: true })
	overlay.children[0].src = display.src
	overlay.children[0].alt = display.alt
	overlay.style.display = 'flex'
}
/* #endregion */
/* #region Rotate Image */
let angle = 0
function rotateImage(num) {
	angle += num
	document.getElementById('display').style.transform = `rotate(${angle * 90}deg)`
}
/* #endregion */
