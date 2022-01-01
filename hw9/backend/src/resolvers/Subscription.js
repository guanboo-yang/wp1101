const Subscription = {
	message: {
		subscribe(parent, { name }, { db, pubsub }, info) {
			return pubsub.asyncIterator(`name:${name}`)
		},
	},
	friend: {
		subscribe(parent, { name }, { db, pubsub }, info) {
			return pubsub.asyncIterator(`friend:${name}`)
		},
	},
}
export { Subscription as default }
