import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts) and sort by timestamp
router.get('/allPosts', (req, res) => {
	Post.find({})
		.sort({ timestamp: -1 })
		.exec((err, posts) => {
			if (err || !posts.length) {
				res.status(500).send({
					message: 'error',
					data: null,
				})
			} else {
				res.status(200).send({
					message: 'success',
					data: posts,
				})
			}
		})
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', (req, res) => {
	// find by postId
	Post.findOne({ postId: req.query.pid }, (err, post) => {
		if (err || !post) {
			res.status(403).send({
				message: 'error',
				post: null,
			})
		} else {
			res.status(200).send({
				message: 'success',
				post: post,
			})
		}
	})
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', (req, res) => {
	// timestamp format: 2021-12-02T05:51:04.360Z
	const post = new Post(req.body)
	post.save((err, object) => {
		if (err) {
			res.status(403).send({
				message: 'error',
				post: null,
			})
		} else {
			res.status(200).send({
				message: 'success',
			})
		}
	})
})

// TODO 5-(1): create the 4th API (/api/post) delete post
router.delete('/post', (req, res) => {
	Post.findOneAndDelete({ postId: req.query.pid }, (err, post) => {
		if (err) {
			res.status(403).send({
				message: 'error',
				post: null,
			})
		} else {
			res.status(200).send({
				message: 'success',
			})
		}
	})
})

export default router
