import { gql } from '@apollo/client'

export const USER_QUERY = gql`
	query {
		rooms {
			id
			user {
				username
			}
		}
	}
`
