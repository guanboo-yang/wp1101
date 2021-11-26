import axios from 'axios'

const instance = axios.create({
	baseURL: `http://localhost:4000/`,
})

instance.get('/api').then(({ data }) => console.log(data))

export default instance
