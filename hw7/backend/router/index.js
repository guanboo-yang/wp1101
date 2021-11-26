import express from 'express'
import { connect, createCard, queryCards, deleteDB, postUser, putUser } from '../controller'
const router = express.Router()

router.get('/', connect)
router.post('/create-card', createCard)
router.get('/query-cards', queryCards)
router.delete('/clear-db', deleteDB)
router.post('/users', postUser)
router.put('/users/:userId', putUser)

export default router
