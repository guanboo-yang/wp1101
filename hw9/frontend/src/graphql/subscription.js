import { gql } from '@apollo/client'

export const MESSAGES_SUBSCRIPTION = gql`
	subscription message($name: String!) {
		message(name: $name) {
			mutation
			data {
				name
				body
			}
			user
		}
	}
`

export const FRIEND_SUBSCRIPTION = gql`
	subscription friend($name: String!) {
		friend(name: $name) {
			mutation
			data {
				id
				name
			}
		}
	}
`
