import Message from './model'

const data = [
	{
		_id: '61b4bf2228a871d85aeeebc8',
		name: 'Ryan',
		body: '可以傳表情符號：',
		love: [],
		createdAt: '2021-12-11T16:12:12.001Z',
		__v: 0,
	},
	{
		_id: '61b4bf5828a871d85aeeebcc',
		name: 'Ryan',
		body: '🖤💙💛🤍🤎🧡💜💚',
		love: ['Jenni'],
		createdAt: '2021-12-11T16:12:12.002Z',
		__v: 1,
	},
	{
		_id: '61b4cdfd28a871d85aeeec24',
		name: 'Andrew',
		body: '↑ 別人傳的時候會有名字',
		love: [],
		createdAt: '2021-12-11T16:12:12.003Z',
		__v: 0,
	},
	{
		_id: '61b4ce0228a871d85aeeec26',
		name: 'Andrew',
		body: '↙ 還有頭像顯示',
		love: [],
		createdAt: '2021-12-11T16:12:12.004Z',
		__v: 0,
	},
	{
		_id: '61b4ce0428a871d85aeeec28',
		name: 'Andrew',
		body: '← Hover 時可以看到名字',
		love: [],
		createdAt: '2021-12-11T16:12:12.005Z',
		__v: 0,
	},
	{
		_id: '61b4ce0b28a871d85aeeec2a',
		name: 'Ric',
		body: '可以有不同人加入聊天室',
		love: [],
		createdAt: '2021-12-11T16:12:12.006Z',
		__v: 0,
	},
	{
		_id: '61b4ce0e28a871d85aeeec2c',
		name: 'Ric',
		body: '可以從訊息邊框判斷不同人或時間點傳送',
		love: [],
		createdAt: '2021-12-11T16:12:12.007Z',
		__v: 0,
	},
	{
		_id: '61b4ce1128a871d85aeeec2e',
		name: 'Ric',
		body: '點擊訊息可看到傳送時間',
		love: [],
		createdAt: '2021-12-11T16:12:12.008Z',
		__v: 0,
	},
	{
		_id: '61b4ce1c28a871d85aeeec30',
		name: 'Ryan',
		body: '可點擊愛心或刪除訊息（限自己）',
		love: [],
		createdAt: '2021-12-11T16:12:12.009Z',
		__v: 0,
	},
	{
		_id: '61b4ce4628a871d85aeeec32',
		name: 'Ryan',
		body: 'Hover 時可以看到誰點擊了愛心',
		love: ['Ryan', 'Jenni', 'Ric', 'Andrew'],
		createdAt: '2021-12-11T16:12:12.010Z',
		__v: 4,
	},
]

const dataInit = async () => {
	await Message.deleteMany({})
	await Message.insertMany(data)
}

export { dataInit }
