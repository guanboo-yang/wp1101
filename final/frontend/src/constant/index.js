export const TOTAL_PLAYERS = 4

export const colors = ['#005eff', '#009e22', '#ff00ff', '#ff3030'] // 2 rest

export const MODE = [
	{ name: 'PILOT HUNTER', rounds: [1, 3, 5] },
	{ name: 'SHIP HUNTER', rounds: [3, 5, 7] },
	// { name: 'TEAM MATCH', rounds: [3, 6, 10] },
]

export const LEVEL = [
	//
	{ name: 'RANDOM' },
	{ name: 'BEGINNER' },
	{ name: 'INTERMEDIATE' },
	{ name: 'ADVANCED' },
]

export const CANVAS = {
	OUT: { WIDTH: 1600, HEIGHT: 1600 },
	IN: { WIDTH: 1500, HEIGHT: 1000 },
}

export const WEAPON = {
	BULLET: 'bullet',
	MINE: 'mine',
	MISSILE: 'missile',
	EXPLOSION: 'explosion',
}
