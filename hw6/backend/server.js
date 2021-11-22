import express from 'express'
import cors from 'cors'
import guessRrouter from './routes/guess'
import othelloRrouter from './routes/othello'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use('/api/guess', guessRrouter)
app.use('/api/othello', othelloRrouter)

// const http = require('http')
// const server = http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/plain' })
// 	res.end('Hello World!')
// })

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`)
})

// const http = require('http')
// const server = http.createServer(app)
// server.listen(4000, '127.0.0.1', () => {
// 	server.close(() => {
// 		server.listen(4000, 'IP_ADDRESS')
// 	})
// })
