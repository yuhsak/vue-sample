const Axios = require('axios').default

const apiKey = 'sample-todoapp-api-key'

const agent = Axios.create({
  baseURL: 'https://jsondb.app/sample-todoapp',
  headers: {
    'x-api-key': apiKey,
  },
  responseType: 'json',
})

export const getTodos = async () => {
  const {
    data: { data },
  } = await agent.get('/todos')
  return data
}

export const createTodo = async (content) => {
  const {
    data: { data },
  } = await agent.post('/todos', content)
  return data
}

export const updateTodo = async (id, content) => {
  const {
    data: { data },
  } = await agent.put(`/todos/${id}`, content)
  return data
}

export const deleteTodo = async (id) => {
  const {
    data: { data },
  } = await agent.delete(`/todos/${id}`)
  return data
}
