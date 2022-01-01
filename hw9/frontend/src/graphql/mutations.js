import { gql } from '@apollo/client'

export const LOGIN = gql`
	mutation createUser($username: String!, $password: String!, $status: String!) {
		createUser(data: { username: $username, password: $password, status: $status }) {
			username
			chatRoom {
				id
				user {
					username
				}
			}
		}
	}
`

export const MAKE_FRIEND = gql`
	mutation createFriend($username: String!, $friend: String!) {
		createFriend(data: { username: $username, friend: $friend }) {
			id
			user {
				username
			}
		}
	}
`

export const CREATE_MESSAGE = gql`
	mutation createMessage($name: String!, $body: String!, $id: String!) {
		createMessage(data: { name: $name, body: $body, id: $id }) {
			name
			body
		}
	}
`

export const INIT_MESSEAGE = gql`
	mutation InitMessages($id: String!) {
		InitMessages(id: $id) {
			name
			body
		}
	}
`

export const CLEAR_MESSAGE = gql`
	mutation deleteMessages($id: String!, $name: String!, $friend: String!) {
		deleteMessages(id: $id, name: $name, friend: $friend) {
			id
		}
	}
`
