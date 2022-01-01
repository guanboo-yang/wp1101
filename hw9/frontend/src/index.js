import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'antd/dist/antd.css'
import { StatusProvider } from './hook/useStatus'
import App from './components/App'

const httpLink = new HttpLink({
	uri: 'http://localhost:5000/',
})

const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/`,
	options: { reconnect: true },
})

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
	},
	wsLink,
	httpLink
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore({}),
})

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<StatusProvider>
				<App />
			</StatusProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
