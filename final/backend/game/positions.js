export const positions = [
	{},
	{
		canvas: { width: 1600, height: 1000 },
		ships: [
			{ pos: { x: 120, y: 120 }, angle: Math.PI / 4 },
			{ pos: { x: 1480, y: 880 }, angle: (-3 * Math.PI) / 4 },
			{ pos: { x: 1480, y: 120 }, angle: (3 * Math.PI) / 4 },
			{ pos: { x: 120, y: 880 }, angle: Math.PI / 4 },
		],
		walls: [
			{ x: 0, y: 0, b: true },
			{ x: 1, y: 0, b: true },
			{ x: 2, y: 0, b: true },
			{ x: 3, y: 0, b: true },
			{ x: 4, y: 0, b: true },
			{ x: 5, y: 0, b: true },
			{ x: 6, y: 0, b: true },
			{ x: 7, y: 0, b: true },
			{ x: 8, y: 0, b: true },
			{ x: 9, y: 0, b: true },
			{ x: 10, y: 0, b: false },
			{ x: 11, y: 0, b: false },
			{ x: 12, y: 0, b: false },
			{ x: 13, y: 0, b: false },
			{ x: 14, y: 0, b: false },
			{ x: 15, y: 0, b: false },
			{ x: 16, y: 0, b: false },
			{ x: 17, y: 0, b: false },
			{ x: 18, y: 0, b: false },
		],
	},
	{
		canvas: { width: 1200, height: 1200 },
		ships: [
			{ pos: { x: 120, y: 120 }, angle: Math.PI / 4 },
			{ pos: { x: 1080, y: 1080 }, angle: (-3 * Math.PI) / 4 },
			{ pos: { x: 1080, y: 120 }, angle: (3 * Math.PI) / 4 },
			{ pos: { x: 120, y: 1080 }, angle: Math.PI / 4 },
		],
		walls: [
			//
			{ x: 1, y: 5, b: false },
			{ x: 1, y: 6, b: true },
			{ x: 1, y: 7, b: true },
			{ x: 1, y: 8, b: false },
			{ x: 1, y: 9, b: false },
			{ x: 2, y: 5, b: false },
			{ x: 2, y: 9, b: true },
			{ x: 3, y: 5, b: true },
			{ x: 3, y: 9, b: true },
			{ x: 4, y: 5, b: true },
			{ x: 4, y: 9, b: true },
			{ x: 5, y: 1, b: false },
			{ x: 5, y: 2, b: true },
			{ x: 5, y: 3, b: true },
			{ x: 5, y: 4, b: true },
			{ x: 5, y: 5, b: false },
			{ x: 5, y: 6, b: false },
			{ x: 5, y: 7, b: true },
			{ x: 5, y: 8, b: true },
			{ x: 5, y: 9, b: false },
			{ x: 5, y: 10, b: true },
			{ x: 5, y: 11, b: true },
			{ x: 5, y: 12, b: false },
			{ x: 5, y: 13, b: false },
			{ x: 6, y: 1, b: false },
			{ x: 6, y: 5, b: true },
			{ x: 6, y: 9, b: false },
			{ x: 6, y: 13, b: true },
			{ x: 7, y: 1, b: true },
			{ x: 7, y: 5, b: true },
			{ x: 7, y: 9, b: true },
			{ x: 7, y: 13, b: true },
			{ x: 8, y: 1, b: true },
			{ x: 8, y: 5, b: false },
			{ x: 8, y: 9, b: true },
			{ x: 8, y: 13, b: false },
			{ x: 9, y: 1, b: false },
			{ x: 9, y: 2, b: false },
			{ x: 9, y: 3, b: true },
			{ x: 9, y: 4, b: true },
			{ x: 9, y: 5, b: false },
			{ x: 9, y: 6, b: true },
			{ x: 9, y: 7, b: true },
			{ x: 9, y: 8, b: false },
			{ x: 9, y: 9, b: false },
			{ x: 9, y: 10, b: true },
			{ x: 9, y: 11, b: true },
			{ x: 9, y: 12, b: true },
			{ x: 9, y: 13, b: false },
			{ x: 10, y: 5, b: true },
			{ x: 10, y: 9, b: true },
			{ x: 11, y: 5, b: true },
			{ x: 11, y: 9, b: true },
			{ x: 12, y: 5, b: true },
			{ x: 12, y: 9, b: false },
			{ x: 13, y: 5, b: false },
			{ x: 13, y: 6, b: false },
			{ x: 13, y: 7, b: true },
			{ x: 13, y: 8, b: true },
			{ x: 13, y: 9, b: false },
		],
	},
	{
		walls: [{}],
	},
]